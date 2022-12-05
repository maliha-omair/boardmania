import { useEffect } from "react"
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom";
import { getUserRoomsThunk } from "../../store/rooms";
import { getUserMemberships } from "../../store/session";
import styles from "../UserRooms/UserRooms.module.css"
import UserRoom from "./UserRoom";
import { Watch } from "react-loader-spinner";

export default function OwnedRooms() {
    const dispatch = useDispatch();
    const history = useHistory();
    const rooms = useSelector(state => state.rooms && state.rooms.userRooms)
    useEffect(() => {
        dispatch(getUserRoomsThunk());
    }, [dispatch])
    function handleClick() {
        history.push("/newRoom")
    }
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
    return rooms && (rooms.length > 0 && (
        <div className={styles.mainContainer}>
            {Object.values(rooms).map((room) => {
                return <UserRoom key={room.id} room={room} />
            })}
        </div>
    )) || (
            <div className={styles.noRooms}>
                You have created no rooms
                &nbsp;<button className={styles.joinButton} onClick={handleClick}> Create</button>
            </div>
        )
}
