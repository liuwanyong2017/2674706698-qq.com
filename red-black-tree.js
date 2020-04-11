//红黑树 ：
class Nil {
    constructor(parent) {
        this.val = null;
        this.parent = parent;
        this.color = 2;
    }
}

class Node {
    constructor(val) {
        this.val = val;
        this.color = 1;  //红为1，黑为2，
        this.parent = null;
        this.left = new Nil(this);
        this.right = new Nil(this);
    }
}

class RedBlackTree {
    constructor(item) {
        this.root = item;
    }

    _search(val, root) {
        const {left, right} = root;
        const node = root.val > val ? left : right;
        if (node instanceof Nil) return root;
        return this._search(val, node);
    }

    search(val) {
        if (this.root) {
            return this._search(val, this.root);
        }
        return null;
    }

    update(node) {
        const {parent, val} = node;   //默认传入的node的颜色都是1
        if (parent) {
            if (parent.color === 2) return;
            const key = parent.val > val ? "left" : "right";
            const sibling = parent[key === "left" ? "right" : "left"];
            const grandP = parent.parent;
            if (grandP) {
                const key1 = grandP.val > parent.val ? "left" : "right";
                const uncle = grandP[key === "left" ? "right" : "left"];
                if (uncle.color === 1) {  //情况3
                    parent.color = 2;
                    uncle.color = 2;
                    grandP.color = 1;
                    this.update(grandP);
                } else {
                    if (key === "left") {  //情况4
                        grandP.color = 1;
                        parent.color = 2;
                        const grandPP = grandP.parent;
                        if (grandPP) {
                            const key2 = grandPP.val > grandP.val ?
                                "left" : "right";
                            grandPP[key2] = parent;
                            parent.parent = grandPP;
                        } else {
                            parent.parent = null;
                        }
                        parent.right = grandP;
                        grandP.left = sibling;
                        grandP.parent = parent;
                        this.update(parent);
                    }else{  //情况5
                        grandP[key1] = node
                        node.parent = grandP
                        node.left = parent
                        parent.parent = node
                        this.update(parent)
                    }
                }
            } else {
                parent.color = 2
            }
        } else {
            node.color = 2
        }

    }

    insert(val) {
        const parent = this.search(val);
        let node = new Node(val);
        if (parent) {
            const {color} = parent;
            const key = val > parent.val ? "right" : "left";
            if (!parent.parent) {  //1
                node.parent = parent;
                node.color = 2;
                parent[key] = node;
            } else {
                if (color === 2) {  //2
                    node.parent = parent;
                    return parent[key] = node;
                } else {
                    parent[key] = node;
                    node.parent = parent;  //连上node
                    this.update(node);
                }
            }
        } else {
            node.color = 2;
            this.root = node;
        }
    }

}