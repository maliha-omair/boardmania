import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { createGameThunk, getRoomByIdThunk } from "../../store/rooms";
import Games from "../Games/Games";
import RoomMembers from "../RoomMembers/RoomMembers";
import styles from "../SingleRoom/SingleRoom.module.css"
import CreateGame from "./CreateGame";
import SingleRoomHeader from "./SingleRoomHeader";
import image from "../../assets/ludoBoard.png"

export default function SingleRoom() {
    const dispatch = useDispatch();
    const history = useHistory();
    const room = useSelector(state => state.rooms && state.rooms.currentRoom);
    const { roomId } = useParams();
    useEffect(() => {
        dispatch(getRoomByIdThunk(roomId))
    }, [dispatch, roomId]);

    
    if (!room) return null;

    return room && (
        <div className={styles.mainDiv}>
            <SingleRoomHeader room={room}/>
            <div className={styles.secondRow}>
                <div className={styles.leftDiv}>
                    <div className={styles.roomMembers}>
                        <div className={styles.sectionHeader}> Members</div>
                        <RoomMembers roomId={roomId} />
                    </div>
                </div>
                <div className={styles.rightDiv}>
                    <div >
                    <div className={styles.sectionHeader}>Room Games</div>
                        <CreateGame room={room} />
                        <Games roomId={roomId} />
                    </div>
                </div>
                <div>
                    <img className={styles.image} src={image}></img>
                </div>
            </div>            
       </div>
    )
}