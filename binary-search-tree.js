//二叉搜索树

class Node {
    constructor(key, data) {
        if (typeof key !== "number") {
            throw new Error("Node 构造函数必须要有一个Number类型的key参数！");
        }
        this.key = key;
        data && (this.data = data);
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {
    constructor(root) {
        this.root = root || null;
    }

    _insertNode(current, node) {
        if (current.key > node.key) {
            const {left} = current;
            if (left === null) return current.left = node;
            this._insertNode(left, node);
        } else {
            const {right} = current;
            if (right === null) return current.right = node;
            this._insertNode(right, node);
        }
    }

    insert(key, data) {
        const node = new Node(key, data);
        if (this.root) {
            this._insertNode(this.root, node);
        } else {
            this.root = node;
        }
    }

    //先序遍历

    preOrderTraversalNode(callback) {
        //先遍历好左节点，再遍历右节点：
        this._preOrderTraversalNode(this.root, callback);
    }

    _preOrderTraversalNode(node, callback) {
        //先遍历好左节点，再遍历右节点：
        if (node !== null) {
            callback(node.key, node.data);
            this._preOrderTraversalNode(node.left, callback);
            this._preOrderTraversalNode(node.right, callback);
        }
    }

    midOrderTraversalNode(callback) {
        this._midOrderTraversalNode(this.root, callback);
    }

    _midOrderTraversalNode(node, callback) {
        if (node) {
            this._midOrderTraversalNode(node.left, callback);
            callback(node.key, node.data);
            this._midOrderTraversalNode(node.right, callback);
        }
    }

    postOrderTraversalNode(callback) {
        this._postOrderTraversalNode(this.root, callback);
    }

    _postOrderTraversalNode(node, callback) {
        if (node) {
            this._postOrderTraversalNode(node.left, callback);
            this._postOrderTraversalNode(node.right, callback);
            callback(node.key, node.data);
        }
    }

    get max() {
        let current = this.root;
        if (current === null) return null;
        while (current.right) {
            current = current.right;
        }
        return current.key;
    }

    get min() {
        let current = this.root;
        if (current === null) return null;
        while (current.left) {
            current = current.left;
        }
        return current.key;
    }

    search(key) {
        return this._search(this.root, key);
        //不用递归：
        // let current = this.root;
        // if (current === null) return null;
        // let res = null;
        // while (current) {
        //     if (current.key === key) return res = current;
        //     current = current[current.key > key ? "left" : "right"];
        // }
        // return res;
    }

    _search(node, key) {
        if (node !== null) {
            if (node.key === key) return node;
            return node.key > key ?
                this._search(node.left, key) :
                this._search(node.right, key);
        }
        return null;
    }

    _removeRoot(node) {
        if (node.right === null && node.left === null) {
            this.root = null;  //木有子节点
            return node;
        }
        if (node.right && node.left) { //两个子节点
            const {precursor, successor,parentNeed} =
                this.findPrecursorOrSuccessor(node);
            const newNode = precursor || successor;
            if (parentNeed){
                newNode.right = node.right
                newNode.left = node.left
            }else{
                precursor && (precursor.right = node.right);
                successor && (successor.left = node.left);
            }
            this.root = newNode;
            return node;
        } else { //一个子节点
            this.root = node.right || node.left;
            return node;
        }
    }

    remove(key) {
        const res = this._findNode1(key);
        if (res === null) return false;
        const {node, parent, child} = res;
        if (node) {
            //删除的是根节点！
            return this._removeRoot(node);
        } else {
            //node 与 parent不共存的：
            //1.没有子节点：
            const node = parent[child];
            if (node.right === null && node.left === null) {
                parent[child] = null;
                return node;
            }
            if (node.right && node.left) { //2个子节点
                const {precursor, successor, parentNeed} =
                    this.findPrecursorOrSuccessor(node);
                const newNode = precursor || successor;
                if (parentNeed) {
                    newNode.left = node.left;
                    newNode.right = node.right;
                } else {
                    precursor ? (precursor.right = node.right) :
                        (successor.left = node.left);
                }
                parent[child] = newNode;
                // console.log(parent, "parent", newNode, "new");
                return node;
            } else { //1个子节点
                parent[child] = node.right || node.left;
                return node;
            }
        }
    }


    //定位删除的元素：


    _findNode1(key) {
        let parent = this.root, current = null;
        if (parent === null) return null;
        while (current === null) {
            if (parent.key === key) return {node: parent};
            const testKey = parent.key > key ? "left" : "right";
            const child = parent[testKey];

            if (child) {
                if (child.key === key) {
                    return {parent, child: testKey};
                } else {
                    parent = child;
                }
            } else {
                return null;
            }
        }
    }

    findNode(key) {
        return this._findNode(this.root, key);
    }

    _findNode(node, key) {
        if (node === null) return null;
        if (node.key === key) {
            return {node};
        }
        const test = node.key > key;
        const testKey = test ? "left" : "right";
        const child = node[testKey];
        if (child) {
            if (child.key === key)
                return {parent: node, child: testKey};
            return this._findNode(child, key);
        } else {
            return null;
        }
    }

    //找到替换的元素：前驱/后继
    findPrecursorOrSuccessor(node) {
        const {left, right} = node;
        let precursor = left, successor = right, parent;
        if (precursor) {
            while (precursor.right) {
                parent = precursor;
                precursor = precursor.right;
            }
            //预处理，替换的节点跟它的父节点的交接工作：
            if (parent) {
                parent.right = precursor.left;  //有木有值都对！
            }
            return {precursor, parentNeed: Boolean(parent)};
            //这是区分是否是直接为删除节点的直接left节点的
        } else {
            while (successor.left) {
                parent = successor;
                successor = successor.left;
            }
            //预处理，替换的节点跟它的父节点的交接工作：
            if (parent) {
                parent.left = successor.right;  //有木有值都对！
            }
            return {successor, parentNeed: Boolean(parent)};
            //这是区分是否是直接为删除节点的直接right节点的
        }
    }
}


const binarySearchTree = new BinarySearchTree();
const arr = [];
for (let i = 0; i < 10; i++) {
    arr.push(Math.floor(Math.random() * 100));
}
let arr5 = [11, 7, 15, 5, 9, 3, 6, 8, 10, 13, 20, 12, 14, 18, 25];
arr5.map(
    (num, ind) => binarySearchTree.insert(num, {id: ind})
);
console.log(arr);
let arr1 = [], arr2 = [], arr3 = [];
binarySearchTree.remove(11);

binarySearchTree.preOrderTraversalNode(
    (key, data) => {
        arr1.push({key, data});
    }
);
// binarySearchTree.midOrderTraversalNode(
//     (key, data) => {
//         arr2.push({key, data});
//     }
// );
// binarySearchTree.postOrderTraversalNode(
//     (key, data) => {
//         arr3.push({key, data});
//     }
// );
console.log(
    arr, arr1,
    binarySearchTree.search(arr[5]), binarySearchTree.search(arr[7]),
);