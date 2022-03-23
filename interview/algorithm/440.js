/*
 * @Author: your name
 * @Date: 2022-03-23 19:42:24
 * @LastEditTime: 2022-03-23 23:37:54
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /dataStructure/interview/algorithm/440.js
 */

//力扣440题
// 给定整数 n 和 k， 返回[1, n] 中字典序第 k 小的数字。
// 示例 1:

//     输入: n = 13, k = 2
// 输出: 10
// 解释: 字典序的排列是[1, 10, 11, 12, 13, 2, 3, 4, 5, 6, 7, 8, 9]， 所以第二小的数字是 10。
// 示例 2:

//     输入: n = 1, k = 1
// 输出: 1

// 来源： 力扣（ LeetCode）
// 链接： https: //leetcode-cn.com/problems/k-th-smallest-in-lexicographical-order
//     著作权归领扣网络所有。 商业转载请联系官方授权， 非商业转载请注明出处。

// 字典序的数据模型应该是类似二叉树的变种，多叉树，猜测考得肯定是递归了。
 function f(n, k) {
     let count = 0,
         result;
     class NumNode {
         constructor(m) {
             this.value = m
             count += 1
             if (count === k) return (result = m);
             this.next()
             this.right()
         }
         next() {
             const num = this.value * 10;
             num <= n && new NumNode(num)
         }
         right() {
             this.value % 10 !== 9 && this.value + 1 <= n &&
                 new NumNode(this.value + 1)
         }
     }
     new NumNode(1)
     return result
 };