# Evaluation: Java LRU Cache

The bad answer uses only a HashMap and clears the entire cache when capacity is reached. It does not track recency, does not evict one least-recently-used entry, and allows invalid capacity. The fixed answer uses access-order LinkedHashMap to preserve O(1) average get/put and evicts only the eldest entry.
