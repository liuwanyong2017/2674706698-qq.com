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


// const queue = new Queue([1, 2, 3]);
// console.log(queue.toString(), queue.front(),);
// queue.enqueue(6);
// queue.enqueue(7, 8, 9);
//
// console.log(queue.dequeue(), queue);

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

//优先级队列的实现：
//默认的传入数据为{data:xxx,priority:1}
//priority的值不可重复，递增式的数字类型！
//初始默认的arr参数，顺序遵循priority的order。
class PriorityQueue extends Queue {
    enqueue(...lists) {
        lists.map(
            list => {
                if (
                    this.lists.length === 0 ||
                    this.lists[this.lists.length - 1].priority > list.priority
                ) return this.lists.push(list);

                if (this.lists.length < 6) {
                    let res;
                    for (let i = 0; i < this.lists.length; i++) {
                        if (this.lists[i].priority < list.priority) {
                            this.lists.splice(i, 0, list);
                            res = true;
                            break;
                        }
                    }
                } else {
                    let getIndex = (length) =>
                        // length % 2 === 0 ? [length / 2 - 1, length / 2] :
                        Math.round(length / 2) - 1
                    ;
                    let length = this.lists.length;
                    let index = getIndex(length);
                    let max, min;
                    while (index) {
                        if (min && max && min + 1 === max) {
                            this.lists.splice(max - 1, 0, list);
                            return index = null;
                        }

                        const {priority} = this.lists[index];
                        console.log("indss:", priority, index, "dd", min, max);
                        if (priority > list.priority) {
                            min = min && min > index + 1 ? min : index + 1;
                            length = min + (max||this.lists.length);
                            index = getIndex(length);
                            // console.log('in', index,'pri:', priority);
                        } else {
                            const {priority} = this.lists[index - 1];
                            // console.log('in2222', index,'pri:', priority);

                            if (priority > list.priority) {
                                this.lists.splice(index, 0, list);
                                index = null;
                            } else {
                                max = max && max < index ? max : index;
                                length = max ;
                                index = getIndex(length);
                            }
                            // console.log('in2', index,'pri:', priority);
                        }
                    }
                }
            }
        );
    }
}


const pq = new PriorityQueue(
    [
        {data: 1, priority: 300},
        {data: 1, priority: 200},
        {data: 1, priority: 100},
        {data: 1, priority: 50},
        {data: 1, priority: 25},
        {data: 1, priority: 12},
        {data: 1, priority: 6}
    ]
);

pq.enqueue({data: 2, priority: 40});

pq.enqueue(
    {data: 2, priority: 30},
    {data: 2, priority: 400},
    {data: 2, priority: 7},
    {data: 2, priority: 150}
);

console.log(pq, 0);