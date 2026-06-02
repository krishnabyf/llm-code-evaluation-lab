import java.util.LinkedHashMap;
import java.util.Map;

class LruCache {
    private final int capacity;
    private final LinkedHashMap<Integer, Integer> values;

    LruCache(int capacity) {
        if (capacity <= 0) {
            throw new IllegalArgumentException("capacity must be positive");
        }
        this.capacity = capacity;
        this.values = new LinkedHashMap<>(capacity, 0.75f, true);
    }

    int get(int key) {
        return values.getOrDefault(key, -1);
    }

    void put(int key, int value) {
        values.put(key, value);
        if (values.size() > capacity) {
            Integer eldest = values.entrySet().iterator().next().getKey();
            values.remove(eldest);
        }
    }

    int size() {
        return values.size();
    }
}

class LruCacheTest {
    public static void main(String[] args) {
        LruCache cache = new LruCache(2);
        cache.put(1, 10);
        cache.put(2, 20);
        assert cache.get(1) == 10;
        cache.put(3, 30);
        assert cache.get(2) == -1;
        assert cache.get(1) == 10;
        assert cache.get(3) == 30;
        System.out.println("Java LRU cache tests passed");
    }
}
