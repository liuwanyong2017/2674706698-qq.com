class Dichotomy {
    constructor(arr, fn) {
        this.data = arr;
        this.rule = fn;
    }

    find() {
        const {data, rule} = this;
        const d_length = data.length;
        const getIndex = length => Math.round(length / 2) - 1;
        let index = getIndex(d_length);
        let min, max;
        while (index) {
            if (min && max && min + 1 === max) {
                this.res = max;
                return index = null;
            }
            const {status} = rule(index, data);
            console.log(status, min, max);
            if (status === "min") {
                min = min && min > index + 1 ? min : index + 1;
                index = getIndex(min + (max || d_length));
            } else if (status === "max") {
                max = max && max < index + 1 ? max : index + 1;
                index = getIndex(max);
            } else {
                this.res = status;
                index = null;
            }
        }
        console.log(this.res, "r");
        return this.res;
    }
}

const dichotomy = new Dichotomy(
    [
        {data: 1, priority: 300},
        {data: 1, priority: 200},
        {data: 1, priority: 100},
        {data: 1, priority: 50},
        {data: 1, priority: 25},
        {data: 1, priority: 12},
        {data: 1, priority: 6}
    ],
    (index, data) => {
        const obj = {data: 2, priority: 120};
        if (data[0].priority < obj.priority) return {
            status: 0
        };
        if (data[data.length - 1].priority > obj.priority)
            return {
                status: data.length - 1
            };
        const {priority} = data[index];
        if (priority > obj.priority) return {
            status: "min"
        };
        return {
            status: data[index - 1].priority > obj.priority ?
                index : "max"
        };

    }
);
dichotomy.find();
console.log(dichotomy.res);