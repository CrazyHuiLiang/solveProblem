// https://leetcode.cn/problems/summary-ranges/?source=vscode
function summaryRanges(nums: number[]): string[] {
    const result: string[] = [];
    let startNum = nums[0];
    let gap = 1;

    // 将数组元素后的第一个空位作为桩节点，方便解决最后一个节点通过循环逻辑处理不到的问题
    for (let i = 1; i <= nums.length; i++) {
        const endNum = nums[i];
        if (endNum - startNum === gap) {
            gap++;            
        } else {
            if (gap === 1) {
                result.push(String(startNum));
            } else {
                result.push(`${startNum}->${nums[i-1]}`);
                gap = 1;
            }
            startNum = endNum;
        }
    }
    return result;
};
