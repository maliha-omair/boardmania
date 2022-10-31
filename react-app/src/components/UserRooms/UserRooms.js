import { useEffect } from "react"
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux"
import { getUserRoomsThunk } from "../../store/rooms";
import { getUserMemberships } from "../../store/session";
import styles from "../UserRooms/UserRooms.module.css"
import JoinedRooms from "./JoinedRooms";
import OwnedRooms from "./OwnedRooms";
import UserRoom from "./UserRoom";

export default function UserRooms() {

    return (
        <div className={styles.userRoomsMainDiv}>
            <div>
                <h1>Your Rooms</h1>
                <OwnedRooms />
            </div>
            <div>
                <h1>Your Memberships</h1>
                <JoinedRooms />
            </div>
        </div>
    )
}
