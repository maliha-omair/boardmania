import { PawnCoordinate } from "../types";

const SET_PUBLIC_ROOMS = "rooms/SET_PUBLIC_ROOMS";
const CREATE_ROOM = "rooms/CREATE_ROOM";
const REMOVE_ROOM = "rooms/REMOVE_ROOM";
const UPDATE_ROOM = "rooms/UPDATE_ROOM";
const SET_USER_ROOMS = "rooms/USER_ROOM";
const SET_CURRENT_ROOM = "rooms/CURRENT_ROOM";
const SET_ROOM_MEMBERS = "rooms/ROOM_MEMBERS";
const SET_ROOM_GAMES = "rooms/ROOM_GAMES";
const SET_CURRENT_GAME = "rooms/SET_CURRENT_GAME";
const SETUP_GAME_BOARD = "rooms/SETUP_GAME_BOARD";
const UPDATE_BOARD = "rooms/UPDATE_BOARD"

const initialGameBoard = [
    ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", "", "", "R", "R", "", ""],
    ["", "", "", "", "", "", "", "", "", "", "", "R", "R", "", ""],
    ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],

    ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["", "", "Y", "Y", "", "", "", "", "", "", "", "", "", "", ""],
    ["", "", "Y", "Y", "", "", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
]

const initialDemoGameBoard = [
    ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", "", "", "R", "R", "", ""],
    ["", "", "", "", "", "", "", "", "", "", "", "R", "R", "", ""],
    ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "YYY", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "Y", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
]



const setPublicRooms = (rooms) => ({
    type: SET_PUBLIC_ROOMS,
    payload: rooms
});

const setCurrentRoom = (room) => ({
    type: SET_CURRENT_ROOM,
    payload: room
})


const setUserRooms = (rooms) => ({
    type: SET_USER_ROOMS,
    payload: rooms
});

const updateRoom = (room) => ({
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

const setCurrentRoomMembers = (id) => ({
    type: SET_ROOM_MEMBERS,
    payload: id
})

const setCurrentRoomGames = (games) => ({
    type: SET_ROOM_GAMES,
    payload: games
})

const setCurrentGame = (game) => ({
    type: SET_CURRENT_GAME,
    payload: game
})

const setupGameBoard = (game) => ({
    type: SETUP_GAME_BOARD,
    payload: game

})


//Game logic
export const updateBoard = (move) => ({
    type: UPDATE_BOARD,
    payload: move
})

export const getPublicRoomsThunk = () => async dispatch => {
    const res = await fetch("/api/rooms");
    if (res.ok) {
        const result = await res.json();
        dispatch(setPublicRooms(result.rooms))
        return result
    }
}

export const getUserRoomsThunk = () => async dispatch => {
    const res = await fetch("/api/rooms/userRooms");
    if (res.ok) {
        const result = await res.json();
        dispatch(setUserRooms(result.rooms))
        return result
    }
}

export const getRoomByIdThunk = (id) => async dispatch => {
    const res = await fetch(`/api/rooms/${id}`);
    console.log("sign room details = ", res)
    if (res.ok) {
        const result = await res.json();
        dispatch(setCurrentRoom(result))
        return result
    }
}

export const getRoomMembersByIdThunk = (id) => async dispatch => {
    const res = await fetch(`/api/rooms/${id}/members`);
    console.log("sign room details = ", res)
    if (res.ok) {
        const result = await res.json();
        dispatch(setCurrentRoomMembers(result))
        return result
    }
}



export const createNewRoomThunk = (room) => async dispatch => {
    const { title, description, isPublic } = room;
    console.log("room value is ", room);
    const res = await fetch("/api/rooms", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            title,
            description,
            isPublic,
        }),
    })
    if (res.ok) {
        const data = await res.json();
        dispatch(setNewRoom(data))
        return res;
    } else {
        throw res;
    }
}

export const editRoomThunk = (id, room) => async dispatch => {
    const { title, description, isPublic } = room;
    const response = await fetch(`/api/rooms/${id}`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            title,
            description,
            isPublic,
        }),
    })
    if (response.ok) {
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
    const res = await fetch(`/api/members/${id}/approve`, {
        method: "PUT"
    });
    if (res.ok) {
        const result = await res.json();
        return result
    }
}

export const rejectMembershipThunk = (id) => async dispatch => {
    const res = await fetch(`/api/members/${id}/reject`, {
        method: "DELETE"
    });
    if (res.ok) {
        const result = await res.json();
        return result
    }
}

export const getGamesByRoomID = (id) => async dispatch => {
    const res = await fetch(`/api/rooms/${id}/games`);
    if (res.ok) {
        const result = await res.json();
        dispatch(setCurrentRoomGames(result))
        return result
    }
}

export const createGameThunk = (gameId, name) => async dispatch => {
    const res = await fetch(`/api/rooms/${gameId}/games`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name,
        }),
    });

    if (res.ok) {
        const result = await res.json();
        dispatch(setCurrentGame(result));
        return result
    } else {
        throw res;
    }
}

export const getGameThunk = (gameId) => async dispatch => {
    const res = await fetch(`/api/games/${gameId}`, {
        method: "GET"
    });

    if (res.ok) {
        const result = await res.json();
        dispatch(setCurrentGame(result))
        dispatch(setupGameBoard(result))
        result.moves.forEach(m => {
            if(m.payload.payload.action === "INIT"){
                dispatch(setupGameBoard())
            }else{
                if(m.payload.payload.action === "MOVE" ||m.payload.payload.action === "GAME_END" ){
                    dispatch(updateBoard(m.payload.payload));
                }
                
            }
        });
        return result
    }
}

export const joinGameThunk = (id) => async dispatch => {
    const res = await fetch(`/api/games/${id}/join`, {
        method: "POST"
    });

    if (res.ok) {
        const result = await res.json();
        dispatch(setCurrentGame(result))
        dispatch(setupGameBoard(result))
        return result
    }
}

export const deleteGameThunk = (id) => async dispatch => {
    const res = await fetch(`/api/games/${id}`, {
        method: "DELETE"
    });

    if (res.ok) {
        const result = await res.json();
        dispatch(setCurrentGame(null))
        return result
    }
}

export const editGameThunk = (gameId, name) => async dispatch => {
    const res = await fetch(`/api/games/${gameId}`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name,
        }),
    });
    if (res.ok) {
        const result = await res.json();
        return result
    } else {
        throw res;
    }
}


const initialState = {gameStatus:{state : "NEW"}};
export default function roomsReducer(state = initialState, action) {
    let newState = { ...state };
    switch (action.type) {
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
            if (newState.publicRooms) {
                let publicRooms = newState.publicRooms.filter(i => i.id !== action.payload);
                return { ...state, publicRooms }
            }
            return { ...state }
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
        case SETUP_GAME_BOARD:
            newState.board = cloneBoard(initialGameBoard);
            return newState;
        case UPDATE_BOARD:
            newState.board = cloneBoard(executeMove(state.board,action.payload));
            if(action.payload.action === "GAME_END"){
                newState.gameStatus = {state : "GAME_END", winner : action.payload.payload.player};
            }else{
                newState.gameStatus = {state : "IN_PROGRESS", winner : null};
            }
            return newState;
        default:
            return state;
    }
}




function removePawn(string, char) {
    let strArr = [...string];
    strArr.splice(string.lastIndexOf(char), 1);
    return strArr.join("");
}

function addPawn(string, char) {
    return string+char;
}


function cloneBoard(board){
    return[
        [...board[0]],
        [...board[1]],
        [...board[2]],
        [...board[3]],
        [...board[4]],
        [...board[5]],
        [...board[6]],
        [...board[7]],
        [...board[8]],
        [...board[9]],
        [...board[10]],
        [...board[11]],
        [...board[12]],
        [...board[13]],
        [...board[14]],
    ]
}


function movePawn(from, to, color, board) {
    if (board[from.x][from.y].includes(color)) {
        board[from.x][from.y] = removePawn(board[from.x][from.y],color);
        board[to.x][to.y] = addPawn(board[to.x][to.y],color);
        return board;
    }
    return board;
}

function executeMove(board, move) {
    if (!move) return board;
    if (move.action === "INIT") return initialGameBoard;
    if (move.action === "INIT_DEMO") return initialDemoGameBoard;
    if (move.action === "ROLL_DICE" || move.action === "CHANGE_TURN" || move.action === "GAME_END") {
        return board;
    }
    if (move.action === "BASE_TO_START") {
        if (move.p === 1) {
            if (board[11][2] === "Y") {
                return movePawn(new PawnCoordinate(11, 2), new PawnCoordinate(13, 6), "Y", board)

            }
            else if (board[11][3] === "Y") {
                return movePawn(new PawnCoordinate(11, 3), new PawnCoordinate(13, 6), "Y", board)
            }
            else if (board[12][2] === "Y") {
                return movePawn(new PawnCoordinate(12, 2), new PawnCoordinate(13, 6), "Y", board)

            }
            else if (board[12][3] === "Y") {
                return movePawn(new PawnCoordinate(12, 3), new PawnCoordinate(13, 6), "Y", board)
            }
            else {
                return board;
            }
        }
        if (move.p === 2) {
            if (board[2][11] === "R") {
                return movePawn(new PawnCoordinate(2, 11), new PawnCoordinate(1, 8), "R", board)
            }
            else if (board[2][12] === "R") {
                return movePawn(new PawnCoordinate(2, 12), new PawnCoordinate(1, 8), "R", board)
            }
            else if (board[3][11] === "R") {
                return movePawn(new PawnCoordinate(3, 11), new PawnCoordinate(1, 8), "R", board)

            }
            else if (board[3][12] === "R") {
                return movePawn(new PawnCoordinate(3, 12), new PawnCoordinate(1, 8), "R", board)
            }
            else {
                return board;
            }
        }
    }

    if (move.action === "MOVE") {
        const fromC = new PawnCoordinate(move.payload.from.x, move.payload.from.y);
        const toC = new PawnCoordinate(move.payload.to.x, move.payload.to.y);
        if (move.payload.playerColor === "R" 
            || move.payload.playerColor === "Y"
            || move.payload.playerColor === "G"
            || move.payload.playerColor === "B" ) {
            return movePawn(fromC, toC, move.payload.playerColor, board)
        }
        else {
            return board;
        }
    }



}