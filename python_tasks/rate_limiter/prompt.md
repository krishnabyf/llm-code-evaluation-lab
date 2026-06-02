# Task: Sliding Window Rate Limiter

Implement a Python rate limiter for API requests.

Requirements:

- Limit requests per key/user.
- Use a sliding time window.
- Return `True` when a request is allowed and `False` when blocked.
- Expire old requests automatically.
- Avoid unbounded memory growth for inactive users.
- Include tests for allowed, blocked, and reset-after-window behavior.
