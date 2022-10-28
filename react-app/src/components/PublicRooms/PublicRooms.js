import { useEffect } from "react"
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux"
import { getPublicRoomsThunk } from "../../store/rooms";
import styles from "../PublicRooms/PublicRooms.module.css"
import PublicRoom from "./PublicRoom";

export default function PublicRooms() {
    const dispatch = useDispatch();
    const rooms = useSelector(state => state.rooms && state.rooms.publicRooms)
    useEffect(() => {
        dispatch(getPublicRoomsThunk())
    }, dispatch)

    return rooms && (
        <div className={styles.mainContainer}>
            <h1>Public Rooms</h1>
            {Object.values(rooms).map((room) => {
                return <PublicRoom room={room} />
            })}
        </div>
    )
}
