const SET_PUBLIC_ROOMS = "rooms/SET_PUBLIC_ROOMS";
const CREATE_ROOM = "rooms/CREATE_ROOM";
const REMOVE_ROOM = "rooms/REMOVE_ROOM";

const setPublicRooms = (rooms) => ({
    type: SET_PUBLIC_ROOMS,
    payload: rooms
});

const setNewRoom = (room) => ({
    type: CREATE_ROOM,
    payload: room
});

const removeRoom = (id) => ({
    type: REMOVE_ROOM,
    payload: id
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

export const deleteRoomThunk = (id) => async dispatch => {
    const response = await fetch(`/api/rooms/${id}`, {
        method: "DELETE"
      });
      if (response.ok) {
        const data = await response.json();
        if (data.errors) {
          return data.errors;
        }
        dispatch(removeRoom(id));
        return response
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
        case REMOVE_ROOM:
            let publicRooms = newState.publicRooms.filter(i => i.id !== action.payload);
            return { ...state, publicRooms }
        default:
            return state;
    }
}