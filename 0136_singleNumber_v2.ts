/*
    任何数和 0 做异或运算，结果仍然是原来的数，即 x⊕0=x；
    任何数和其自身做异或运算，结果是 0，即 x⊕x=0；
*/
function singleNumber(nums: number[]): number {
    let result = 0;
    for (const num of nums) {
        result ^= num;
    }
    return result;
};
