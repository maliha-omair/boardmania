import styles from "../LudoBoard/LudoBoard.module.css"
import GenericBlock from "./GenericBlock"
import Pawn from "./Pawn"

export default function WhiteBlock({s,x,y, legalMoves, currentPlayer,  onPawnClick}) {
    return (
        <div className={[styles.border, styles.white].join(' ')} >
            <GenericBlock s={s} x={x} y={y} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
        </div>
   )
}