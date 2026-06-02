# Evaluation: Sliding Window Rate Limiter

## Model Answer Score

- Correctness: 1/5
- Edge cases: 1/5
- Scalability: 1/5
- Reliability: 1/5
- Tests: 0/5

## Issues Found

- Crashes for first-time users because `requests[user]` is missing.
- Does not implement a time window.
- Never expires old requests.
- Memory grows forever.
- Uses global mutable state.
- No tests.

## Fixed Solution Rationale

The fixed solution stores timestamps per key, evicts expired entries on each request, blocks only when the active window is full, and exposes cleanup for inactive users. Tests prove block, reset, and cleanup behavior.
