import { useEffect } from "react"
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux"
import { getPublicRoomsThunk } from "../../store/rooms";
import styles from "../PublicRooms/PublicRooms.module.css"
import PublicRoom from "./PublicRoom";
import { Watch } from "react-loader-spinner";
export default function PublicRooms() {
    const dispatch = useDispatch();
    const rooms = useSelector(state => state.rooms && state.rooms.publicRooms)
    useEffect(() => {
        dispatch(getPublicRoomsThunk())
    }, [dispatch])
    if (!rooms) return (
        <Watch
            height="80"
            width="80"
            radius="48"
            color="#4fa94d"
            ariaLabel="watch-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
        />
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
