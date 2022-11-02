const SET_PUBLIC_ROOMS = "rooms/SET_PUBLIC_ROOMS";
const CREATE_ROOM = "rooms/CREATE_ROOM";
const REMOVE_ROOM = "rooms/REMOVE_ROOM";
const UPDATE_ROOM = "rooms/UPDATE_ROOM";
const SET_USER_ROOMS = "rooms/USER_ROOM";
const SET_CURRENT_ROOM = "rooms/CURRENT_ROOM";
const SET_ROOM_MEMBERS = "rooms/ROOM_MEMBERS"
const SET_ROOM_GAMES = "rooms/ROOM_GAMES"
const SET_CURRENT_GAME = "rooms/SET_CURRENT_GAME"



const setPublicRooms = (rooms) => ({
    type: SET_PUBLIC_ROOMS,
    payload: rooms
});

const setCurrentRoom = (room) =>({
    type: SET_CURRENT_ROOM,
    payload: room
})


const setUserRooms= (rooms) =>({
    type: SET_USER_ROOMS,
    payload: rooms
});

const updateRoom = (room)=>({
    type: UPDATE_ROOM,
    room
})
const setNewRoom = (room) => ({
    type: CREATE_ROOM,
    payload: room
});

const removeRoom = (id) => ({
    type: REMOVE_ROOM,
    payload: id
});

const setCurrentRoomMembers = (id) =>({
    type: SET_ROOM_MEMBERS,
    payload: id
})

const setCurrentRoomGames = (games) =>({
    type: SET_ROOM_GAMES,
    payload: games
})

const setCurrentGame = (game) => ({
    type: SET_CURRENT_GAME,
    payload: game
})

export const getPublicRoomsThunk = () => async dispatch => {
    const res = await fetch("/api/rooms");
    if (res.ok){
        const result = await res.json();
        dispatch(setPublicRooms(result.rooms))
        return result
    } 
}

export const getUserRoomsThunk = () => async dispatch => {
    const res = await fetch("/api/rooms/userRooms");
    if (res.ok){
        const result = await res.json();
        dispatch(setUserRooms(result.rooms))
        return result
    } 
}

export const getRoomByIdThunk = (id) => async dispatch => {
    const res = await fetch(`/api/rooms/${id}`);
    console.log("sign room details = " ,res)
    if (res.ok){
        const result = await res.json();
        dispatch(setCurrentRoom(result))
        return result
    } 
}

export const getRoomMembersByIdThunk = (id) => async dispatch => {
    const res = await fetch(`/api/rooms/${id}/members`);
    console.log("sign room details = " ,res)
    if (res.ok){
        const result = await res.json();
        dispatch(setCurrentRoomMembers(result))
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

export const editRoomThunk = (id,room) => async dispatch => {
    const {title,description,isPublic} = room;
    const response = await fetch(`/api/rooms/${id}`,{
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body:JSON.stringify({
            title,
            description,
            isPublic,
          }),
    })
    if(response.ok){
        const data = await response.json();
        dispatch(updateRoom(data));
        return response;
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
        return response
      }
}

export const joinRoomThunk = (roomId) => async dispatch => {
    const response = await fetch(`/api/rooms/${roomId}/members`, {
        method: "POST"
      });
      if (response.ok) {
        const data = await response.json();
        if (data.errors) {
          return data.errors;
        }
        return response
      }
}


export const approveMembershipThunk = (id) => async dispatch => {
    const res = await fetch(`/api/members/${id}/approve`,{
        method: "PUT"
    });
    if (res.ok){
        const result = await res.json();
        return result
    } 
}

export const rejectMembershipThunk = (id) => async dispatch => {
    const res = await fetch(`/api/members/${id}/reject`,{
        method: "PUT"
    });
    if (res.ok){
        const result = await res.json();
        return result
    } 
}

export const getGamesByRoomID = (id) => async dispatch =>{
    const res = await fetch(`/api/rooms/${id}/games`);
    if (res.ok){
        const result = await res.json();
        dispatch(setCurrentRoomGames(result))
        return result
    } 
}

export const createGameThunk = (gameId,name) => async dispatch =>{
    const res = await fetch(`/api/rooms/${gameId}/games`,{
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body:JSON.stringify({
            name,
        }),
    });

    if (res.ok){
        const result = await res.json();
        dispatch(setCurrentGame(result))
        return result
    }else{
        throw res;
    } 
}

export const getGameThunk = (gameId) => async dispatch =>{
    const res = await fetch(`/api/rooms/${gameId}`,{
        method: "GET"
    });

    if (res.ok){
        const result = await res.json();
        dispatch(setCurrentGame(result))
        return result
    } 
}

export const joinGameThunk = (id) => async dispatch =>{
    const res = await fetch(`/api/games/${id}/join`,{
        method: "POST"
    });

    if (res.ok){
        const result = await res.json();
        dispatch(setCurrentGame(result))
        return result
    } 
}

export const deleteGameThunk = (id) => async dispatch =>{
    const res = await fetch(`/api/games/${id}`,{
        method: "DELETE"
    });

    if (res.ok){
        const result = await res.json();
        dispatch(setCurrentGame(null))
        return result
    } 
}

const initialState = null;
export default function roomsReducer(state = initialState, action) {
    let newState = {...state};
    switch (action.type){
        case SET_PUBLIC_ROOMS: 
            newState.publicRooms = action.payload;
            return newState;
        case SET_USER_ROOMS: 
            newState.userRooms = action.payload;
            return newState;
        case CREATE_ROOM:
              newState.currentRoom = action.payload;
              return newState;
        case REMOVE_ROOM:
            if(newState.publicRooms){
                let publicRooms = newState.publicRooms.filter(i => i.id !== action.payload);
                return { ...state, publicRooms }
            }
            return {...state}
        case UPDATE_ROOM:
            newState[action.room.id] = action.room;
            return newState;
        case SET_CURRENT_ROOM:
            newState.currentRoom = action.payload;      
            return newState;
        case SET_ROOM_MEMBERS:
            newState.currentRoomMembers = action.payload.members;
            return newState;
        case SET_ROOM_GAMES:
            newState.games = action.payload.games;
            return newState;
        case SET_CURRENT_GAME:
            newState.currentGame = action.payload;
            return newState;
        default:
            return state;
    }
}