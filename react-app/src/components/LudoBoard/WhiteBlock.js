import styles from "../LudoBoard/LudoBoard.module.css"

export default function WhiteBlock({s}) {
    return (
        <div className={[styles.border, styles.white].join(' ')} >
            {s && <i class="fa-solid fa-chess-pawn fa-2xl"></i>}
        </div>
   )
}