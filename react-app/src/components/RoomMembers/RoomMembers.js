import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getRoomMembersByIdThunk } from "../../store/rooms";
import RoomMember from "./RoomMember";

export default function RoomMembers({roomId}){

    const roomMembers = useSelector(state => state.rooms.currentRoomMembers);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getRoomMembersByIdThunk(roomId));
    }, [dispatch, roomId]);

    if (!roomMembers) return null;

    return roomMembers && (
        <div>
            {Object.values(roomMembers).map(r => {
                return <RoomMember member={r}/>
            })}
        </div>
    )
}