import { useEffect } from "react"
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux"
import { getUserRoomsThunk } from "../../store/rooms";
import { getUserMemberships } from "../../store/session";
import styles from "../UserRooms/UserRooms.module.css"
import UserRoom from "./UserRoom";

export default function OwnedRooms() {
    const dispatch = useDispatch();
    const rooms = useSelector(state => state.rooms && state.rooms.userRooms)
    useEffect(() => {
          dispatch(getUserRoomsThunk());
    }, dispatch)

    return rooms && (rooms.length > 0 && (
        <div className={styles.mainContainer}>
            {Object.values(rooms).map((room) => {
                return <UserRoom room={room} />
            })}         
        </div>
    )) || (
        <div className={styles.mainContainer}>
            No Rooms
        </div>
    )
}
