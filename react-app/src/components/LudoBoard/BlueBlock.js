import styles from "../LudoBoard/LudoBoard.module.css"

export default function BlueBlock() {
    return (
        <div className={[styles.border, styles.blue].join(' ')} />
   )
}