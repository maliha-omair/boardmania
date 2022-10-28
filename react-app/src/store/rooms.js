const SET_PUBLIC_ROOMS = "rooms/SET_PUBLIC_ROOMS";
const CREATE_ROOM = "rooms/CREATE_ROOM";

const setPublicRooms = (rooms) => ({
    type: SET_PUBLIC_ROOMS,
    payload: rooms
});

const setNewRoom = (room) => ({
    type: CREATE_ROOM,
    payload: room
});

export const getPublicRoomsThunk = () => async dispatch => {
    const res = await fetch("/api/rooms");
    if (res.ok){
        const result = await res.json();
        console.log("rooms....",result)
        dispatch(setPublicRooms(result.rooms))
        return result
    } 
}

export const createNewRoomThunk=(room)=> async dispatch => {
    const {title,description,isPublic} = room;
    console.log("room value is ",room);
    const res = await fetch("/api/rooms",{
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body:JSON.stringify({
            title,
            description,
            isPublic,
          }),
    })
    if(res.ok){
        const data = await res.json();
        dispatch(setNewRoom(data))
        return res;
    }
}

const initialState = null;
export default function roomsReducer(state = initialState, action) {
    let newState = {...state};
    switch (action.type){
        case SET_PUBLIC_ROOMS: 
            newState.publicRooms = action.payload;
            return newState;
        case CREATE_ROOM:
              newState.currentRoom = action.payload;
              return newState;
        default:
            return state;
    }
}