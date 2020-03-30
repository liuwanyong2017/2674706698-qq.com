const arr = [];

for (let i = 0; i < 30; i++) {
    arr.push(Math.round(Math.random() * 100));
}

class Sort {
    constructor(data) {
        this.data = [...data];
        this.min = [];
        this.max = [];
    }

    loop() {
        const {data} = this
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
        data.splice(larger,1);  //这里的性能有损耗，最好的方法是用双链表
        data.splice(small,1);
        while(data.length>1){
            this.loop()
        }
        if (data.length === 1){
            this.min.push(data[0])
        }
    }
}

const sort = new Sort(arr)
sort.loop()
console.log(arr,sort);