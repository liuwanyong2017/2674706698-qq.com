//链表的封装
class LinkedList {
    constructor(list) {
        this.header = list || null;
        this.length = list ? 1 : 0;
    }

    append(content) {
        const list = new List(content);
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

    insert(content, index) {
        if (index < 0 || index > this.length - 1) {
            throw new Error("index参数不合理");
        }
        const list = new List(content);
        let oldList = this.header;
        if (index === 0) {
            oldList && (list.next = oldList);
            this.header = list;
        } else {
            let i = 0;
            let last;
            while (i < index) {
                if (i === index - 1) {
                    last = oldList;
                }
                oldList = oldList.next;
                i++;
            }
            last.next = list;
            list.next = oldList;
        }
        this.length++;
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
            res += (res ? " -> " : "") + current.content;
            current = current.next;
        }
        return res;
    }
}

class List {
    constructor(content, next) {
        this.content = content;
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
linkedList.insert("89", 5);

console.log(linkedList, linkedList.toString(), 888);