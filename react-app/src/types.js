export class PawnCoordinate {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

PawnCoordinate.prototype.toString = function(){
    return `[${this.x}, ${this.y}]`
}


export class LegalMove {

    constructor(from, to){
        this.from = from;
        this.to = to;        
    }
}

LegalMove.prototype.toString = function(){
    return `from: ${this.from} to ${this.to}`;
}