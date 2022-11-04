
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
            
     
            <div className={styles.owner}>
                <h4>
                    Created By {room.owner.username}
                </h4>
            </div>

            {/* <div className={styles.description}>
                <div className={styles.descSubDiv}>
                    {room.description}
                </div>
            </div> */}

        </div>
    )
}