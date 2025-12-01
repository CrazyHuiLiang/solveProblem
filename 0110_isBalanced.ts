// https://leetcode.cn/problems/balanced-binary-tree/?envType=problem-list-v2&envId=k3i892Iv
/*
    平衡二叉树 是指该树所有节点的左右子树的高度相差不超过 1。

    给定一个二叉树，判断它是否是 平衡二叉树  
*/


/**
 * Definition for a binary tree node.
 */
class TreeNode {
    val: number
    left: TreeNode | null
    right: TreeNode | null
    depth: number = -1;
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.left = (left===undefined ? null : left)
        this.right = (right===undefined ? null : right)
    }
}

const cacheMap = new Map<TreeNode, number>()

// 计算树的深度
function depth(root: TreeNode | null | undefined): number {
    if (!root) {
        return 0;
    }
    if (cacheMap.get(root)) {
        return cacheMap.get(root)!;
    }
    console.log('depth', root);
    const left = root?.left;
    const leftDepth = depth(root?.left);
    if (left) {
        cacheMap.set(left, leftDepth);
    }
    const right = root?.right;
    const rightDepth = depth(root?.right);
    if (right) {
        cacheMap.set(right, rightDepth);
    }
    
    return Math.max(leftDepth, rightDepth) + 1;
}

function isBalanced(root: TreeNode | null | undefined): boolean {
    if (!root) {
        return true;
    }
    const isCurLevelBalance = Math.abs(depth(root?.left) - depth(root?.right)) < 2;
    console.log('isBalanced', root, isCurLevelBalance);
    if (!isCurLevelBalance) {
        return false;
    }
    return isBalanced(root?.left) && isBalanced(root?.right);
};

console.log(isBalanced(new TreeNode(1, 
    new TreeNode(1),
    new TreeNode(2, 
        new TreeNode(3),
        new TreeNode(4)
    )
)));

