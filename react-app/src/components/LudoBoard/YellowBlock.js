import styles from "../LudoBoard/LudoBoard.module.css"

export default function YellowBlock({s}) {
    return (
        <div className={[styles.border, styles.yellow].join(' ')} >
             {s && <i class="fa-solid fa-chess-pawn fa-2xl"></i>}
        </div>
   )
}