import styles from "../LudoBoard/LudoBoard.module.css"

export default function WhiteBlockNoBorder() {
    return (
        <div className={[styles.noBorder, styles.white].join(' ')} />
   )
}