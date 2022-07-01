/*
 * @Author: liuwanyong2017 2674706698@qq.com
 * @Date: 2022-07-01 01:19:40
 * @LastEditors: liuwanyong2017 2674706698@qq.com
 * @LastEditTime: 2022-07-01 16:39:15
 * @FilePath: /dataStructure/js-base/new.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

function privateNew(f, ...args) {
  if (typeof f !== 'function') {
    throw new Error('参数错误！')
  }
  const obj = Object.create(f.prototype)
  const res = f.apply(obj, args)
  return typeof res === 'object' || typeof res === 'function' ? res : obj
}
{
  //原型，原型链
  function F(params) {}
  //构造函数
  F.prototype //实例共享的属性和方法
  let f = new F()
  Object.getPrototypeOf(f) //这个指针就是f的原型，指向的地址就是F.prototype
  //修改原型
  let proto1 = F.prototype
  F.prototype = {}
  proto1 !== F.prototype
  f.constructor === F
  Object.getPrototypeOf(f) === proto1
  //这就是关系了，虽然修改了F的prototype。但是原本的f的原型被f保留了下来了。
}
{
  //原型链的终点：可以通俗的说，确实是万物都是对象，所以原型链的根源会是Object上面，
  console.log(Object.prototype)
  console.log(Object.prototype.__proto__)
  //   [Object: null prototype] {}
  // null
  //根源就是 null
}
{
  //判断非原型链上的属性方法：
  function F(name) {
    this.name = name
  }
F.prototype.age =10
  const f = new F('liu')

  f.getName = function getName() {
    return this.name
  }
  console.log(f.age,f.hasOwnProperty('age'), f.hasOwnProperty('name'))
}
