//哈希

class Hash {
    constructor(str, size) {
        if (
            typeof str !== "string" || typeof size !== "number" ||
            str.trim().length === 0 || size <= 0 || size % 1 > 0
        ) {
            throw new Error("Hash class的初始化参数不合规范！");
        }
        this.str = str;
        this.size = size;
        this.getHashCode();
    }

    //计算hashCode，扩大映射的那个值
    getHashCode() {
        const {str, size} = this;
        //需要字典：默认unicode
        //需要性能，秦九韶算法：提取公因式，循环累乘：
        let hashCode = 0;
        for (let i =0;i<str.length;i++){
            //幂运算的底数，最好是质数：套路论：37用的多。
            hashCode = hashCode * 37 + str.charCodeAt(i);
        }
        this.hashCode = hashCode % size;
    }
}

const hash1 = new Hash("abc", 101);
const hash2 = new Hash("bcd ", 101);
const hash3 = new Hash("cba", 101);

console.log(hash1, hash2, hash3);

class HashTable {
    constructor() {
    }
}