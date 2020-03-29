//链表的封装
class LinkedList {
    constructor(list) {
        this.header = list || null;
        this.length = list ? 1 : 0;
    }

    append(content) {
        const list = new List(content);
        if (this.length === 0) {
            this.length += 1;
            return this.header = list;
        } else {
            let current;
            for (let i = 0; i < this.length; i++) {
                current = i === 0 ? this.header : current.next;
                if (current && current.next === null) {
                    this.length += 1;
                    current.next = list;
                    break;
                }
            }
        }
    }

    size() {
        return this.length;
    }

    isEmpty() {
        return this.length === 0;
    }

    toString() {

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
console.log(linkedList);