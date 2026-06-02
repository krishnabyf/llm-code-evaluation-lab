from collections import defaultdict, deque
from collections.abc import Callable
from time import monotonic


class SlidingWindowRateLimiter:
    def __init__(self, limit: int, window_seconds: float, clock: Callable[[], float] | None = None):
        if limit <= 0:
            raise ValueError("limit must be positive")
        if window_seconds <= 0:
            raise ValueError("window_seconds must be positive")
        self.limit = limit
        self.window_seconds = window_seconds
        self.clock = clock or monotonic
        self._requests: dict[str, deque[float]] = defaultdict(deque)

    def allow(self, key: str) -> bool:
        now = self.clock()
        bucket = self._requests[key]
        self._evict_expired(bucket, now)

        if len(bucket) >= self.limit:
            return False

        bucket.append(now)
        return True

    def cleanup(self) -> None:
        now = self.clock()
        empty_keys = []
        for key, bucket in self._requests.items():
            self._evict_expired(bucket, now)
            if not bucket:
                empty_keys.append(key)
        for key in empty_keys:
            del self._requests[key]

    def tracked_keys(self) -> int:
        return len(self._requests)

    def _evict_expired(self, bucket: deque[float], now: float) -> None:
        while bucket and now - bucket[0] >= self.window_seconds:
            bucket.popleft()
