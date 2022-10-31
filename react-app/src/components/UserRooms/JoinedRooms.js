import { useEffect } from "react"
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux"
import { getUserMembershipsThunk } from "../../store/session";


import styles from "../UserRooms/UserRooms.module.css"
import JoinedRoom from "./JoinedRoom";
import UserRoom from "./UserRoom";

export default function JoinedRooms() {
    const dispatch = useDispatch();
    const memberships = useSelector(state => state.session.joinedRooms && state.session.joinedRooms.members)


    useEffect(() => { 
       dispatch(getUserMembershipsThunk())
       console.log(memberships,"....memberships")
    }, dispatch)

    return memberships && (memberships.length > 0 && (
        <div className={styles.mainContainer}>
            {Object.values(memberships).map((membership) => {
                return <JoinedRoom room={membership.room} />
            })}         
        </div>
    )) || (
        <div className={styles.mainContainer}>
            No Rooms
        </div>
    )
}
