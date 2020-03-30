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

    update(position, data) {
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

    removeAt(position) {
        if (position < 0 || position > this.length - 1 || this.length === 0) {
            throw new Error("参数超出范围！");
        }
        let current = this.header;
        if (position === 0) {
            this.length -= 1;
            this.header = current.next;
            return current;
        } else {
            let i = 0;
            while (i < position - 1) {
                current = current.next;
                i++;
            }
            const target = current.next;
            if (target) {
                current.next = target.next;
                this.length -= 1;
                return target;
            }
        }
    }

    remove(data) {
        const index = this.indexOf(data);
        return this.removeAt(index);
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
console.log(linkedList, linkedList.toString(), 888, linkedList.get(3),);
console.log(linkedList.indexOf(3), linkedList.update(3, 10), linkedList.get(3));
console.log(linkedList.removeAt(3), linkedList.toString());
console.log(linkedList.remove("20"), linkedList.toString(), linkedList.size());

class DoublyList extends List {
    constructor(data, next, prev) {
        super(data, next);
        this.prev = prev || null;
    }
}

class DoublyLinkedList extends LinkedList {
    constructor(list) {
        super(list);
        this.tail = list || null;
    }

    append(data) {
        const list = new DoublyList(data);
        if (this.length === 0) {
            list.prev = null;
            this.header = list;
            this.tail = list;
        } else {
            const last = this.tail;
            last.next = list;
            list.prev = last;
            this.tail = list;
        }
        this.length += 1;
    }

    insert(data, index) {
        if (index < 0 || index > this.length) {
            throw new Error("插入的下标超出范围！");
        }
        const list = new DoublyList(data);
        if (index === 0) {
            const current = this.header;
            if (current) {
                this.header = list;
                list.next = current;
                current.prev = list;
            } else {
                this.tail = list;
                this.header = list;
            }
        } else if (index === this.length) {
            const last = this.tail;
            last.next = list;
            list.prev = last;
            this.tail = list;
        } else {
            const test = index * 2 > this.length - 1;
            let i = test ? this.length - 1 : 0;
            let current = test ? this.tail : this.header;
            let key = test ? "prev" : "next";
            if (test) {
                while (i > index) {
                    current = current[key];
                    i--;
                }
            } else {
                while (i < index) {
                    current = current[key];
                    i++;
                }
            }
            const last = current.prev;
            list.prev = last;
            last.next = list;
            list.next = current;
            current.prev = list;
        }

        this.length++;
    }

    get(index) {
        if (index < 0 || this.length === 0 || index > this.length - 1) {
            throw new Error("超出链表的长度范围");
        }
        const test = index * 2 > this.length - 1;
        let current = test ? this.tail : this.header;
        let i = test ? this.length - 1 : 0;
        const key = test ? "prev" : "next";
        if (test) {
            while (i > index) {
                current = current[key];
                i--;
            }
        } else {
            while (i < index) {
                current = current[key];
                i++;
            }
        }
        return current;
    }

    backwardString() {
        return this.toString();
    }

    forwardString() {
        let current = this.tail;
        let res = "";
        while (current) {
            res += (res ? " <- " : "") + current.data;
            current = current.prev;
        }
        return res;
    }
}

const doublyList = new DoublyList(1);
const doublyLinkedList = new DoublyLinkedList(doublyList);
doublyLinkedList.append(2);
doublyLinkedList.append(3);
doublyLinkedList.append(4);
doublyLinkedList.insert("哈哈", 2);
console.log(doublyLinkedList,
    doublyLinkedList.backwardString(),
    doublyLinkedList.forwardString(),
    doublyLinkedList.get(3)
);
