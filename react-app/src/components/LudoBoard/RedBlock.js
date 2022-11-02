import styles from "../LudoBoard/LudoBoard.module.css"

export default function RedBlock({s}) {
    return (
        <div className={[styles.border, styles.red].join(' ')} >
            {s && <i class="fa-solid fa-chess-pawn fa-2xl"></i>}
        </div>
   )
}