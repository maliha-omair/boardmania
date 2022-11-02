import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getGamesByRoomID } from "../../store/rooms";
import Game from "./Game";
import styles from "../Games/Games.module.css"

export default function Games({ roomId }) {
    const dispatch = useDispatch();
    const games = useSelector(state => state.rooms.games)

    useEffect(() => {
        dispatch(getGamesByRoomID(roomId));
    }, [dispatch])
    return games && (games.length > 0 && (
        <div className={styles.gameContainer}>
           
            {Object.values(games).map((game) => {
                return (
                    <div className={styles.games}><Game game={game} /></div>
                )
                
            })}
        </div>
    ))
        || (
            <div className={styles.noRoom}>
                No Games available
            </div>
        )
}



