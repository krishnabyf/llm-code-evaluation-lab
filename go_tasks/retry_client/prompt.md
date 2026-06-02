# Task: Retry Client

Implement retry logic for transient failures.

Requirements:

- Retry only when the operation returns an error.
- Stop after max attempts.
- Return the successful value immediately.
- Reject non-positive attempt counts.
