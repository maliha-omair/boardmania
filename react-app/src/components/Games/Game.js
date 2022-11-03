import { useEffect } from "react";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom";
import { deleteGameThunk, editGameThunk, getGamesByRoomID, joinGameThunk } from "../../store/rooms";
import styles from "../Games/Games.module.css"
export default function Game({ game }) {
    const user = useSelector(state => state.session.user)
    const members = useSelector(state => state.rooms.currentRoomMembers)

    const [showJoinButton, setShowJoinButton] = useState(false)
    const history = useHistory()

    // const showDeleteButton = game.players.at(-1).member.user.id === user.id
    // const showEditButton = game.players.at(-1).member.user.id === user.id

    const [showEditButton, setShowEditButton] = useState(false)
    const[showDeleteButton,setShowDeleteButton] = useState(false)
    const [error, setError] = useState([])
    const [editMode, setEditMode] = useState(false);
    const [gameName, setGameName] = useState(game.name);
    const nameFieldRef = useRef(null);

    useEffect(() => {
        let isMember = false;
        let alreadyPlayer = false;
        let gameFull = false;
        if (game) {
            alreadyPlayer = game.players.filter(g => g.member.user.id === user.id).length === 1;
            gameFull = game.players.length >= 2          
        }
        if (members && user) {
            isMember = members.filter(m => m.user.id === user.id && m.status === "member").length > 0
        }
        const isGameCreater = game.players.at(-1).member.user.id === user.id;
        if(isGameCreater && isMember){
            setShowEditButton(true)
            setShowDeleteButton(true)
            setEditMode(true)
        } 
        else{
            setShowEditButton(false)
            setShowDeleteButton(false)
            setEditMode(false)
        } 
        
        if (isMember && !gameFull && !alreadyPlayer) {
            
            setShowJoinButton(true)
        }
    }, [members, game, user])

    const dispatch = useDispatch()
    function handleJoin() {
        console.log(game.room_id)
        dispatch(joinGameThunk(game.id)).then((res) => {
            history.push(`/rooms/${game.room_id}/games/${game.id}`)
        }).catch(async res => {
            if (res.status && res.status === 400) {
                const body = await res.json();
                setError(body.errors);
            }
        });
    }
    function handleDelete() {
        dispatch(deleteGameThunk(game.id)).then((res) => {
            dispatch(getGamesByRoomID(game.room_id))
        })
    }
    function handleEdit() {
        setError([]);
        if (gameName !== game.name) {
            dispatch(editGameThunk(game.id, gameName))
                .then(() => dispatch(getGamesByRoomID(game.room_id)))
                .catch(async res => {
                    if (res.status && res.status === 400) {
                        const body = await res.json();
                        setError(body.errors);
                    }
                });
        }
        setEditMode(false);
    }

    function handleKeyPress(e) {
        if (e.keyCode === 13) {
            e.target.blur();
        }
    }

    function handleClick(e) {
        if (showEditButton) {
            setEditMode(true);
        }

    }


    return game && (
        <div className={styles.mainContainer}>
            <div className={styles.innerDiv}>
                <div className={styles.errorMessage}>
                    {error.length > 0 && (error)}
                </div>

                <div className={styles.gameName}>
                    {editMode ? <input maxLength={15} autoFocus ref={nameFieldRef} type="text" value={gameName} onKeyDown={(e) => handleKeyPress(e)} onChange={(e) => setGameName(e.target.value)} onBlur={handleEdit} /> : <span onDoubleClick={handleClick}>{game.name}</span>}
                </div>
                <div className={styles.gameMode}>
                    {game.mode}
                </div>
                <div className={styles.gameStatus}>
                    {game.game_status}
                </div>
                <div className={styles.buttonDiv}>
 
                    {showJoinButton ? <div className={styles.joinButton}
                        onClick={handleJoin} title="join game">
                        <i class="fa-solid fa-user-plus" ></i>
                    </div> : <div className={styles.joinButton} onClick={handleJoin} title="view game"><i class="fa-regular fa-eye"></i></div>}
                </div>

                {showEditButton && <div className={styles.editButton} onClick={() => setEditMode(true)}><i class="fa-solid fa-pen-to-square"></i></div>}
                <div>
                    {showDeleteButton && <div className={styles.deleteButton} onClick={handleDelete} title="delete game"><i class="fa-solid fa-trash"></i></div>}
                </div>
            </div>
        </div>
    )
}