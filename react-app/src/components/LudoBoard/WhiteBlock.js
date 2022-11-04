import styles from "../LudoBoard/LudoBoard.module.css"
import Pawn from "./Pawn"

export default function WhiteBlock({s, x, y}) {
    return (
        <div className={[styles.border, styles.white].join(' ')} >
            <Pawn s={s} />
            {x},{y}
        </div>
   )
}