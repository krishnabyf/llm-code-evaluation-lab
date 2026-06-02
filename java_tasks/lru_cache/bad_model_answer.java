import java.util.HashMap;

class LruCache {
    private final int capacity;
    private final HashMap<Integer, Integer> values = new HashMap<>();

    LruCache(int capacity) {
        this.capacity = capacity;
    }

    int get(int key) {
        return values.getOrDefault(key, -1);
    }

    void put(int key, int value) {
        if (values.size() >= capacity) {
            values.clear();
        }
        values.put(key, value);
    }
}
