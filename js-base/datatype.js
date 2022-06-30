/*
 * @Author: liuwanyong2017 2674706698@qq.com
 * @Date: 2022-07-01 00:21:17
 * @LastEditors: liuwanyong2017 2674706698@qq.com
 * @LastEditTime: 2022-07-01 00:57:39
 * @FilePath: /dataStructure/js-base/datatype.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
//检测数据类型

{
  console.log(typeof 3)
  console.log(typeof '')
  console.log(typeof null)
  console.log(typeof undefined)
  console.log(typeof [])
  console.log(typeof {})
  console.log(typeof true)
  console.log(typeof function f(params) {})
  // number
  // string
  // object
  // undefined
  // object
  // object
  // boolean
  // function
}

{
  //instanceof 判断对象的原型链上有木有它，不能判断基本类型的
  console.log(2 instanceof Number)
  console.log('3' instanceof String)
  console.log(true instanceof Boolean)
  console.log([] instanceof Array)
  console.log({} instanceof Object)
  //   false
  //   false
  //   false
  //   true
  //   true
}
