// https://leetcode.cn/problems/contains-duplicate-ii/?source=vscode
// 给你一个整数数组 nums 和一个整数 k ，判断数组中是否存在两个 不同的索引 i 和 j ，满足 nums[i] == nums[j] 且 abs(i - j) <= k 。如果存在，返回 true ；否则，返回 false 。
function containsNearbyDuplicate(nums: number[], k: number): boolean {
    const maxI = nums.length-1;
    for (let i = 0; i < maxI; i++) {
        for (let j = i + 1; j <= i + k && j < nums.length; j++) {
            if (nums[i] === nums[j]) {
                return true;
            }
        }
    }
    return false;
};
