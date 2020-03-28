//数组实现：
class Queue {
    constructor(arr = []) {
        this.lists = arr;
    }

    //尾部新增
    enqueue(...lists) {
        lists.map(list=>this.lists.push(list));
    }

    //首部移除
    //这里是数组，其实这里的移除操作，会很消耗性能的。最佳方式是用链表。
    dequeue() {
        return this.lists.shift();
    }

    //返回队列中的第一个元素
    front() {
        return this.lists[0];
    }

    //空：
    isEmpty() {
        return this.lists.length === 0;
    }

    //个数：
    size() {
        return this.lists.length;
    }
    //转成字符串：
    toString(){
        return this.lists.reduce(
            (a,b)=>a+ (a? ' <- ':'')+(''+b),''
        )
    }
}


const queue = new Queue([1,2,3])
console.log(queue.toString(),queue.front(),);
queue.enqueue(6)
queue.enqueue(7,8,9)

console.log(queue.dequeue(),queue);