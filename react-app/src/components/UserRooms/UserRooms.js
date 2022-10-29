import { useEffect } from "react"
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux"
import { getUserRoomsThunk } from "../../store/rooms";
import styles from "../UserRooms/UserRooms.module.css"
import UserRoom from "./UserRoom";

export default function UserRooms() {
    const dispatch = useDispatch();
    const rooms = useSelector(state => state.rooms && state.rooms.userRooms)
    useEffect(() => {
        dispatch(getUserRoomsThunk())
    }, dispatch)

    if (!rooms) return null;
    return rooms && (
        <div className={styles.mainContainer}>
            {/* <h1>Public Rooms</h1> */}
            {Object.values(rooms).map((room) => {
                return <UserRoom room={room} />
            })}
        </div>
    )
}
