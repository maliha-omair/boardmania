import styles from "../PublicRooms/PublicRooms.module.css"
import defaultImage from "../../assets/1.png"

export default function PublicRoom({room}) {
    return room && (
        <div className={styles.innerDiv}>
            <div className={styles.imageDiv}>
                <img className={styles.image} src={defaultImage}></img>
            </div>
            <div className={styles.titleDesc}>
                <div className={styles.title}>
                    {room.title}
                </div>
                <div className={styles.description}>
                    {room.description}
                </div>
            </div>
            <div className={styles.joinButtonDiv}>
                <button className={styles.joinButton}>Join</button>
            </div>
        </div>
    )
}
