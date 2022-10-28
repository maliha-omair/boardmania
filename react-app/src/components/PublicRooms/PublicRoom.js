import styles from "../PublicRooms/PublicRooms.module.css"
import defaultImage from "../../assets/1.png"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux";
import { deleteRoomThunk } from "../../store/rooms";

export default function PublicRoom({ room }) {
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    console.log("user is ....", user)
    function handleDelete() {

        dispatch(deleteRoomThunk(room.id)).catch(async (res) => {
        })
    }
    return room && (
        <div className={styles.innerDiv}>
            <div className={styles.imageDiv}>
                <img className={styles.image} src={defaultImage}></img>
            </div>
            <div className={styles.titleDesc}>
                <div className={styles.title}>
                    <div className={styles.titleDiv}>
                        <div>
                            {room.title}
                        </div>
                        {room.owner_id == user.id && (
                            (<div className={styles.editRoom}><i class="fa-solid fa-pen-to-square"></i></div>)
                        )}
                    </div>
                </div>
                <div className={styles.description}>
                    {room.description}
                </div>
            </div>
            <div className={styles.joinButtonDiv}>
                {room.owner_id != user.id && (
                    <button className={styles.joinButton}>Join</button>
                )}
                {room.owner_id == user.id && (
                    <button className={styles.joinButton} onClick={handleDelete}>Delete</button>
                )}

            </div>
        </div>
    )
}
