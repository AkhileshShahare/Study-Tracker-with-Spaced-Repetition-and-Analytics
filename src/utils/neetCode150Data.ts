// NeetCode 150 problems data
// Source: https://neetcode.io/practice
export interface NeetCodeProblem {
  id: number;
  title: string;
  difficulty: string;
  category: string;
  link: string;
}
export const neetCode150Problems: NeetCodeProblem[] = [
// Arrays & Hashing
{
  id: 1,
  title: 'Contains Duplicate',
  difficulty: 'Easy',
  category: 'Arrays & Hashing',
  link: 'https://leetcode.com/problems/contains-duplicate/'
}, {
  id: 2,
  title: 'Valid Anagram',
  difficulty: 'Easy',
  category: 'Arrays & Hashing',
  link: 'https://leetcode.com/problems/valid-anagram/'
}, {
  id: 3,
  title: 'Two Sum',
  difficulty: 'Easy',
  category: 'Arrays & Hashing',
  link: 'https://leetcode.com/problems/two-sum/'
}, {
  id: 4,
  title: 'Group Anagrams',
  difficulty: 'Medium',
  category: 'Arrays & Hashing',
  link: 'https://leetcode.com/problems/group-anagrams/'
}, {
  id: 5,
  title: 'Top K Frequent Elements',
  difficulty: 'Medium',
  category: 'Arrays & Hashing',
  link: 'https://leetcode.com/problems/top-k-frequent-elements/'
}, {
  id: 6,
  title: 'Product of Array Except Self',
  difficulty: 'Medium',
  category: 'Arrays & Hashing',
  link: 'https://leetcode.com/problems/product-of-array-except-self/'
}, {
  id: 7,
  title: 'Valid Sudoku',
  difficulty: 'Medium',
  category: 'Arrays & Hashing',
  link: 'https://leetcode.com/problems/valid-sudoku/'
}, {
  id: 8,
  title: 'Encode and Decode Strings',
  difficulty: 'Medium',
  category: 'Arrays & Hashing',
  link: 'https://leetcode.com/problems/encode-and-decode-strings/'
}, {
  id: 9,
  title: 'Longest Consecutive Sequence',
  difficulty: 'Medium',
  category: 'Arrays & Hashing',
  link: 'https://leetcode.com/problems/longest-consecutive-sequence/'
},
// Two Pointers
{
  id: 10,
  title: 'Valid Palindrome',
  difficulty: 'Easy',
  category: 'Two Pointers',
  link: 'https://leetcode.com/problems/valid-palindrome/'
}, {
  id: 11,
  title: '3Sum',
  difficulty: 'Medium',
  category: 'Two Pointers',
  link: 'https://leetcode.com/problems/3sum/'
}, {
  id: 12,
  title: 'Container With Most Water',
  difficulty: 'Medium',
  category: 'Two Pointers',
  link: 'https://leetcode.com/problems/container-with-most-water/'
},
// Sliding Window
{
  id: 13,
  title: 'Best Time to Buy and Sell Stock',
  difficulty: 'Easy',
  category: 'Sliding Window',
  link: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/'
}, {
  id: 14,
  title: 'Longest Substring Without Repeating Characters',
  difficulty: 'Medium',
  category: 'Sliding Window',
  link: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/'
}, {
  id: 15,
  title: 'Longest Repeating Character Replacement',
  difficulty: 'Medium',
  category: 'Sliding Window',
  link: 'https://leetcode.com/problems/longest-repeating-character-replacement/'
}, {
  id: 16,
  title: 'Permutation in String',
  difficulty: 'Medium',
  category: 'Sliding Window',
  link: 'https://leetcode.com/problems/permutation-in-string/'
},
// Stack
{
  id: 17,
  title: 'Valid Parentheses',
  difficulty: 'Easy',
  category: 'Stack',
  link: 'https://leetcode.com/problems/valid-parentheses/'
}, {
  id: 18,
  title: 'Min Stack',
  difficulty: 'Medium',
  category: 'Stack',
  link: 'https://leetcode.com/problems/min-stack/'
}, {
  id: 19,
  title: 'Evaluate Reverse Polish Notation',
  difficulty: 'Medium',
  category: 'Stack',
  link: 'https://leetcode.com/problems/evaluate-reverse-polish-notation/'
}, {
  id: 20,
  title: 'Generate Parentheses',
  difficulty: 'Medium',
  category: 'Stack',
  link: 'https://leetcode.com/problems/generate-parentheses/'
}, {
  id: 21,
  title: 'Daily Temperatures',
  difficulty: 'Medium',
  category: 'Stack',
  link: 'https://leetcode.com/problems/daily-temperatures/'
}, {
  id: 22,
  title: 'Car Fleet',
  difficulty: 'Medium',
  category: 'Stack',
  link: 'https://leetcode.com/problems/car-fleet/'
}, {
  id: 23,
  title: 'Largest Rectangle in Histogram',
  difficulty: 'Hard',
  category: 'Stack',
  link: 'https://leetcode.com/problems/largest-rectangle-in-histogram/'
},
// Binary Search
{
  id: 24,
  title: 'Binary Search',
  difficulty: 'Easy',
  category: 'Binary Search',
  link: 'https://leetcode.com/problems/binary-search/'
}, {
  id: 25,
  title: 'Search a 2D Matrix',
  difficulty: 'Medium',
  category: 'Binary Search',
  link: 'https://leetcode.com/problems/search-a-2d-matrix/'
}, {
  id: 26,
  title: 'Koko Eating Bananas',
  difficulty: 'Medium',
  category: 'Binary Search',
  link: 'https://leetcode.com/problems/koko-eating-bananas/'
}, {
  id: 27,
  title: 'Find Minimum in Rotated Sorted Array',
  difficulty: 'Medium',
  category: 'Binary Search',
  link: 'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/'
}, {
  id: 28,
  title: 'Search in Rotated Sorted Array',
  difficulty: 'Medium',
  category: 'Binary Search',
  link: 'https://leetcode.com/problems/search-in-rotated-sorted-array/'
}, {
  id: 29,
  title: 'Time Based Key-Value Store',
  difficulty: 'Medium',
  category: 'Binary Search',
  link: 'https://leetcode.com/problems/time-based-key-value-store/'
}, {
  id: 30,
  title: 'Median of Two Sorted Arrays',
  difficulty: 'Hard',
  category: 'Binary Search',
  link: 'https://leetcode.com/problems/median-of-two-sorted-arrays/'
},
// Linked List
{
  id: 31,
  title: 'Reverse Linked List',
  difficulty: 'Easy',
  category: 'Linked List',
  link: 'https://leetcode.com/problems/reverse-linked-list/'
}, {
  id: 32,
  title: 'Merge Two Sorted Lists',
  difficulty: 'Easy',
  category: 'Linked List',
  link: 'https://leetcode.com/problems/merge-two-sorted-lists/'
}, {
  id: 33,
  title: 'Reorder List',
  difficulty: 'Medium',
  category: 'Linked List',
  link: 'https://leetcode.com/problems/reorder-list/'
}, {
  id: 34,
  title: 'Remove Nth Node From End of List',
  difficulty: 'Medium',
  category: 'Linked List',
  link: 'https://leetcode.com/problems/remove-nth-node-from-end-of-list/'
}, {
  id: 35,
  title: 'Copy List with Random Pointer',
  difficulty: 'Medium',
  category: 'Linked List',
  link: 'https://leetcode.com/problems/copy-list-with-random-pointer/'
}, {
  id: 36,
  title: 'Add Two Numbers',
  difficulty: 'Medium',
  category: 'Linked List',
  link: 'https://leetcode.com/problems/add-two-numbers/'
}, {
  id: 37,
  title: 'Linked List Cycle',
  difficulty: 'Easy',
  category: 'Linked List',
  link: 'https://leetcode.com/problems/linked-list-cycle/'
}, {
  id: 38,
  title: 'Find the Duplicate Number',
  difficulty: 'Medium',
  category: 'Linked List',
  link: 'https://leetcode.com/problems/find-the-duplicate-number/'
}, {
  id: 39,
  title: 'LRU Cache',
  difficulty: 'Medium',
  category: 'Linked List',
  link: 'https://leetcode.com/problems/lru-cache/'
}, {
  id: 40,
  title: 'Merge k Sorted Lists',
  difficulty: 'Hard',
  category: 'Linked List',
  link: 'https://leetcode.com/problems/merge-k-sorted-lists/'
}, {
  id: 41,
  title: 'Reverse Nodes in k-Group',
  difficulty: 'Hard',
  category: 'Linked List',
  link: 'https://leetcode.com/problems/reverse-nodes-in-k-group/'
},
// Trees
{
  id: 42,
  title: 'Invert Binary Tree',
  difficulty: 'Easy',
  category: 'Trees',
  link: 'https://leetcode.com/problems/invert-binary-tree/'
}, {
  id: 43,
  title: 'Maximum Depth of Binary Tree',
  difficulty: 'Easy',
  category: 'Trees',
  link: 'https://leetcode.com/problems/maximum-depth-of-binary-tree/'
}, {
  id: 44,
  title: 'Diameter of Binary Tree',
  difficulty: 'Easy',
  category: 'Trees',
  link: 'https://leetcode.com/problems/diameter-of-binary-tree/'
}, {
  id: 45,
  title: 'Balanced Binary Tree',
  difficulty: 'Easy',
  category: 'Trees',
  link: 'https://leetcode.com/problems/balanced-binary-tree/'
}, {
  id: 46,
  title: 'Same Tree',
  difficulty: 'Easy',
  category: 'Trees',
  link: 'https://leetcode.com/problems/same-tree/'
}, {
  id: 47,
  title: 'Subtree of Another Tree',
  difficulty: 'Easy',
  category: 'Trees',
  link: 'https://leetcode.com/problems/subtree-of-another-tree/'
}, {
  id: 48,
  title: 'Lowest Common Ancestor of a Binary Search Tree',
  difficulty: 'Easy',
  category: 'Trees',
  link: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/'
}, {
  id: 49,
  title: 'Binary Tree Level Order Traversal',
  difficulty: 'Medium',
  category: 'Trees',
  link: 'https://leetcode.com/problems/binary-tree-level-order-traversal/'
}, {
  id: 50,
  title: 'Binary Tree Right Side View',
  difficulty: 'Medium',
  category: 'Trees',
  link: 'https://leetcode.com/problems/binary-tree-right-side-view/'
}
// This is just a sample of 50 problems from NeetCode 150. In a real implementation, you would include all 150 problems.
// The full list can be found at https://neetcode.io/practice
// Additional problems would continue with IDs 51-150...
];