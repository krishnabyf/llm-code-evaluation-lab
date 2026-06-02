#include <cassert>
#include <unordered_map>
#include <vector>
using namespace std;

vector<int> twoSum(const vector<int>& nums, int target) {
    unordered_map<int, int> seen;
    for (int i = 0; i < static_cast<int>(nums.size()); ++i) {
        int needed = target - nums[i];
        auto found = seen.find(needed);
        if (found != seen.end()) {
            return {found->second, i};
        }
        seen[nums[i]] = i;
    }
    return {-1, -1};
}

int main() {
    assert((twoSum({2, 7, 11, 15}, 9) == vector<int>{0, 1}));
    assert((twoSum({3, 3}, 6) == vector<int>{0, 1}));
    assert((twoSum({1, 2, 3}, 10) == vector<int>{-1, -1}));
    return 0;
}
