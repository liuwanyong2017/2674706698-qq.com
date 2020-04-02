//哈希

const {DoublyLinkedList, DoublyList} = require("./linked-list");


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
            //这里很纠结的，首先，我解耦了要存的数据是个对象这种复杂类型，并且我没用数组
            //链表存储时候，链表的查询方法indexOf那里，对比的是DoubleList里的data
            //所以这里的对比就很真实对比了，要么对比简单数据的值，要么对比复杂对象的内存地址
            //如果数据本身拷贝过，那就完了！而且data的值就是obj这个参数的值！
            //这里就会限定死了如何匹配查找时，要传入的匹配参照就必须是原本的obj，而不是key
            //当然，我确实需要扩展一下 DoubleLinkedList的indexOf方法，更健壮。
            //当初封装的时候，我一直都有这方面的疑惑的，为啥不是凭借关键字段来匹配？
            //后来觉得，没必要的，尽可能地简单字段。同时就算是复杂的数据的内存地址，那就全等于喽！
            if (current.key === obj.key) {
                this.table[i] = obj;
            } else if (current.key) {
                const doublyLinkedList = new DoublyLinkedList(
                    new DoublyList(current));
                doublyLinkedList.append(obj);
                this.table[i] = doublyLinkedList;
                this.count += 1;
            } else {
                const index = current.indexOf(obj.key, "key");
                if (index < 0) {
                    current.append(obj);
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

    get(key) {
        const index = new Hash(key, this.limit).hashCode;
        const current = this.table[index];
        if (current === undefined || current === null) return null;
        if (current.key) return current;
        const ind = current.indexOf(key, "key");
        if (ind < 0) return null;
        return current.get(ind).data;
    }

    remove(key) {
        const index = new Hash(key, this.limit).hashCode;
        const current = this.table[index];
        if (current === undefined || current === null) return null;
        if (current.key) {
            this.table[index] = null;
            return current;
        }
        ;
        const ind = current.indexOf(key, "key");
        if (ind < 0) return null;
        this.count -= 1;
        return current.removeAt(ind);
    }
}

const hash_table = new HashTable(7);

hash_table.put(
    {
        key: "abc", name: "liuliu", age: 24
    }
);
hash_table.put(
    {
        key: "abc", name: "liuliu", age: 22
    }
);
hash_table.put(
    {
        key: "bcde", name: "liuliu", age: 23
    }
);
hash_table.put(
    {
        key: "de", name: "liu", age: 23
    }
);
console.log(hash_table.table, hash_table.count);
hash_table.remove('abc')
setTimeout(
    () => {
        hash_table.put(
            {
                key: "bcde", name: "liu", age: 21
            }
        );
        console.log(
            "tt", hash_table.table,
            hash_table.count,
            hash_table.get("bcde"),
            hash_table.get("abc"),
        );
    }
);