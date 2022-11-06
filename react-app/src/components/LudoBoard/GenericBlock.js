import styles from "../LudoBoard/LudoBoard.module.css"
import Pawn from "./Pawn"

export default function GenericBlock({s,x,y, legalMoves, currentPlayer}) {

    if(x === 11 && y === 2){
        console.log("legal moves is undefined");
    }

    const playable = legalMoves.find(lm => lm.fromCoordinate.x === x && lm.fromCoordinate.y === y) !== undefined;
    const shake =  playable;
    return (
        <>              
            <Pawn s={s} x={x} y={y} playable={playable} shake={shake} currentPlayer={currentPlayer}/>
            {x}, {y}
        </>
   )
}