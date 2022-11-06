import styles from "../LudoBoard/LudoBoard.module.css"
import GenericBlock from "./GenericBlock"
import Pawn from "./Pawn"

export default function WhiteBlockNoBorder({s,x,y, legalMoves, currentPlayer}) {
    return (
        <div className={[styles.noBorder, styles.white].join(' ')} >
            <GenericBlock s={s} x={x} y={y} legalMoves={legalMoves} currentPlayer={currentPlayer}/>
        </div>
   )
}