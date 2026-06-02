export async function loadJsonWithAbort(url, { signal, fetchImpl = fetch } = {}) {
  const response = await fetchImpl(url, { signal });
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  return response.json();
}

export function createUserProfileLoader(fetchImpl) {
  let activeRequest = 0;
  let activeController = null;

  return async function loadUser(userId, callbacks) {
    if (activeController) activeController.abort();

    const requestId = activeRequest + 1;
    activeRequest = requestId;
    activeController = new AbortController();

    callbacks.onLoading(true);
    callbacks.onError(null);

    try {
      const data = await loadJsonWithAbort(`/api/users/${userId}`, {
        signal: activeController.signal,
        fetchImpl,
      });
      if (requestId === activeRequest) callbacks.onData(data);
    } catch (error) {
      if (error.name !== "AbortError" && requestId === activeRequest) callbacks.onError(error);
    } finally {
      if (requestId === activeRequest) callbacks.onLoading(false);
    }
  };
}
