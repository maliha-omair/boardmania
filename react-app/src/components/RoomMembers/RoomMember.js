
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux"
import { approveMembershipThunk, getRoomMembersByIdThunk, rejectMembershipThunk } from "../../store/rooms";

import styles from "../RoomMembers/RoomMember.module.css"
export default function RoomMember({ member }) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    console.log("if it is true", member.room.owner_id === user.id)
    function handleApprove() {
        dispatch(approveMembershipThunk(member.id)).then(() => dispatch(getRoomMembersByIdThunk(member.room.id)));
    }


    function handleReject() {
        dispatch(rejectMembershipThunk(member.id)).then(() => dispatch(getRoomMembersByIdThunk(member.room.id)));
    }

    

    return user && (
        <div className={styles.mainDiv}>
            <div className={styles.emailDiv}>
                {member.user.email} - {member.status}
            </div>
            {member.status === "pending" && member.room.owner_id === user.id && (
                <div className={styles.innerDiv}>
                    <div className={styles.approve} onClick={handleApprove}><i class="fa-solid fa-check"></i></div>
                    <div className={styles.reject} onClick={handleReject}><i class="fa-solid fa-xmark"></i></div>
                </div>
            ) }
             {member.status === "member" && member.room.owner_id === user.id &&  member.user.id !== user.id &&   (
                <div className={styles.innerDiv}>
                   <div className={styles.reject} onClick={handleReject}><i class="fa-solid fa-trash"></i></div>
                </div>
            ) }
        </div>
    )
}