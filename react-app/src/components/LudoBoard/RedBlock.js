import styles from "../LudoBoard/LudoBoard.module.css"
import Pawn from "./Pawn"

export default function RedBlock({s,x, y}) {
    return (
        <div className={[styles.border, styles.red].join(' ')} >
            <Pawn s={s} />
            {/* {x},{y} */}
        </div>
   )
}