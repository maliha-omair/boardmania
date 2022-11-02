import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { createGameThunk, getRoomByIdThunk } from "../../store/rooms";
import Games from "../Games/Games";
import RoomMembers from "../RoomMembers/RoomMembers";
import styles from "../SingleRoom/SingleRoom.module.css"

export default function SingleRoomHeader({room}) {
    if (!room) return null;

    return room && (
        <div className={styles.centerDiv}>
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
    )
}