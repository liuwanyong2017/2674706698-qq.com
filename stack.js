//栈的实现
//基于数组，或链表

//基于数组：
class Stack {
    constructor(arr) {
        this.lists = arr;
    }

    //压入栈
    push(list) {
        this.lists.push(list);
    }

    // 取出栈顶元素
    pop() {
        return this.lists.pop();
    }

    // 查看栈顶元素
    peek() {
        return this.lists[this.lists.length - 1];
    }

    // 判断栈是否为空
    isEmpty() {
        return this.lists.length === 0;
    }

    // 获取栈中元素个数
    size() {
        return this.lists.length;
    }

    //toString
    toString() {
        return this.lists.reduce(
            (a, b) =>
                a + (a ? "->" : "") + ("" + b)
            , ""
        );
    }
}

const initArr = [6, 5, 4];
const s = new Stack(initArr);

console.log(s);
console.log(s.peek());
s.pop();
s.push(3);
console.log(s);
console.log(s.size());
console.log(s.toString());
console.log(s.isEmpty());

//十进制转二进制：num %2 的余数从后往前拼接，num每次都重新赋值 Math.floor(num/2)

function dec2bin(num) {
    const s = new Stack([]);
    while (num > 0) {
        s.push(num % 2);
        num = Math.floor(num / 2);
    }
    let res = "";
    while (!s.isEmpty()) {
        res += s.pop();
    }
    return res;
}

console.log(dec2bin(100));
console.log(dec2bin(1));
console.log(dec2bin(2));
console.log(dec2bin(10));



