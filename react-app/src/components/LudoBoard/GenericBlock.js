import styles from "../LudoBoard/LudoBoard.module.css"
import Pawn from "./Pawn"

export default function GenericBlock({s,x,y, legalMoves, currentPlayerColor, isMyTurn, onPawnClick}) {


    const playable = legalMoves.find(lm => lm.from.x === x && lm.from.y === y) !== undefined;

    if(currentPlayerColor === "Y" && playable){
        console.log("legal moves is undefined");
    }
    const shake =  playable && isMyTurn;
    return (
        <>              
            <Pawn s={s} x={x} y={y} playable={playable} shake={shake} currentPlayerColor={currentPlayerColor} onPawnClick={onPawnClick} />
            {x}, {y}
        </>
   )
}