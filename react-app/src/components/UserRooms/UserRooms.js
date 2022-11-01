import styles from "../UserRooms/UserRooms.module.css"
import JoinedRooms from "./JoinedRooms";
import OwnedRooms from "./OwnedRooms";
import UserRoom from "./UserRoom";

export default function UserRooms() {

    return (
        <div className={styles.userRoomsMainDiv}>
            <div className={styles.yourRooms}>
                <h1 className={styles.roomHeading}>Your Rooms</h1>
                <hr className={styles.divider}></hr>
                <OwnedRooms />
                
            </div>
            <div className={styles.yourMembership}>
                <h1 className={styles.memberShipHeading}>Your Memberships</h1>
                <hr className={styles.divider}></hr>
                <JoinedRooms />
            </div>
        </div>
    )
}
