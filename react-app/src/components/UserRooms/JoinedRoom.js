import styles from "../UserRooms/UserRooms.module.css"
import defaultImage from "../../assets/1.png"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux";
import { deleteRoomThunk } from "../../store/rooms";
import { useHistory } from "react-router-dom";
// import EditRoom from "../EditRoom/EditRoom";

export default function JoinedRoom({ room }) {
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const history = useHistory();
   
    function handleDelete() {
        dispatch(deleteRoomThunk(room.id))
        console.log("room is ...",room)
        .then((res)=>{
          
        }).catch(async (res) => {

        })
    }

    function handleClick(){
        history.push(`/rooms/${room.id}/view`)
        
    }
    return room && (
        <div className={styles.innerDiv}  onClick={handleClick}>
            <div className={styles.imageDiv}>
                <img className={styles.image} src={defaultImage}></img>
            </div>
            <div className={styles.titleDesc}>
                <div className={styles.title}>
                    <div className={styles.titleDiv}>
                        <div>
                            {room.title}
                        </div>
                    </div>
                </div>
                <div className={styles.description}>
                    {room.description}
                </div>
                <div className={styles.description}>
                    {room.status}
                </div>
            </div>
            
        </div>
    )
}
