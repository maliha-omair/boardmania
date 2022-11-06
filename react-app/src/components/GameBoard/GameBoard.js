import { useEffect } from "react"
import { useDispatch} from "react-redux"
import { updateBoard } from "../../store/rooms"
import styles from "../GameBoard/GameBoard.module.css"
import LudoBoard from "../LudoBoard/LudoBoard"
import { io } from 'socket.io-client';
import { useState } from "react"
import Die from "./Die"
import { LegalMove, PawnCoordinate } from "../../types"

let socket;
export default function GameBoard({gameId, roomId, game, user, boardState}) {
    const dispatch = useDispatch();


    const [playerTurn, setPlayerTurn] = useState(0);
    const [diceValue, setDiceValue] = useState(0);
    const [currentAction, setCurrentAction] = useState("NONE");
    const [legalMoves, setLegalMoves] = useState([]);
    const [currentPlayerColor, setCurrentPlayerColor] = useState("");

    const [chatMessages, setChatMessages] = useState([]);
    const [chatInput, setChatInput] = useState("");

    const chatRoomId = roomId + "-" + gameId



    function handlePawnClick(x, y){
        alert(`pawn at ${x}, ${y} clicked`);
    }

    function askUserForLegalMove(msg) {

    }

    function findAllPawnPositions(boardState, playerColor){
        const playerColors = ["","Y","R","G","B"]
        const currentPlayer = game.players.find(p => p.member.user.id === user.id);
        const currentPlayerColor = playerColors[currentPlayer.game_position];
        setCurrentPlayerColor(currentPlayerColor);

        let p = [];
        for(let y=0;y<boardState.length;y++){
            for(let x=0;x<boardState.length;x++){
                if(boardState[x][y].includes(currentPlayerColor)){
                    console.log(`Found color ${currentPlayerColor} at [${x},${y}]` );
                    p.push(new PawnCoordinate(x,y));     
                }
            }
        }
        return p;

    }

    function findLegalMovesHelper(boardState, playerColor, allPositions){
        let lm = []
        for(let p in allPositions){
           lm.push(new LegalMove(allPositions[p], new PawnCoordinate(13,6)));
        }
        return lm;
    }

    function findLegalMoves(diceRoll, playerColor){
        const allPositions = findAllPawnPositions(boardState, playerColor);
        const lm = findLegalMovesHelper(boardState, playerColor, allPositions)
        setLegalMoves(lm);
        return lm;

    }


    function sendChat(e) {
        e.preventDefault();
        if (chatInput.trim().length > 0 && chatInput.trim().length < 200) {
            socket.emit("chat", buildMessage({ msg: chatInput }));
            setChatInput("")
        }

    }

    useEffect(() => {
        // create websocket/connect
        socket = io();

        socket.on('connect', function () {
            console.log("Connected to server");
            console.log("joining room:", chatRoomId);
            socket.emit("join", buildMessage({ action: "JOIN" }));
        });


        // listen for chat events
        socket.on("move", (msg) => {
            console.log(JSON.stringify(msg));
            setPlayerTurn(msg.switchTurn);
            if (msg.payload.action === "ROLL_DICE") {
                setDiceValue(msg.payload.payload);
                findLegalMoves(diceValue,currentPlayerColor)
                setCurrentAction("MOVE_PAWN");
                if (msg.user === user.username) {
                    socket.emit("chatControl", buildMessage({ msg: `${msg.user} rolled ${msg.payload.payload}` }));
                }
                askUserForLegalMove(msg);
            } else {
                dispatch(updateBoard(msg.payload));
            }


            console.log("Received: " + msg);

        })


        socket.on("chat", (msg) => {
            // when we recieve a chat, add it into our messages array in state
            console.log("Received: " + msg);

            setChatMessages(messages => [...messages, msg]);
        })

        socket.on("chatControl", (msg) => {
            // when we recieve a chat, add it into our messages array in state
            console.log("Received: " + msg);
            setChatMessages(messages => [...messages, msg])
        })


        // when component unmounts, disconnect
        return (() => {
            socket.disconnect()
        })
    }, []);




    function buildMessage(payload, switchTurn) {
        return { user: user.username, room: chatRoomId, switchTurn: switchTurn, payload: payload };
    }

    function startGame() {
        socket.emit("move", buildMessage({ action: "INIT" }, 1));
    }



    function rollDice(player) {
        let roll = Math.floor(Math.random() * 6) + 1;

        if (roll === 6) {
            // socket.emit("move", buildMessage({ action: "BASE_TO_START", p: player }, playerTurn));
            socket.emit("move", buildMessage({ action: "ROLL_DICE", p: player, payload: roll }, playerTurn));
        } else {
            if (player === 1) {
                socket.emit("move", buildMessage({ action: "ROLL_DICE", p: player, payload: roll }, 2));
            } else if (player === 2) {
                socket.emit("move", buildMessage({ action: "ROLL_DICE", p: player, payload: roll }, 1));
            }
        }
    }

    if (!(boardState && user && game)) return null;


    return boardState && user && game && (
        <div className={styles.mainDiv}>
            <div className={styles.mainContainer}>
                <div className={styles.testSocket}>
                    Test board moves
                    <button onClick={startGame} >Start Game</button>
                    <button onClick={() => rollDice(1)} >Roll 6 (Player 1)</button>
                    <button onClick={() => rollDice(2)} >Roll 6 (Player 2)</button></div>
                <div className={styles.player1}>{playerTurn === 1 ? "*" : ""}Player1
                    {playerTurn === 1 && <div onClick={() => rollDice(1)}> <Die face={diceValue} /></div>}

                    {/* {playerTurn === 1 && <span>rolled {diceValue}</span> } */}
                </div>
                <div className={styles.boardDiv}>
                    <LudoBoard boardState={boardState} currentPlayer={currentPlayerColor} legalMoves={legalMoves} />
                </div>
                <div className={styles.player2}>{playerTurn === 2 ? "*" : ""}Player2
                    {playerTurn === 2 && <div onClick={() => rollDice(2)}> <Die face={diceValue} /></div>}
                    {/* {playerTurn === 2 && <span>rolled {diceValue}</span> } */}
                </div>
                <hr className={styles.divider}></hr>
            </div>

            <div className={styles.rightDiv}>
                <div className={styles.chatDiv}>
                    {chatMessages.map((m, ind) => (
                        <div className={styles.chatMessages} key={ind}>{`${m.user}: ${m.payload.msg}`}</div>
                    ))}
                </div>
                <div id="anchor"></div>

                <div className={styles.sendField}>
                    <form onSubmit={sendChat}>
                        <div>
                            <input
                                className={styles.chatInput}
                                value={chatInput}
                                onChange={(e) => setChatInput(e.target.value)}
                            />
                            <button type="submit" className={styles.sendButton}><i class="fa-solid fa-play"></i></button>
                        </div>
                    </form>
                </div>
            </div>
            
        </div>
    )
}