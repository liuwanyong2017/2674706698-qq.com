/*
 * @Author: liuwanyong2017 2674706698@qq.com
 * @Date: 2022-06-30 11:04:36
 * @LastEditors: liuwanyong2017 2674706698@qq.com
 * @LastEditTime: 2022-06-30 17:10:15
 * @FilePath: /dataStructure/Fn.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// new Function 的妙用

const str = `{a:4,b:'sf',c:'2004-3-25'}`,
  str1 = new Function('return ' + str)()
let res = JSON.stringify(str1)
console.log(str1, res)
//参数接收的是字符串，很牛逼
{
  let str = 'wan'
  function f() {
    let str = 'liu'
    return new Function('console.log(str)')
  }
  f()()
  //报错，因为 new Function 执行的作用域上下文是全局的，不是私有的。
}
