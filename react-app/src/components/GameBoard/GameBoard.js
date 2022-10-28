import board from "../../assets/ludoBoard.png"
import styles from "../GameBoard/GameBoard.module.css"

export default function GameBoard() {
    return (
        <div className={styles.mainContainer}>
            <div className={styles.boardDiv}>
                <img src={board} className={styles.boardImage}></img>
            </div>
        </div>
    )
}