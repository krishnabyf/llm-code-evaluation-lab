import assert from "node:assert/strict";
import test from "node:test";

import { createUserProfileLoader } from "../fixed_solution.js";

function deferred() {
  let resolve;
  const promise = new Promise((done) => {
    resolve = done;
  });
  return { promise, resolve };
}

test("latest request wins and stale response is ignored", async () => {
  const first = deferred();
  const second = deferred();
  const calls = [];
  const states = { data: null, errors: [], loading: [] };

  const fetchImpl = (url, { signal }) => {
    calls.push({ url, signal });
    const current = calls.length === 1 ? first : second;
    return current.promise;
  };

  const loadUser = createUserProfileLoader(fetchImpl);
  const callbacks = {
    onData: (data) => (states.data = data),
    onError: (error) => states.errors.push(error),
    onLoading: (value) => states.loading.push(value),
  };

  const firstRun = loadUser("old", callbacks);
  const secondRun = loadUser("new", callbacks);

  first.resolve({ ok: true, json: async () => ({ id: "old" }) });
  second.resolve({ ok: true, json: async () => ({ id: "new" }) });

  await Promise.all([firstRun, secondRun]);

  assert.equal(calls[0].signal.aborted, true);
  assert.deepEqual(states.data, { id: "new" });
  assert.deepEqual(states.errors, [null, null]);
});

test("non-ok response sets error", async () => {
  const fetchImpl = async () => ({ ok: false, status: 500 });
  const loadUser = createUserProfileLoader(fetchImpl);
  let error = null;

  await loadUser("u1", {
    onData: () => {},
    onError: (value) => (error = value),
    onLoading: () => {},
  });

  assert.match(error.message, /500/);
});
