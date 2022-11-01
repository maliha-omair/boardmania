import { useEffect } from "react"
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom";
import { getUserRoomsThunk } from "../../store/rooms";
import { getUserMemberships } from "../../store/session";
import styles from "../UserRooms/UserRooms.module.css"
import UserRoom from "./UserRoom";

export default function OwnedRooms() {
    const dispatch = useDispatch();
    const history = useHistory();
    const rooms = useSelector(state => state.rooms && state.rooms.userRooms)
    useEffect(() => {
          dispatch(getUserRoomsThunk());
    }, dispatch)
    function handleClick(){
        history.push("/newRoom")
    }
    if (!rooms) return null
    return rooms && (rooms.length > 0 && (
        <div className={styles.mainContainer}>
            {Object.values(rooms).map((room) => {
                return <UserRoom room={room} />
            })}         
        </div>
    )) || (
        <div className={styles.noRooms}>
            You have created no rooms 
            &nbsp;<button className={styles.joinButton} onClick={handleClick}> Create</button>
        </div>
    )
}
