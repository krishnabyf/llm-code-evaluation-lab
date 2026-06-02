from python_tasks.rate_limiter.fixed_solution import SlidingWindowRateLimiter


class FakeClock:
    def __init__(self):
        self.value = 0.0

    def __call__(self):
        return self.value

    def advance(self, seconds):
        self.value += seconds


def test_allows_until_limit_then_blocks():
    clock = FakeClock()
    limiter = SlidingWindowRateLimiter(limit=2, window_seconds=10, clock=clock)

    assert limiter.allow("user-1") is True
    assert limiter.allow("user-1") is True
    assert limiter.allow("user-1") is False


def test_resets_after_window():
    clock = FakeClock()
    limiter = SlidingWindowRateLimiter(limit=1, window_seconds=10, clock=clock)

    assert limiter.allow("user-1") is True
    assert limiter.allow("user-1") is False

    clock.advance(10)

    assert limiter.allow("user-1") is True


def test_cleanup_removes_inactive_users():
    clock = FakeClock()
    limiter = SlidingWindowRateLimiter(limit=1, window_seconds=5, clock=clock)

    limiter.allow("user-1")
    assert limiter.tracked_keys() == 1

    clock.advance(5)
    limiter.cleanup()

    assert limiter.tracked_keys() == 0
