//系统学习排序方法：

// 封装一个容器
class ArrayLists {
    constructor(arr = []) {
        this.items = arr;
    }

    insert(val) {
        this.items.push(val);
    }

    toString() {
        return this.items.reduce(
            (a, b) => a + (a ? " -> " : "") + b, ""
        );
    }

    // 冒泡排序
    bubble() {
        let count = 0, {items} = this;
        while (count < items.length - 2) {
            for (let i = 0; i < items.length - 1 - count; i++) {
                if (items[i] > items[i + 1]) {
                    const min = items[i + 1];
                    items[i + 1] = items[i];
                    items[i] = min;
                }
            }
            count++;
        }
        return items;
    }

    //优化冒泡排序,有问题的！暂时无问题：
    bubbleFix() {
        let start = 0, {items} = this, end = items.length - 1;
        while (start <= end) {
            console.log(start, end);

            let min = items[start], max = min,
                minIndex = [start], maxIndex = [start];
            for (let i = start; i <= end; i++) {
                const n = items[i];
                if (min > n) {
                    min = n;
                    minIndex = [i];
                } else if (min === n && i !== start) {
                    minIndex.push(i);
                }
                if (max < n) {
                    max = n;
                    maxIndex = [i];
                } else if (max === n && i !== start) {
                    maxIndex.push(i);
                }
            }
            const copy = {}, copy1 = {};
            console.log(min, minIndex, items);

            minIndex.map(
                v => {
                    if (v === start) return start += 1;
                    const startV = items[start];
                    if (startV === max) {
                        if (copy1[start] === undefined) {
                            copy[start] = v;
                            copy1[v] = start;
                        } else {
                            copy[copy1[start]] = v;
                            copy1[v] = copy1[start];
                        }
                    }
                    items[start] = min;
                    items[v] = startV;
                    start++;
                }
            );
            console.log(items, start, end, 888, max);
            for (let i = maxIndex.length - 1; i >= 0; i--) {
                let ind = maxIndex[i];
                if (ind !== end) {
                    if (copy[ind] >= 0) {
                        ind = copy[ind];
                    }
                    items[ind] = items[end];
                    items[end] = max;
                }
                end -= 1;
            }
            console.log(start, end, 9999);
        }
    }

    //选择排序
    selectionSort() {
        const {items} = this;
        let min = 0, start = 0;
        while (start < items.length - 1) {
            for (let i = start; i <= items.length - 1; i++) {
                if (items[min] > items[i]) {
                    min = i;
                }
            }
            let v = items[min];
            items[min] = items[start];
            items[start] = v;
            start +=1;
            min = start;
        }
    }
}

const arr = [];
for (let i = 0; i <= 20; i++) {
    arr.push(Math.floor(Math.random() * 10));
}
console.log(arr);
const lists = new ArrayLists(arr);
lists.selectionSort();
console.log(lists.items);


//以前写的排序算法：

const arr1 = [];

for (let i = 0; i < 30; i++) {
    arr.push(Math.round(Math.random() * 100));
}

class Sort {
    constructor(data) {
        this.data = [...data];
        this.min = [];
        this.max = [];
        this.left = 0;
        this.right = data.length - 1;
    }

    loop() {
        const {data} = this;
        let min = data[0], max = data[0];
        let minIndex = 0, maxIndex = 0;
        data.map(
            (num, ind) => {
                if (num > max) {
                    max = num;
                    maxIndex = ind;
                }
                if (num < min) {
                    min = num;
                    minIndex = ind;
                }
            }
        );
        this.min.push(min);
        this.max.unshift(max);
        const larger = minIndex > maxIndex ? minIndex : maxIndex;
        const small = minIndex < maxIndex ? minIndex : maxIndex;
        data.splice(larger, 1);  //这里的性能有损耗，最好的方法是用双链表
        data.splice(small, 1);
        while (data.length > 1) {
            this.loop();
        }
        if (data.length === 1) {
            this.min.push(data[0]);
        }
    }

    loop1() {
        const {data} = this;
        let min = data[this.left], max = data[this.left];
        let minIndex = [this.left], maxIndex = [this.left];
        for (let i = this.left; i <= this.right; i++) {
            if (data[i] > max) {
                max = data[i];
                maxIndex = [i];
            } else if (data[i] === max && i !== this.left) {
                maxIndex.push(i);
            }
            if (data[i] < min) {
                min = data[i];
                minIndex = [i];
            } else if (data[i] === min && i !== this.left) {
                minIndex.push(i);
            }
            // console.log(minIndex,min,max,maxIndex)
        }
        if (max === min) return;
        minIndex.map(
            ind => {
                if (ind !== this.left) {
                    const leftVal = data[this.left];
                    const indVal = data[ind];
                    data[this.left] = indVal;
                    data[ind] = leftVal;
                }
                this.left += 1;
            }
        );
        maxIndex.map(
            ind => {
                if (ind !== this.right) {
                    const rightVal = data[this.right];
                    const indVal = data[ind];
                    data[this.right] = indVal;
                    data[ind] = rightVal;
                }
                this.right -= 1;
            }
        );
        while (this.right - this.left > 1) {
            this.loop1();
        }
    }
}

// const sort = new Sort(arr);
// sort.loop();
// console.log(arr, sort);
// sort.loop1()
// console.log(sort.data)

