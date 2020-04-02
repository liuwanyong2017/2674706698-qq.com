//哈希

const {DoublyLinkedList,DoublyList}= require('./linked-list')


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
        for (let i = 0; i < str.length; i++) {
            //幂运算的底数，最好是质数：套路论：37用的多。
            hashCode = hashCode * 37 + str.charCodeAt(i);
        }
        this.hashCode = hashCode % size;
    }
}

const hash1 = new Hash("abc", 7);
const hash2 = new Hash("bcde", 7);
const hash3 = new Hash("cab", 7);

console.log(hash1, hash2, hash3);

class HashTable {
    constructor(size) {
        this.table = [];
        this.count = 0;  //存了多少个。
        // 跟size对比，装载因子 >0.75，性能->扩容。
        // 或<0.25时，内存大，count小，就减小数组的长度。自优化！
        this.limit = size;  //table长度
    }

    //存储的数据是{kye,...data},key是唯一标识字段，可以得出index的根据，
    // data,是要存入的数据
    put(obj) {
        if (!obj || typeof obj !== "object" || !obj.key) {
            throw new Error("要存入的数据，必须要是个带有key字段属性的object!");
        }
        const i = new Hash(obj.key, this.limit).hashCode;
        const current = this.table[i];
        if (current) {
            if (current.key === obj.key) {
                this.table[i] = obj;
            } else if (current.key) {
                const doublyLinkedList = new DoublyLinkedList(
                    new DoublyList(current));
                const doublyList = new DoublyList(obj);
                doublyLinkedList.append(doublyList);
                this.table[i] = doublyLinkedList;
                this.count += 1;
            } else {
                const index = current.indexOf(obj);
                if (index < 0) {
                    current.append(new DoublyList(obj));
                    this.count += 1;
                } else {
                    current.update(index, obj);
                }
            }
        } else {
            this.table[i] = obj;
            this.count += 1;
        }
    }
}

const hash_table = new HashTable(7)

hash_table.put(
    {
        key:'abc',name:'liuliu',age:24
    }
)
hash_table.put(
    {
        key:'abc',name:'liuliu',age:22
    }
)
console.log(hash_table.table,hash_table.count);

setTimeout(
    ()=>{
        hash_table.put(
            {
                key:'bcde',name:'liuliu',age:23
            }
        )
        console.log('tt',hash_table.table,hash_table.count);
    }
)