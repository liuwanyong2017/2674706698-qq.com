/*
 * @Author: liuwanyong2017 2674706698@qq.com
 * @Date: 2022-07-01 16:54:19
 * @LastEditors: liuwanyong2017 2674706698@qq.com
 * @LastEditTime: 2022-07-01 17:18:38
 * @FilePath: /dataStructure/js-base/set.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
//set数据结构
{
  let s = new Set()
  ;[1, 3, 1, 4, 3].forEach(num => s.add(num))
  for (let i of s) {
    console.log(i)
  }
  //add 去重
  s = new Set([2, 2, 3, 3, 5, 5]) //初始化可以接收一个数组
  console.log(s)
  //   1
  // 3
  // 4
  // Set(3) { 2, 3, 5 }
  console.log(new Set('sbsbdff'))
//   Set(4) { 's', 'b', 'd', 'f' }
}
