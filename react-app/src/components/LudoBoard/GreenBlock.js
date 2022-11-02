import styles from "../LudoBoard/LudoBoard.module.css"

export default function GreenBlock({p}) {
    return (
        <div className={[styles.border, styles.green].join(' ')} >
            {p && <i class="fa-solid fa-chess-pawn fa-2xl"></i>}
        </div>
   )
}