function singleNumber(nums: number[]): number {
    let result = new Set<number>();
    for (const num of nums) {
        if (result.has(num)) {
            result.delete(num);
        } else {
            result.add(num);
        }
    }
    return Array.from(result).pop() as number;
};