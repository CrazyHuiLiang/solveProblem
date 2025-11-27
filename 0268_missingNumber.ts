// https://leetcode.cn/problems/missing-number/?source=vscode
function missingNumber(nums: number[]): number {
    // 从小到大排序
    const sorted = nums.sort((n1, n2) => n1 - n2);

    return binarySearch(0, sorted);
};

// 使用二分查找
function binarySearch(start: number, nums: number[]): number {
    let i = Math.floor(nums.length / 2);
    let shouldI = start + i;

    // console.log('binarySearch', {nums, start, i, shouldI});
    // console.log(nums[i] !== shouldI, nums[i-1], shouldI - 1);

    if (i === 0 && nums[i] !== shouldI) {
        return shouldI;
    }
    // 缺少 i
    if (nums[i] !== shouldI && nums[i-1] === shouldI - 1) {
        return shouldI;
    }
    if (nums[i] === shouldI) {
        return binarySearch(shouldI + 1, nums.slice(i + 1));
    }
    return binarySearch(start, nums.slice(0, i - 1));
}

console.log(missingNumber([3,0,1]));
