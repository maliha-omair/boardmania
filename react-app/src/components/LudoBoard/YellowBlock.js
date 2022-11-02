import styles from "../LudoBoard/LudoBoard.module.css"

export default function YellowBlock() {
    return (
        <div className={[styles.border, styles.yellow].join(' ')} />
   )
}