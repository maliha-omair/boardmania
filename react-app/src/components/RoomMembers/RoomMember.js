
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux"
import { approveMembershipThunk, getRoomMembersByIdThunk, rejectMembershipThunk } from "../../store/rooms";

import styles from "../RoomMembers/RoomMember.module.css"
export default function RoomMember({member}){
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)

    function handleApprove(){
        dispatch(approveMembershipThunk(member.id)).then(()=>dispatch(getRoomMembersByIdThunk(member.room.id)));
    }


    function handleReject(){
        dispatch(rejectMembershipThunk(member.id)).then(()=>dispatch(getRoomMembersByIdThunk(member.room.id)));
    }

    return user && (
        <div className={styles.mainDiv}>
            {member.user.email} - {member.status}
            {member.status === "pending" && member.room.owner_id === user.id && <div><div onClick={handleApprove}>Approve</div><div onClick={handleReject}>Reject</div></div> }
        </div>
    )
}