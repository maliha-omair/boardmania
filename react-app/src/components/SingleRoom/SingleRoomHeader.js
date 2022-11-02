
import styles from "../SingleRoom/SingleRoom.module.css"

export default function SingleRoomHeader({room}) {
    if (!room) return null;

    return room && (
        <div className={styles.centerDiv}>
            <div className={styles.title}>
                <h1>
                    {room.title}
                </h1>
            </div>

            <div className={styles.description}>
                <h3>
                    {room.description}
                </h3>
            </div>

        </div>
    )
}