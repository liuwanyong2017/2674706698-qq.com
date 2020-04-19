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
            start += 1;
            min = start;
        }
    }

    //插入排序
    insertSort() {
        const {items} = this;
        let count = 1;
        while (count <= items.length - 1) {
            for (let i = count; i >= 1; i--) {
                const current = items[i], last = items[i - 1];
                if (current < last) {
                    items[i] = last;
                    items[i - 1] = current;
                } else {
                    break;
                }
            }
            count++;
        }
    }

    // 插入排序混合二分法优化

    insertSortFix() {
        const {items} = this;
        let count = 1;
        while (count <= items.length - 1) {
            const v = items[count];
            if (count === 1) {
                if (v < items[0]) {
                    items[1] = items[0];
                    items[0] = v;
                }
            } else {
                const x = (start, end) => {
                    const mid = Math.round((start + end) / 2);
                    if (items[mid] > v) {
                        if (items[mid - 1] <= v) {
                            for (let i = count; i <= count; i++) {
                                //这里还是要重复原本的方法的操作了，，，跟没优化一个样子了！
                                //二分法这里并可以快速定位，但是插入和删除操作，依旧跟原来的
                            }
                        }
                    } else {

                    }
                };

            }
            count++;
        }
    }

    // 希尔排序
    shellSort() {
        let {items} = this;
        const {length} = items;
        let gap = Math.floor(length / 2);
        let count1 = 0;
        while (gap >= 1) {
            const max = Math.round(length / gap);
            for (let i = 0; i <= max; i++) {
                let count = i + gap;
                while (count <= length - 1) {
                    for (let j = count; j >= gap; j -= gap) {
                        const current = items[j];
                        if (current < items[j - gap]) {
                            items[j] = items[j - gap];
                            items[j - gap] = current;
                        } else {
                            break;
                        }
                    }
                    count1++;
                    count += gap;
                }
            }
            gap = Math.floor(gap / 2);
        }
        console.log(count1);
    }

    shellSort1() {
        //尝试写法不一样：
        const {items} = this;
        const {length} = items;
        let gap = Math.floor(length / 2);
        let count = 0;
        while (gap >= 1) {
            for (let i = 0; i < length; i++) {
                for (let j = i; j >= gap; j -= gap) {
                    const current = items[j];
                    if (current < items[j - gap]) {
                        items[j] = items[j - gap];
                        items[j - gap] = current;
                    } else {
                        break;
                    }
                }
                count++;
            }
            gap = Math.floor(gap / 2);
        }
        console.log(count);
    }

    // 快速排序：
    //找到枢纽：
    initMid(left, right, arr) {
        const mid = Math.floor((left+right)/2)
        if (arr[left] > arr[mid]) {
            const v = arr[left];
            arr[left] = arr[mid];
            arr[mid] = v;
        }   //保证 mid >= left
        if (arr[mid] > arr[right]) {
            const v = arr[mid];
            arr[mid] = arr[right];
            arr[right] = v;
        }  //保证 mid <= right
        const v = arr[mid];
        arr[mid] = arr[right - 1];
        arr[right - 1] = v;
    }

    __filter(left, right, arr) { //错误版本的！
        console.log(left, right);
        if (right - 1 <= left) {
            const v = arr[left];
            if (arr[right] < v) {
                arr[left] = arr[right];
                arr[right] = v;
            }
            return;
        }
        ;
        let mid = Math.floor((left + right) / 2);
        let nextLeft = left, nextRight = right;
        this.initMid(left, right, mid, arr);
        if (right - left === 2) return;
        right -= 2;
        const midVul = arr[nextRight - 1];
        while (left <= right) {
            if (left === right) {
                if (arr[left] > midVul) {
                    arr[nextRight - 1] = arr[left];
                    arr[left] = midVul;
                    this._filter(nextLeft, mid - 1, arr);
                    this._filter(mid + 1, nextRight, arr);
                    return;
                } else if (arr[left] === midVul) {
                    const initMid = mid;
                    mid += 1;
                    while (arr[mid] === midVul) {
                        mid += 1;
                    }
                    if (mid + 1 < nextRight - 1) {
                        arr[nextRight - 1] = arr[mid + 1];
                        arr[mid + 1] = midVul;
                        this._filter(nextLeft, initMid - 1, arr);
                        this._filter(mid + 2, nextRight, arr);
                        return;
                    } else {
                        this._filter(nextLeft, initMid - 1, arr);
                        this._filter(mid + 1, nextRight, arr);
                        return;
                    }
                } else {
                    mid += 1;
                    const initMid = mid;
                    while (arr[mid] === midVul) {
                        mid += 1;
                    }
                    if (mid + 1 < nextRight - 1) {
                        arr[nextRight - 1] = arr[mid + 1];
                        arr[mid + 1] = midVul;
                        this._filter(nextLeft, initMid - 1, arr);
                        this._filter(mid + 2, nextRight, arr);
                        return;
                    } else {
                        this._filter(nextLeft, initMid - 1, arr);
                        this._filter(mid + 1, nextRight, arr);
                        return;
                    }
                }
            } else {
                let min, max;
                while (max === undefined && left < right) {
                    if (arr[left] > midVul) {
                        max = arr[left];
                    } else {
                        left++;
                    }
                }
                while (min === undefined && left < right) {
                    if (arr[right] < midVul) {
                        min = arr[left];
                    } else {
                        right--;
                    }
                }
                if (min !== undefined && max !== undefined) {
                    arr[right] = max;
                    arr[left] = min;
                    max = undefined;
                    min = undefined;
                    left++;
                    right--;
                }
            }
        }
    }

    _filter(left, right, arr) {
        console.log(left,right);
        if (right - 1 === left) {
            const v = arr[right];
            if (v < arr[left]) {
                arr[right] = arr[left];
                arr[left] = v;
            }
            return;
        }
        this.initMid(left, right, arr);
        if (left + 2 === right) return;
        const midV = arr[right - 1], nextLeft = left, nextRight = right;
        right -= 2;
        while (left < right) {
            let min, max;
            while (max === undefined && left <= right) {
                if (arr[left] > midV) {
                    max = arr[left];
                } else {
                    if (left===right)return;
                    left++;
                }
            }
            while (min === undefined && left <= right) {
                console.log(left,right);
                if (arr[right] < midV) {
                    min = arr[right];
                } else {
                    if (left===right)return;
                    right--;
                }
            }
            if (min !== undefined && max !== undefined) {
                console.log(left,right,arr);
                arr[left] = min;
                arr[right] = max;
                min = undefined;
                max = undefined;
                left++;
                right++;
            } else if (min!==undefined){
                arr[nextRight-1]=arr[right+1]
                arr[right+1]=midV
                console.log(arr);
                this._filter(nextLeft,right,arr)
                return this._filter(right+2,nextRight,arr)
            }else if (max!==undefined){
                arr[nextRight-1]=arr[left]
                arr[left]=midV
                console.log(arr);
                this._filter(nextLeft,left-1,arr)
                return this._filter(left+1,nextRight,arr)
            }else{
                return this._filter(nextLeft,nextRight-2,arr)
            }
        }
    }

    fastSort() {
        const {items} = this;
        this._filter(0, items.length - 1, items);
    }
}

const arr = [];
for (let i = 0; i <= 30; i++) {
    arr.push(Math.floor(Math.random() * 100));
}
console.log(arr);
const lists = new ArrayLists(arr);
lists.fastSort();
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

