import styles from "../LudoBoard/LudoBoard.module.css"
import Pawn from "./Pawn"

export default function BlueBlock({s,x,y}) {
    return (
        <div className={[styles.border, styles.blue].join(' ')} >              
            <Pawn s={s} />
        </div>
   )
}