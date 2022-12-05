import gameDemo from "../../assets/ludoDemo.gif"
import styles from "../GameDemo/GameDemo.module.css"
export default function GameDemo(){
    return (
        <div className={styles.imageDiv}>
            <img className={styles.image} src={gameDemo}></img>
        </div>
    )
}