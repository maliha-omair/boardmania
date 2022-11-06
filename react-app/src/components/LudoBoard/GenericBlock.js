import styles from "../LudoBoard/LudoBoard.module.css"
import Pawn from "./Pawn"

export default function GenericBlock({s,x,y, legalMoves, currentPlayer,  onPawnClick}) {

    if(legalMoves === undefined){
        console.log("legal moves is undefined");
    }

    const playable = legalMoves.find(lm => lm.from.x === x && lm.from.y === y) !== undefined;
    const shake =  playable;
    return (
        <>              
            <Pawn s={s} x={x} y={y} playable={playable} shake={shake} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
            {x}, {y}
        </>
   )
}