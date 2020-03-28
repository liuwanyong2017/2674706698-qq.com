//数组实现：
class Queue {
    constructor(arr = []) {
        this.lists = arr;
    }

    //尾部新增
    enqueue(...lists) {
        lists.map(list => this.lists.push(list));
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
    toString() {
        return this.lists.reduce(
            (a, b) => a + (a ? " <- " : "") + ("" + b), ""
        );
    }
}


const queue = new Queue([1, 2, 3]);
console.log(queue.toString(), queue.front(),);
queue.enqueue(6);
queue.enqueue(7, 8, 9);

console.log(queue.dequeue(), queue);

//击鼓传花题目：

const q = new Queue(["a", "b", "c", "d", "e"]);

let timer = 0;
//第一次淘汰：
while (timer < 5) {
    const dequeue = q.dequeue();
    timer !== 4 && q.enqueue(dequeue);
    timer === 4 && console.log(dequeue, q);
    timer++;
}

timer = 0;
//第2次淘汰：
while (timer < 5) {
    const dequeue = q.dequeue();
    timer !== 4 && q.enqueue(dequeue);
    timer === 4 && console.log(dequeue, q);
    timer++;
}

timer = 0;
//第3次淘汰：
while (timer < 5) {
    const dequeue = q.dequeue();
    timer !== 4 && q.enqueue(dequeue);
    timer === 4 && console.log(dequeue, q);
    timer++;
}

timer = 0;
//第4次淘汰：
while (timer < 5) {
    const dequeue = q.dequeue();
    timer !== 4 && q.enqueue(dequeue);
    timer === 4 && console.log(dequeue, q);
    timer++;
}

function drummingFlowers(arr, loopNum) {
    const q = new Queue(arr);
    let timer = 1;
    while (q.size() > 1) {
        const dequeue = q.dequeue();
        timer % loopNum !== 0 && q.enqueue(dequeue);
        timer++;
    }
    return q.front();
}

console.log(drummingFlowers(["a", "b", "c", "d", "e"], 6));