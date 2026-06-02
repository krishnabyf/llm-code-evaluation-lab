# Task: Safe Async Data Loading For React

A React screen loads user details whenever `userId` changes.

Requirements:

- Avoid stale responses overwriting newer state.
- Abort or ignore previous requests when `userId` changes.
- Surface loading and error states.
- Keep the data-loading logic testable outside React.
