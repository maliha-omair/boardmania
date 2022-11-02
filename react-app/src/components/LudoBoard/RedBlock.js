import styles from "../LudoBoard/LudoBoard.module.css"

export default function RedBlock() {
    return (
        <div className={[styles.border, styles.red].join(' ')} />
   )
}