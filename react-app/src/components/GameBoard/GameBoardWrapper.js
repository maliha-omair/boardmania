import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getGameThunk, updateBoard } from "../../store/rooms"
import GameBoard from "./GameBoard"

let socket;
export default function GameBoardWrapper() {
    const dispatch = useDispatch();

    const game = useSelector(state => state.rooms && state.rooms.currentGame);
    const user = useSelector(state => state.session.user);
    const boardState = useSelector(state => state.rooms &&  state.rooms.board);
    const currentGameState =  useSelector(state => state.rooms &&  state.rooms.gameStatus);

    const { gameId, roomId } = useParams()

    useEffect(() => {
        dispatch(getGameThunk(gameId));
    }, [dispatch, gameId])

    if (!(boardState && user && game)) return null;
    
    return boardState && user && game && (
        <GameBoard key={"4b7ac114-b699-4902-82b1-022b463e63b0"} gameId={gameId} roomId={roomId} game={game} user={user} boardState={boardState} currentGameState={currentGameState}/>
    )
}