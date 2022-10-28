import styles from "../PublicRooms/PublicRooms.module.css"
import defaultImage from "../../assets/1.png"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux";
import { deleteRoomThunk } from "../../store/rooms";
import { useHistory } from "react-router-dom";
import EditRoom from "../EditRoom/EditRoom";

export default function PublicRoom({ room }) {
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const history = useHistory();
    console.log("user is ....", user)
    function handleDelete() {

        dispatch(deleteRoomThunk(room.id)).catch(async (res) => {
        })
    }

    function handleEdit(){
        history.push(`/rooms/${room.id}/edit`)
        // <EditRoom room={room} />
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
                            (<div className={styles.editRoom} onClick={handleEdit}><i class="fa-solid fa-pen-to-square"></i></div>)
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
