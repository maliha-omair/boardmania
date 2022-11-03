import styles from "../LudoBoard/LudoBoard.module.css"
import Pawn from "./Pawn"

export default function YellowBlock({s,x, y}) {
    return (
     <div className={[styles.border, styles.yellow].join(' ')} >
          <Pawn s={s} />        
     </div>
   )
}