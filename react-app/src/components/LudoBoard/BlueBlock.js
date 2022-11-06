import styles from "../LudoBoard/LudoBoard.module.css"
import GenericBlock from "./GenericBlock"
import Pawn from "./Pawn"

export default function BlueBlock({s,x,y, legalMoves, currentPlayerColor, isMyTurn,  onPawnClick}) {
    return (
        <div className={[styles.border, styles.blue].join(' ')} >              
            <GenericBlock s={s} x={x} y={y} legalMoves={legalMoves} currentPlayerColor={currentPlayerColor} isMyTurn={isMyTurn} onPawnClick={onPawnClick} />
        </div>
   )
}