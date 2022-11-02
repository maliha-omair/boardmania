import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom";
import { deleteGameThunk, getGamesByRoomID, joinGameThunk } from "../../store/rooms";
import styles from "../Games/Games.module.css"
export default function Game({ game }) {
    const user = useSelector(state => state.session.user)
    const history = useHistory()
    const showJoinButton = game.players.filter(g => g.member.user.id === user.id).length === 0;
    const showDeleteButton = game.players.filter(p=> p.member.user.id === user.id).length > 0; 
    const dispatch = useDispatch()
    function handleJoin() {
        console.log(game.room_id)
        dispatch(joinGameThunk(game.id)).then((res) => {
            history.push(`/rooms/${game.room_id}/games/${game.id}`)
        })
    }
    function handleDelete(){
        dispatch(deleteGameThunk(game.id)).then((res) => {
            dispatch(getGamesByRoomID(game.room_id))
        })
    }
    return (
        <div className={styles.mainContainer}>
            <div className={styles.innerDiv}>
                <div className={styles.gameName}>
                    {game.name}
                </div>
                <div className={styles.gameMode}>
                    {game.mode}
                </div>
                <div className={styles.gameStatus}>
                    {game.game_status}
                </div>
                <div className={styles.buttonDiv}>
                    {showJoinButton ? <div className={styles.joinButton} onClick={handleJoin} title="join game"><i class="fa-solid fa-user-plus" ></i></div> : <div className={styles.joinButton} onClick={handleJoin} title="view game"><i class="fa-regular fa-eye"></i></div>}
                </div>
                <div>
                
                    {showDeleteButton && <div className={styles.deleteButton} onClick={handleDelete} title="delete game"><i class="fa-solid fa-trash"></i></div>}
                </div>
            </div>
        </div>
    )
}