import styles from "../PublicRooms/PublicRooms.module.css"
import defaultImage from "../../assets/1.png"
import { useSelector } from "react-redux"

export default function PublicRoom({room}) {
    const user = useSelector(state => state.session.user);
    console.log("user is ....",user)
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
                {room.owner_id!=user.id &&  (
                    <button className={styles.joinButton}>Join</button>
                )}
                {room.owner_id==user.id &&  (
                    <button className={styles.joinButton}>Delete</button>
                )}
                
            </div>
        </div>
    )
}
