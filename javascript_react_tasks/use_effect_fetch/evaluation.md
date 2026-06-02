# Evaluation: React Async Loading

## Model Answer Score

- Correctness: 2/5
- Reliability: 1/5
- React behavior: 1/5
- Tests: 0/5

## Issues Found

- `useEffect` has an empty dependency array, so it ignores `userId` changes.
- No abort handling.
- Stale responses can overwrite newer user state.
- No loading/error state.
- Logic is difficult to test because it is embedded directly in the component.

## Fixed Solution Rationale

The fixed solution extracts testable async loading logic, aborts previous requests, ignores stale responses, and reports loading/error states through callbacks.
