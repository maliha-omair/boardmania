import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { updateBoard } from "../../store/rooms"
import styles from "../GameBoard/GameBoard.module.css"
import LudoBoard from "../LudoBoard/LudoBoard"
import { io } from 'socket.io-client';
import { useState } from "react"
import Die from "./Die"
import { LegalMove, PawnCoordinate } from "../../types"
import move_sound from "../../assets/move_sound.wav"
import dice_roll_sound from "../../assets/roll_dice_audio.mp3"

let socket;
export default function GameBoard({ gameId, roomId, game, user, boardState }) {
    const dispatch = useDispatch();
    const audio = new Audio(move_sound);
    const dice_audio = new Audio(dice_roll_sound);

    const [playerTurn, setPlayerTurn] = useState(0);
    const [diceValue, setDiceValue] = useState(0);
    const [player1DiceValue, setPlayer1DiceValue] = useState(0);
    const [player2DiceValue, setPlayer2DiceValue] = useState(0);
    const [legalMoves, setLegalMoves] = useState([]);
    const [currentPlayerColor, setCurrentPlayerColor] = useState("");
    const [chatMessages, setChatMessages] = useState([]);
    const [chatInput, setChatInput] = useState("");
    const [allowedAction, setAllowedAction] = useState(""); // ROLL_DICE, MOVE_PAWN
    const EnumAllowedActions = {
        ROLL_DICE: "ROLL_DICE",
        MOVE_PAWN: "MOVE_PAWN"
    }

    const chatRoomId = roomId + "-" + gameId


    function handleMoveMessage(msg) {
        console.log(JSON.stringify(msg));
        setPlayerTurn(msg.switchTurn);
        setAllowedAction(EnumAllowedActions.ROLL_DICE);
        setDiceValue("");
        if (msg.payload.action === "INIT") {
            setAllowedAction(EnumAllowedActions.ROLL_DICE)
        }
        if (msg.payload.action === "ROLL_DICE") {
            setAllowedAction(EnumAllowedActions.MOVE_PAWN);
            if (msg.payload.p === 1) {
                setPlayer1DiceValue(msg.payload.payload);
            } else if (msg.payload.p === 2) {
                setPlayer2DiceValue(msg.payload.payload);
            }
            setDiceValue(msg.payload.payload);
            findLegalMoves(msg.payload.payload, currentPlayerColor)
            if (msg.user === user.username) {
                socket.emit("chatControl", buildMessage({ msg: `${msg.user} rolled ${msg.payload.payload}` }));
            }
        } else {
            dispatch(updateBoard(msg.payload));
        }


        console.log("Received: " + msg);
    }

    useEffect(() => {
        if (socket) {
            socket.off('move');
            socket.on("move", handleMoveMessage)
        }
    }, [boardState])


    function onPawnClick(x, y) {
        const selectedMove = legalMoves.find(lm => lm.from.x === x && lm.from.y === y);
        const p = findCurrentPlayer();
        const nextTurn = Number(p.game_position) === 1 ? 2 : 1
        audio.play();
        socket.emit("move", buildMessage({ action: "MOVE", payload: { from: selectedMove.from, to: selectedMove.to, playerColor: currentPlayerColor } }, nextTurn));
    }

    function findCurrentPlayer() {
        return game.players.find(p => p.member.user.id === user.id);
    }

    function findPlayerByGamePosition(game_position) {
        return game.players.find(p => Number(p.game_position) === game_position);
    }

    function findCurrentPlayerColor() {
        const playerColors = ["", "Y", "R", "G", "B"]
        const cp = findCurrentPlayer();
        return playerColors[cp.game_position];
    }

    function findAllPawnPositions(boardState) {
        const cpc = findCurrentPlayerColor();
        setCurrentPlayerColor(cpc);

        let p = [];
        for (let y = 0; y < boardState.length; y++) {
            for (let x = 0; x < boardState.length; x++) {
                if (boardState[x][y].includes(cpc)) {
                    console.log(`Found color ${cpc} at [${x},${y}]`);
                    p.push(new PawnCoordinate(x, y));
                }
            }
        }
        return p;

    }

    function isStartCoordinate(color, pos) {
        if (color === "Y") {
            return (pos.x === 11 && pos.y === 2)
                || (pos.x === 11 && pos.y === 3)
                || (pos.x === 12 && pos.y === 2)
                || (pos.x === 12 && pos.y === 3)
        }
        if (color === "R") {
            return (pos.x === 2 && pos.y === 11)
                || (pos.x === 2 && pos.y === 12)
                || (pos.x === 3 && pos.y === 11)
                || (pos.x === 3 && pos.y === 12)
        }
        if (color === "G") {
            return (pos.x === 2 && pos.y === 2)
                || (pos.x === 2 && pos.y === 3)
                || (pos.x === 3 && pos.y === 2)
                || (pos.x === 3 && pos.y === 3)
        }
        if (color === "B") {
            return (pos.x === 11 && pos.y === 11)
                || (pos.x === 11 && pos.y === 12)
                || (pos.x === 12 && pos.y === 11)
                || (pos.x === 12 && pos.y === 12)
        }
        return false;
    }

    function findLegalMovesHelper(boardState, allPositions, diceRoll) {
        let lm = []
        const cpc = findCurrentPlayerColor();
        for (let p in allPositions) {
            let curPos = allPositions[p];
            if (cpc === "Y") {
                if (isStartCoordinate("Y", curPos)) {
                    lm.push(new LegalMove(curPos, new PawnCoordinate(13, 6)));
                } else {
                    const curPosIndex = yellowPath.findIndex(yp => yp.x === curPos.x && yp.y === curPos.y);
                    const nextPos = yellowPath[curPosIndex + diceRoll];
                    lm.push(new LegalMove(curPos, new PawnCoordinate(nextPos.x, nextPos.y)))
                }
            }
            else if (cpc === "R") {
                if (isStartCoordinate("R", allPositions[p])) {
                    lm.push(new LegalMove(allPositions[p], new PawnCoordinate(1, 8)));
                } else {
                    const curPosIndex = redPath.findIndex(rp => rp.x === curPos.x && rp.y === curPos.y);
                    const nextPos = redPath[curPosIndex + diceRoll];
                    lm.push(new LegalMove(curPos, new PawnCoordinate(nextPos.x, nextPos.y)))

                }
            }
            else if (cpc === "G") {
                if (isStartCoordinate("G", allPositions[p])) {
                    lm.push(new LegalMove(allPositions[p], new PawnCoordinate(6, 1)));
                } else {
                    const curPosIndex = greenPath.findIndex(rp => rp.x === curPos.x && rp.y === curPos.y);
                    const nextPos = greenPath[curPosIndex + diceRoll];
                    lm.push(new LegalMove(curPos, nextPos))

                }
            }
            else if (cpc === "B") {
                if (isStartCoordinate("B", allPositions[p])) {
                    lm.push(new LegalMove(allPositions[p], new PawnCoordinate(8, 13)));
                } else {
                    const curPosIndex = bluePath.findIndex(rp => rp.x === curPos.x && rp.y === curPos.y);
                    const nextPos = bluePath[curPosIndex + diceRoll];
                    lm.push(new LegalMove(curPos, nextPos))

                }
            }

        }
        return lm;
    }

    function findLegalMoves(diceRoll) {
        const allPositions = findAllPawnPositions(boardState);
        const lm = findLegalMovesHelper(boardState, allPositions, diceRoll)
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
        socket = io();

        socket.on('connect', function () {
            console.log("Connected to server");
            console.log("joining room:", chatRoomId);
            socket.emit("join", buildMessage({ action: "JOIN" }));
        });

        socket.on("move", handleMoveMessage)



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
        dice_audio.play()
        socket.emit("move", buildMessage({ action: "ROLL_DICE", p: player, payload: roll }, playerTurn));
    }

    if (!(boardState && user && game)) return null;


    return boardState && user && game && (
        <div className={styles.mainDiv}>
            <div className={styles.mainContainer}>
                <div className={styles.player1}>{playerTurn === 1 ? "*" : ""}{findPlayerByGamePosition(1).member.user.username}
                    <Die face={player1DiceValue} />
                    {playerTurn === 1 &&
                        <div>
                            {allowedAction === "ROLL_DICE" && findPlayerByGamePosition(playerTurn).member.user.username === user.username && <div className={styles.handPointer} onClick={() => rollDice(1)} ><i class="fa-solid fa-hand-point-up fa-2xl fa-bounce"></i></div>}
                        </div>
                    }

                </div>
                <div className={styles.boardDiv}>
                    <div className={styles.moveDescription}>
                        {playerTurn === 0
                            && (<button onClick={startGame} >Start Game</button>)
                            || <div className={styles.playerInfo}>Player {playerTurn} - {findPlayerByGamePosition(playerTurn).member.user.username}  </div>
                        }
                    </div>
                    <LudoBoard boardState={boardState} currentPlayerColor={currentPlayerColor} legalMoves={legalMoves} isMyTurn={playerTurn === Number(findCurrentPlayer().game_position)} onPawnClick={onPawnClick} />
                </div>
                <div className={styles.player2}>{playerTurn === 2 ? "*" : ""}{findPlayerByGamePosition(2).member.user.username}
                    <Die face={player2DiceValue} />
                    {playerTurn === 2 &&
                        <div>
                            {allowedAction === "ROLL_DICE" && findPlayerByGamePosition(playerTurn).member.user.username === user.username && <div className={styles.handPointer} onClick={() => rollDice(2)} ><i class="fa-solid fa-hand-point-up fa-2xl fa-bounce"></i></div>}
                        </div>
                    }

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


const greenPath = [
    { x: 6, y: 1 },
    { x: 6, y: 2 },
    { x: 6, y: 3 },
    { x: 6, y: 4 },
    { x: 6, y: 5 },
    { x: 5, y: 6 },
    { x: 4, y: 6 },
    { x: 3, y: 6 },
    { x: 2, y: 6 },
    { x: 1, y: 6 },
    { x: 0, y: 6 },
    { x: 0, y: 7 },
    { x: 0, y: 8 },
    { x: 1, y: 8 },
    { x: 2, y: 8 },
    { x: 3, y: 8 },
    { x: 4, y: 8 },
    { x: 5, y: 8 },
    { x: 6, y: 9 },
    { x: 6, y: 10 },
    { x: 6, y: 11 },
    { x: 6, y: 12 },
    { x: 6, y: 13 },
    { x: 6, y: 14 },
    { x: 7, y: 14 },
    { x: 8, y: 14 },
    { x: 8, y: 13 },
    { x: 8, y: 12 },
    { x: 8, y: 11 },
    { x: 8, y: 10 },
    { x: 8, y: 9 },
    { x: 9, y: 8 },
    { x: 10, y: 8 },
    { x: 11, y: 8 },
    { x: 12, y: 8 },
    { x: 13, y: 8 },
    { x: 14, y: 8 },
    { x: 14, y: 7 },
    { x: 14, y: 6 },
    { x: 13, y: 6 },
    { x: 12, y: 6 },
    { x: 11, y: 6 },
    { x: 10, y: 6 },
    { x: 9, y: 6 },
    { x: 8, y: 5 },
    { x: 8, y: 4 },
    { x: 8, y: 3 },
    { x: 8, y: 2 },
    { x: 8, y: 1 },
    { x: 8, y: 0 },
    { x: 7, y: 0 },
    { x: 7, y: 1 },
    { x: 7, y: 2 },
    { x: 7, y: 3 },
    { x: 7, y: 4 },
    { x: 7, y: 5 },
]


const bluePath = [
    { x: 8, y: 13 },
    { x: 8, y: 12 },
    { x: 8, y: 11 },
    { x: 8, y: 10 },
    { x: 9, y: 8 },
    { x: 10, y: 8 },
    { x: 11, y: 8 },
    { x: 12, y: 8 },
    { x: 13, y: 8 },
    { x: 14, y: 8 },
    { x: 14, y: 7 },
    { x: 14, y: 6 },
    { x: 13, y: 6 },
    { x: 12, y: 6 },
    { x: 11, y: 6 },
    { x: 10, y: 6 },
    { x: 9, y: 6 },
    { x: 8, y: 5 },
    { x: 8, y: 4 },
    { x: 8, y: 3 },
    { x: 8, y: 2 },
    { x: 8, y: 1 },
    { x: 8, y: 0 },
    { x: 7, y: 0 },
    { x: 6, y: 0 },
    { x: 6, y: 1 },
    { x: 6, y: 2 },
    { x: 6, y: 3 },
    { x: 6, y: 4 },
    { x: 6, y: 5 },
    { x: 5, y: 6 },
    { x: 4, y: 6 },
    { x: 3, y: 6 },
    { x: 2, y: 6 },
    { x: 1, y: 6 },
    { x: 0, y: 6 },
    { x: 0, y: 7 },
    { x: 0, y: 8 },
    { x: 1, y: 8 },
    { x: 2, y: 8 },
    { x: 3, y: 8 },
    { x: 4, y: 8 },
    { x: 5, y: 8 },
    { x: 6, y: 9 },
    { x: 6, y: 10 },
    { x: 6, y: 11 },
    { x: 6, y: 12 },
    { x: 6, y: 13 },
    { x: 6, y: 14 },
    { x: 7, y: 14 },
    { x: 7, y: 13 },
    { x: 7, y: 12 },
    { x: 7, y: 11 },
    { x: 7, y: 10 },
    { x: 7, y: 9 },
]

const redPath = [
    { x: 1, y: 8 },
    { x: 2, y: 8 },
    { x: 3, y: 8 },
    { x: 4, y: 8 },
    { x: 5, y: 8 },
    { x: 6, y: 9 },
    { x: 6, y: 10 },
    { x: 6, y: 11 },
    { x: 6, y: 12 },
    { x: 6, y: 13 },
    { x: 6, y: 14 },
    { x: 7, y: 14 },
    { x: 8, y: 14 },
    { x: 8, y: 13 },
    { x: 8, y: 12 },
    { x: 8, y: 11 },
    { x: 8, y: 10 },
    { x: 8, y: 9 },
    { x: 9, y: 8 },
    { x: 10, y: 8 },
    { x: 11, y: 8 },
    { x: 12, y: 8 },
    { x: 13, y: 8 },
    { x: 14, y: 8 },
    { x: 14, y: 7 },
    { x: 14, y: 6 },
    { x: 13, y: 6 },
    { x: 12, y: 6 },
    { x: 11, y: 6 },
    { x: 10, y: 6 },
    { x: 9, y: 6 },
    { x: 8, y: 5 },
    { x: 8, y: 4 },
    { x: 8, y: 3 },
    { x: 8, y: 2 },
    { x: 8, y: 1 },
    { x: 8, y: 0 },
    { x: 7, y: 0 },
    { x: 6, y: 0 },
    { x: 6, y: 1 },
    { x: 6, y: 2 },
    { x: 6, y: 3 },
    { x: 6, y: 4 },
    { x: 6, y: 5 },
    { x: 5, y: 6 },
    { x: 4, y: 6 },
    { x: 3, y: 6 },
    { x: 2, y: 6 },
    { x: 1, y: 6 },
    { x: 0, y: 6 },
    { x: 0, y: 7 },
    { x: 0, y: 8 },
    { x: 1, y: 8 },
    { x: 2, y: 8 },
    { x: 3, y: 8 },
    { x: 4, y: 8 },
    { x: 5, y: 8 },
    { x: 6, y: 9 },
    { x: 6, y: 10 },
    { x: 6, y: 11 },
    { x: 6, y: 12 },
    { x: 6, y: 13 },
    { x: 6, y: 14 },
    { x: 7, y: 14 },
    { x: 7, y: 13 },
    { x: 7, y: 12 },
    { x: 7, y: 11 },
    { x: 7, y: 10 },
    { x: 7, y: 9 },
]

const yellowPath = [
    { x: 13, y: 6 },
    { x: 12, y: 6 },
    { x: 11, y: 6 },
    { x: 10, y: 6 },
    { x: 9, y: 6 },
    { x: 8, y: 5 },
    { x: 8, y: 4 },
    { x: 8, y: 3 },
    { x: 8, y: 2 },
    { x: 8, y: 1 },
    { x: 8, y: 0 },
    { x: 7, y: 0 },
    { x: 6, y: 1 },
    { x: 6, y: 2 },
    { x: 6, y: 3 },
    { x: 6, y: 4 },
    { x: 6, y: 5 },
    { x: 5, y: 6 },
    { x: 4, y: 6 },
    { x: 3, y: 6 },
    { x: 2, y: 6 },
    { x: 1, y: 6 },
    { x: 0, y: 6 },
    { x: 0, y: 7 },
    { x: 0, y: 8 },
    { x: 1, y: 8 },
    { x: 2, y: 8 },
    { x: 3, y: 8 },
    { x: 4, y: 8 },
    { x: 5, y: 8 },
    { x: 6, y: 9 },
    { x: 6, y: 10 },
    { x: 6, y: 11 },
    { x: 6, y: 12 },
    { x: 6, y: 13 },
    { x: 6, y: 14 },
    { x: 7, y: 14 },
    { x: 8, y: 14 },
    { x: 8, y: 13 },
    { x: 8, y: 12 },
    { x: 8, y: 11 },
    { x: 8, y: 10 },
    { x: 8, y: 9 },
    { x: 9, y: 8 },
    { x: 10, y: 8 },
    { x: 11, y: 8 },
    { x: 12, y: 8 },
    { x: 13, y: 8 },
    { x: 14, y: 8 },
    { x: 14, y: 7 },
    { x: 13, y: 7 },
    { x: 12, y: 7 },
    { x: 11, y: 7 },
    { x: 10, y: 7 },
    { x: 9, y: 7 }
]