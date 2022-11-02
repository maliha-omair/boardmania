import styles from "../LudoBoard/LudoBoard.module.css"

export default function WhiteBlock() {
    return (
        <div className={[styles.border, styles.white].join(' ')} />
   )
}