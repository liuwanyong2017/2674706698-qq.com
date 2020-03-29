//链表的封装
class LinkedList {
    constructor(list) {
        this.header = list || null;
        this.length = list ? 1 : 0;
    }

    append(data) {
        const list = new List(data);
        if (this.length === 0) {
            return this.header = list;
        }
        let current = this.header;
        while (current.next) {
            current = current.next;
        }
        current.next = list;
        this.length += 1;
    }

    insert(data, index) {
        if (index < 0 || index > this.length) {
            throw new Error("index参数不合理");
        }
        const list = new List(data);
        let oldList = this.header;
        if (index === 0) {
            oldList && (list.next = oldList);
            this.header = list;
        } else {
            let i = 0;
            while (i < index - 1) {  //index-1是找的index-1的那个点，index点可以通过它找到
                oldList = oldList.next;
                i++;
            }
            let next = oldList.next;
            oldList.next = list;
            list.next = next;
        }
        this.length++;
    }

    get(position) {
        if (position > this.length - 1 || position < 0) {
            throw new Error("位置参数超出范围了！");
        }
        let current = this.header;
        if (position === 0) return current;
        let i = 0;
        while (i < position) {
            current = current.next;
            i++;
        }
        return current;
    }

    updata(position, data) {
        this.get(position).data = data;
        return true;
    }

    indexOf(data) {
        let current = this.header;
        if (!current) return -1;
        let index;
        let i = 0;
        while (!index && current) {
            if (current.data === data) {
                index = i;
            } else {
                current = current.next;
                i++;
            }
        }
        return index >= 0 ? index : -1;
    }

    size() {
        return this.length;
    }

    isEmpty() {
        return this.length === 0;
    }

    toString() {
        let current = this.header;
        let res = "";
        while (current) {
            res += (res ? " -> " : "") + current.data;
            current = current.next;
        }
        return res;
    }
}

class List {
    constructor(data, next) {
        this.data = data;
        this.next = next ? next : null;
    }
}

const list = new List(1);
const linkedList = new LinkedList(list);
console.log(linkedList);
linkedList.append(30);
linkedList.insert("2", 1);
linkedList.insert("0", 0);
linkedList.insert("6", 3);
linkedList.insert("20", 4);
linkedList.insert("89", 6);
console.log(linkedList, linkedList.toString(), 888,linkedList.get(3),);
console.log( linkedList.indexOf(3),linkedList.updata(3,10),linkedList.get(3));
