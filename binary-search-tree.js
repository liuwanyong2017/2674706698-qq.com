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
}


const binarySearchTree = new BinarySearchTree();
const arr = [];
for (let i = 0; i < 10; i++) {
    arr.push(Math.floor(Math.random() * 100));
}
arr.map(
    (num, ind) => binarySearchTree.insert(num, {id: ind})
);
console.log(binarySearchTree);
let arr1 = [], arr2 = [];
binarySearchTree.preOrderTraversalNode(
    (key, data) => {
        arr1.push({key, data});
    }
);
binarySearchTree.midOrderTraversalNode(
    (key, data) => {
        arr2.push({key, data});
    }
);
console.log(arr, arr1, arr2);