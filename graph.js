//图封装：邻接表


import {Dictionary} from "./dictionary";

const dictionary = new Dictionary()


class Graph {
    constructor(dictionary,vertexes=[]) {
        this.vertexes = vertexes
        this.edges = dictionary || new Dictionary()
    }
}