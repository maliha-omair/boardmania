import { useEffect } from "react"
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux"
import { getPublicRoomsThunk } from "../../store/rooms";
import styles from "../PublicRooms/PublicRooms.module.css"
import PublicRoom from "./PublicRoom";
import { ThreeDots } from "react-loader-spinner";
export default function PublicRooms() {
    const dispatch = useDispatch();
    const rooms = useSelector(state => state.rooms && state.rooms.publicRooms)
    useEffect(() => {
        dispatch(getPublicRoomsThunk())
    }, [dispatch])
 if (!rooms) return (
        // <div className={styles.progressWatch}>
            <ThreeDots
                height="80"
                width="80"
                radius="50"
                color="#DA7F14"
                ariaLabel="three-dots-loading"
                visible={true}
            />
        // </div>
    )
    return rooms && (rooms.length>0 && (
        <div className={styles.mainContainer}>
            {/* <h1>Public Rooms</h1> */}
            {Object.values(rooms).map((room) => {
                return <PublicRoom room={room} />
            })}
        </div>
    ))
        ||(
        <div className={styles.noRoom}>
            No Public Room available
        </div>
        )
}
