//图封装：邻接表


const {Dictionary} = require("./dictionary");

const dictionary = new Dictionary();


class Graph {
    constructor(vertexes = []) {
        this.vertexes = vertexes;
        let obj = {},obj1={};
        if (vertexes.length) {
            vertexes.map(
                key => obj[key] = [] &&( obj1[key] = 1)
            );
        }
        this.edges = new Dictionary(obj);
        this.vertexState = obj1
    }

    hasVertex(v) {
        return this.vertexes.indexOf(v) >= 0;
    }

    addVertex(v) {
        if (!this.hasVertex(v)) return false;
        this.vertexes.push(v);
        this.edges[v] = [];
        this.vertexState[v] = 1
        return true;
    }

    addEdge(v, v1, unidirectional) {
        if (!this.hasVertex(v) || !this.hasVertex(v1)) return false;
        const edges1 = this.edges.get(v), edges2 = this.edges.get(v1);
        if (edges1.indexOf(v1) < 0) {
            edges1.push(v1);
        }
        if (!unidirectional && edges2.indexOf(v) < 0) {
            edges2.push(v);
        }
        // console.log(edges2,edges1);
        return true;
    }


    toString(){
        return this.vertexes.reduce(
            (a,b)=>
                a+ (a ? '\n': '')+`${b} -> ${this.edges.get(b).join(' ')}`
            ,''
        )
    }
}

const graph = new Graph(["a", "b", "c", "d", "e", "f", "g", "h", "i"]);

graph.addEdge("a", "b");
graph.addEdge("a", "c");
graph.addEdge("a", "d");
graph.addEdge("c", "d");
graph.addEdge("c", "g");
graph.addEdge("d", "g");
graph.addEdge("d", "h");
graph.addEdge("b", "e");
graph.addEdge("b", "f");
graph.addEdge("e", "i");

console.log(graph.toString());