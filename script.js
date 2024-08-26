class TreeNode {
    constructor(key) {
        this.key = key;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    insert(key) {
        const newNode = new TreeNode(key);
        if (this.root === null) {
            this.root = newNode;
        } else {
            this.insertNode(this.root, newNode);
        }
        this.updateTreeDisplay();
    }

    insertNode(node, newNode) {
        if (newNode.key < node.key) {
            if (node.left === null) {
                node.left = newNode;
            } else {
                this.insertNode(node.left, newNode);
            }
        } else {
            if (node.right === null) {
                node.right = newNode;
            } else {
                this.insertNode(node.right, newNode);
            }
        }
    }

    find(key) {
        const result = this.findNode(this.root, key);
        if (result) {
            alert(`关键值为 ${key} 的节点已找到。`);
        } else {
            alert(`未找到关键值为 ${key} 的节点。`);
        }
    }

    findNode(node, key) {
        if (node === null) {
            return null;
        } else if (key < node.key) {
            return this.findNode(node.left, key);
        } else if (key > node.key) {
            return this.findNode(node.right, key);
        } else {
            return node;
        }
    }

    delete(key) {
        this.root = this.deleteNode(this.root, key);
        this.updateTreeDisplay();
    }

    deleteNode(node, key) {
        if (node === null) {
            return null;
        }
        if (key < node.key) {
            node.left = this.deleteNode(node.left, key);
            return node;
        } else if (key > node.key) {
            node.right = this.deleteNode(node.right, key);
            return node;
        } else {
            if (node.left === null && node.right === null) {
                node = null;
                return node;
            }
            if (node.left === null) {
                node = node.right;
                return node;
            } else if (node.right === null) {
                node = node.left;
                return node;
            }
            const aux = this.findMinNode(node.right);
            node.key = aux.key;
            node.right = this.deleteNode(node.right, aux.key);
            return node;
        }
    }

    findMinNode(node) {
        while (node.left !== null) {
            node = node.left;
        }
        return node;
    }

    updateTreeDisplay() {
        const svg = document.getElementById("tree");
        svg.innerHTML = ''; // 清除之前的内容

        if (!this.root) return;

        const renderNode = (node, x, y, depth, maxDepth) => {
            const radius = 20;
            const offsetX = Math.pow(2, maxDepth - depth) * 20;
            const offsetY = 70;

            // 绘制节点
            const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            circle.setAttribute("class", "node");
            circle.setAttribute("cx", x);
            circle.setAttribute("cy", y);
            circle.setAttribute("r", radius);
            svg.appendChild(circle);

            // 绘制节点中的文本
            const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
            text.setAttribute("class", "text");
            text.setAttribute("x", x);
            text.setAttribute("y", y + 5);
            text.textContent = node.key;
            svg.appendChild(text);

            // 左子节点
            if (node.left) {
                const newX = x - offsetX;
                const newY = y + offsetY;
                const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
                line.setAttribute("x1", x);
                line.setAttribute("y1", y + radius);
                line.setAttribute("x2", newX);
                line.setAttribute("y2", newY - radius);
                line.setAttribute("class", "arrow");
                svg.appendChild(line);
                renderNode(node.left, newX, newY, depth + 1, maxDepth);
            }

            // 右子节点
            if (node.right) {
                const newX = x + offsetX;
                const newY = y + offsetY;
                const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
                line.setAttribute("x1", x);
                line.setAttribute("y1", y + radius);
                line.setAttribute("x2", newX);
                line.setAttribute("y2", newY - radius);
                line.setAttribute("class", "arrow");
                svg.appendChild(line);
                renderNode(node.right, newX, newY, depth + 1, maxDepth);
            }
        };

        const maxDepth = this.getMaxDepth(this.root);
        renderNode(this.root, svg.clientWidth / 2, 50, 1, maxDepth);
    }

    getMaxDepth(node) {
        if (node === null) return 0;
        return Math.max(this.getMaxDepth(node.left), this.getMaxDepth(node.right)) + 1;
    }
}

const bst = new BinarySearchTree();

function insertNode() {
    const input = document.getElementById('keyInput').value;
    const key = parseFloat(input);

    if (isNaN(key)) {
        alert('请输入有效的数字！');
        return;
    }
    if (!Number.isInteger(key)) {
        alert('请输入整数！小数无效。');
        return;
    }
    bst.insert(key);
}

function deleteNode() {
    const input = document.getElementById('keyInput').value;
    const key = parseFloat(input);

    if (isNaN(key)) {
        alert('请输入有效的数字！');
        return;
    }
    if (!Number.isInteger(key)) {
        alert('请输入整数！小数无效。');
        return;
    }
    bst.delete(key);
}

function findNode() {
    const input = document.getElementById('keyInput').value;
    const key = parseFloat(input);

    if (isNaN(key)) {
        alert('请输入有效的数字！');
        return;
    }
    if (!Number.isInteger(key)) {
        alert('请输入整数！小数无效。');
        return;
    }
    bst.find(key);
}
