import styles from "../LudoBoard/LudoBoard.module.css"
import Pawn from "./Pawn"

export default function GenericBlock({s,x,y, legalMoves, currentPlayerColor, isMyTurn, onPawnClick}) {


    const playable = legalMoves.find(lm => lm.from.x === x && lm.from.y === y) !== undefined && isMyTurn;

    
    return (
        <>              
            <Pawn s={s} x={x} y={y} playable={playable} shake={playable} currentPlayerColor={currentPlayerColor} onPawnClick={onPawnClick} />
            {/* {x}, {y} */}
        </>
   )
}