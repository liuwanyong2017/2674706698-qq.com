const arr = [];

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
        while(this.right-this.left>1){
            this.loop1()
        }
    }
}

const sort = new Sort(arr);
// sort.loop();
// console.log(arr, sort);
sort.loop1()
console.log(sort.data)