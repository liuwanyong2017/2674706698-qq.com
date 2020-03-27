//栈的实现
//基于数组，或链表

//基于数组：
class Stack {
    constructor(arr) {
        this.lists = arr
    }
    //压入栈
    push(list){
        this.lists.push(list)
    }
    // 取出栈顶元素
    pop(){
        this.lists.pop()
    }
    // 查看栈顶元素
    peek(){
        return this.lists[this.lists.length -1]
    }
    // 判断栈是否为空
    isEmpty(){
        return this.lists.length === 0
    }
    // 获取栈中元素个数
    size(){
        return this.lists.length
    }
    //toString
    toString(){
        return this.lists.reduce(
            (a,b)=>
                a+ (a?'->':'') + (''+b)
            ,''
        )
    }
}
const initArr = [6,5,4]
const s = new Stack(initArr);

console.log(s);
console.log(s.peek());
s.pop()
s.push(3)
console.log(s);
console.log(s.size());
console.log(s.toString());
console.log(s.isEmpty());