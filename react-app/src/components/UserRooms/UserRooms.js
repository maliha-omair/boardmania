import styles from "../UserRooms/UserRooms.module.css"
import JoinedRooms from "./JoinedRooms";
import OwnedRooms from "./OwnedRooms";
import UserRoom from "./UserRoom";

export default function UserRooms() {

    return (
        <div className={styles.userRoomsMainDiv}>
            <div className={styles.yourRooms}>
                <h1>Your Rooms</h1>
                <OwnedRooms />
            </div>
            <div className={styles.yourMembership}>
                <h1>Your Memberships</h1>
                <JoinedRooms />
            </div>
        </div>
    )
}
