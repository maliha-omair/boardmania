import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import board from "../../assets/ludoBoard.png"
import { getGameThunk, updateBoard } from "../../store/rooms"
import styles from "../GameBoard/GameBoard.module.css"
import LudoBoard from "../LudoBoard/LudoBoard"
import { io } from 'socket.io-client';
import { useState } from "react"

let socket;
export default function GameBoard() {
    const dispatch = useDispatch();

    const game = useSelector(state => state.rooms && state.rooms.currentGame);
    const user = useSelector(state => state.session.user)

    const { gameId, roomId } = useParams()
    const [chatMessages, setChatMessages] = useState([]);
    const [chatInput, setChatInput] = useState("");

    function sendChat(e) {
        e.preventDefault();
        socket.emit("chat", { from: user.email, msg: chatInput });
        setChatInput("")
    }


    useEffect(() => {

        // create websocket/connect
        socket = io();

        socket.on('connect', function () {
            console.log("Connected to server");
        });

        // listen for chat events
        socket.on("move", (move) => {
            // when we recieve a chat, add it into our messages array in state
            console.log("Received: " + move);
            dispatch(updateBoard(move));
        })

        socket.on("chat", (msg) => {
            // when we recieve a chat, add it into our messages array in state
            console.log("Received: " + msg);
            setChatMessages(messages => [...messages, msg])
        })

        // when component unmounts, disconnect
        return (() => {
            socket.disconnect()
        })
    }, []);


    useEffect(() => {
        if (!game) {
            dispatch(getGameThunk(gameId));
        }
    }, [dispatch, game, gameId])

    function startGame() {
        socket.emit("move", { action: "INIT" });
    }



    function rollDice(player, roll) {
        if (roll === 6) {
            socket.emit("move", { action: "BASE_TO_START", p: player });
        } else {
            if (player === 1) {
                socket.emit("move", { action: "MOVE", p: player, payload: { from: { x: 13, y: 6 }, to: { x: 11, y: 6 } } });
            } else if (player === 2) {
                socket.emit("move", { action: "MOVE", p: player, payload: { from: { x: 1, y: 8 }, to: { x: 3, y: 8 } } });
            }
        }
    }

    return (
        <div className={styles.mainContainer}>

            <div className={styles.testSocket}>
                Test board moves
                <button onClick={startGame} >Start Game</button>
                <button onClick={() => rollDice(1, 6)} >Roll 6 (Player 1)</button>
                <button onClick={() => rollDice(2, 6)} >Roll 6 (Player 2)</button></div>
            <div className={styles.player1}>Player 1 </div>
            <div className={styles.boardDiv}>
                <LudoBoard />
            </div>
            <div className={styles.player2}>Player 2 </div>
            <form onSubmit={sendChat}>
                <input
                    className={styles.chatInput}
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                />
                <button type="submit" className={styles.sendButton}>Send</button>
                <div>
                {chatMessages.map((m, ind) => (
                    <div className={styles.chatMessages} key={ind}>{`${m.from}: ${m.msg}`}</div>
                ))}
            </div>
            </form>
            
        </div>

    )
}