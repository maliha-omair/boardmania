import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getRoomByIdThunk } from "../../store/rooms";
import RoomMembers from "../RoomMembers/RoomMembers";
import styles from "../SingleRoom/SingleRoom.module.css"

export default function SingleRoom() {
    const dispatch = useDispatch();
    const room = useSelector(state => state.rooms && state.rooms.currentRoom);
    const { roomId } = useParams();
    useEffect(() => {
        dispatch(getRoomByIdThunk(roomId))
    }, [dispatch, roomId]);

    if (!room) return null;

    return room && (
        <div className={styles.mainDiv}>
            <div>
                <div className={styles.title}>
                    <h1>
                        {room.title}
                    </h1>

                </div>
                <div className={styles.description}>
                    <h3>
                    {room.description}
                    </h3>
                </div>
            </div>
            <div className={styles.roomMembers}>
                <RoomMembers roomId={roomId}/>
            </div>
        </div>
    )
}