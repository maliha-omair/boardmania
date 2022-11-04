import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import board from "../../assets/ludoBoard.png"
import { getGameThunk } from "../../store/rooms"
import styles from "../GameBoard/GameBoard.module.css"
import LudoBoard from "../LudoBoard/LudoBoard"

export default function GameBoard() {
    const dispatch = useDispatch();

    const game = useSelector(state => state.rooms && state.rooms.currentGame);
    
    const {gameId, roomId} = useParams()

    useEffect(()=>{
        if(!game){
            dispatch(getGameThunk(gameId));
        }
    },[dispatch,game,gameId])
    return (   
        <div className={styles.mainContainer}>
        <div className={styles.player1}>Player 1 </div>
            <div className={styles.boardDiv}>
                <LudoBoard />
            </div>
            <div className={styles.player2}>Player 2 </div>
        </div>
        
    )
}