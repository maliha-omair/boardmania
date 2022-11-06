import styles from "../LudoBoard/LudoBoard.module.css"
import GenericBlock from "./GenericBlock"
import Pawn from "./Pawn"

export default function RedBlock({s,x,y, legalMoves, currentPlayer}) {
    return (
        <div className={[styles.border, styles.red].join(' ')} >
            <GenericBlock s={s} x={x} y={y} legalMoves={legalMoves} currentPlayer={currentPlayer}/>
        </div>
   )
}