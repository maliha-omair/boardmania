import styles from "../LudoBoard/LudoBoard.module.css"

export default function GreenBlock({s}) {
    return (
        <div className={[styles.border, styles.green].join(' ')} >
            <div className={styles.redPawn}>
                {s && <i class="fa-solid fa-chess-pawn fa-2xl"></i>}
            </div>
        </div>
   )
}