function majorityElement(nums: number[]): number {
    const threshold = Math.ceil(nums.length / 2);
    const map: Record<number, number> = {};
    for (let i = 0; i < nums.length; i++) {
        const num = nums[i];
        const count = (map[num] || 0) + 1;
        if (count >= threshold) {
            return num;
        }
        map[num] = count;
    }
    return 0;
};
