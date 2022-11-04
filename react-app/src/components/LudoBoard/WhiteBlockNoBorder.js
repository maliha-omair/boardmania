import styles from "../LudoBoard/LudoBoard.module.css"
import Pawn from "./Pawn"

export default function WhiteBlockNoBorder({s, x, y}) {
    return (
        <div className={[styles.noBorder, styles.white].join(' ')} >
             <Pawn s={s} />
             {/* {x},{y} */}
        </div>
   )
}