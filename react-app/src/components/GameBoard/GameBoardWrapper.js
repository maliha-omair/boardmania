import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getGameThunk, updateBoard } from "../../store/rooms"
import styles from "../GameBoard/GameBoard.module.css"
import LudoBoard from "../LudoBoard/LudoBoard"
import { io } from 'socket.io-client';
import { useState } from "react"
import Die from "./Die"
import { LegalMove, PawnCoordinate } from "../../types"
import GameBoard from "./GameBoard"

let socket;
export default function GameBoardWrapper() {
    const dispatch = useDispatch();

    const game = useSelector(state => state.rooms && state.rooms.currentGame);
    const user = useSelector(state => state.session.user);
    const boardState = useSelector(state => state.rooms &&  state.rooms.board);

    const { gameId, roomId } = useParams()

    useEffect(() => {
        dispatch(getGameThunk(gameId));
    }, [dispatch, gameId])

    if (!(boardState && user && game)) return null;
    
    return boardState && user && game && (
        <GameBoard gameId={gameId} roomId={roomId} game={game} user={user} boardState={boardState}/>
    )
}