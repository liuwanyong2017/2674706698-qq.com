/*
 * @Author: liuwanyong2017 2674706698@qq.com
 * @Date: 2022-07-01 16:54:19
 * @LastEditors: liuwanyong2017 2674706698@qq.com
 * @LastEditTime: 2022-07-03 20:55:49
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
{
  //add 值的时候，进行的是===判断去重，对值的判断，
  //除了NaN判断为自己等于自己，其他的以===判断
  let s = new Set()
  s.add(NaN)
  console.log(s.size)
  s.add(NaN)
  console.log(s.size)
  s.add({})
  s.add({})
  console.log(s)
  //   1
  // 1
  // Set(3) { NaN, {}, {} }
}
{
  //属性方法
  let s = new Set()
  s.add(2).add(3).add(2) //返回值为它本身
  console.log(s.size)
  console.log(s.has(2))
  console.log(s.delete(2), s.has(2))
  s.clear()
  console.log(s)
  //   2
  // true
  // true false
  // Set(0) {}
}
{
  //tobe Array
  Array.from(new Set([1, 2, 2, 4]))
  //[1,2,4]
}
{
  //遍历方法：是顺序遍历，很重要的，跟遍历对象随机遍历不一样
  let s = new Set(['red', 1, '4', null, undefined])
  console.log(s)
  // Set(5) { 'red', 1, '4', null, undefined }
  for (let i of s.keys()) {
    console.log(i)
  }
  for (let v of s.values()) {
    console.log(v)
  }
  for (let i of s.entries()) {
    console.log(i)
  }
  //   ['red', 'red']
  //[(1, 1)][('4', '4')][(null, null)][(undefined, undefined)]
  s.forEach((v, k) => {
    console.log(v, k)
  })
  for (let v of s) {
    //可以直接用
    console.log(v)
  }
}
{
  //遍历的应用
  let s = new Set([1, 23, 4]),
    arr = [...s]
  //扩展运算符
  //交集
  let s1 = new Set([1, 24, 4])
  new Set(arr.filter(v => s1.has(v)))
  //并集
  new Set([...arr, ...s1])
  //差集
  new Set(arr.filter(v => !s1.has(v)))
}
{
  //WeakSet 
}