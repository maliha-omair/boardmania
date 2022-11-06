import styles from "../LudoBoard/LudoBoard.module.css"
import GenericBlock from "./GenericBlock"
import Pawn from "./Pawn"

export default function YellowBlock({s,x,y, legalMoves, currentPlayer}) {
    return (
     <div className={[styles.border, styles.yellow].join(' ')} >
          <GenericBlock s={s} x={x} y={y} legalMoves={legalMoves} currentPlayer={currentPlayer}/>
     </div>
   )
}