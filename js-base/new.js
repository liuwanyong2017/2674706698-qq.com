/*
 * @Author: liuwanyong2017 2674706698@qq.com
 * @Date: 2022-07-01 01:19:40
 * @LastEditors: liuwanyong2017 2674706698@qq.com
 * @LastEditTime: 2022-07-01 01:33:00
 * @FilePath: /dataStructure/js-base/new.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

function privateNew(f, ...args) {
  if (typeof f !== 'function') {
    throw new Error('参数错误！')
  }
  const obj = Object.create(f.prototype)
  const res = f.apply(obj, args)
  return (typeof res === 'object' || typeof res === 'function')?res :obj
}
