# Evaluation: C++ Two Sum

The bad answer can reuse the same element because it loops j from zero, returns an empty vector instead of the required sentinel, and is O(n^2). The fixed solution uses a hash map, preserves original indices, handles duplicates, and returns {-1, -1} when no pair exists.
