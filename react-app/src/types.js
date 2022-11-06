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

    constructor(fromCoordinate, toCoordicate){
        this.fromCoordinate = fromCoordinate;
        this.toCoordicate = toCoordicate;        
    }
}

LegalMove.prototype.toString = function(){
    return `from: ${this.fromCoordinate} to ${this.toCoordicate}`;
}