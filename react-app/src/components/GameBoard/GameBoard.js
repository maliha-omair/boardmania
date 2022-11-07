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
const audio = new Audio(move_sound);
const dice_audio = new Audio(dice_roll_sound);

export default function GameBoard({ gameId, roomId, game, user, boardState, currentGameState }) {
    const dispatch = useDispatch();

    const [playerTurn, setPlayerTurn] = useState(0);
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

    function EnumAllowedActionsToString(e){
        if(e === EnumAllowedActions.MOVE_PAWN){
            return "move pawn"
        }else if (e === EnumAllowedActions.ROLL_DICE){
            return "roll dice"
        }
        return "--";
        
    }

    const chatRoomId = roomId + "-" + gameId


    function handleMoveMessage(msg) {
        setPlayerTurn(msg.switchTurn);
        setAllowedAction(EnumAllowedActions.ROLL_DICE);
        
        if (msg.payload.action === "INIT") {
            setAllowedAction(EnumAllowedActions.ROLL_DICE)
        }
        if(msg.payload.action === "CHANGE_TURN"){
            console.log("passing turn to next player")
            setAllowedAction(EnumAllowedActions.ROLL_DICE);
        }
        if (msg.payload.action === "ROLL_DICE") {
            setAllowedAction(EnumAllowedActions.MOVE_PAWN);
            if (msg.payload.p === 1) {
                setPlayer1DiceValue(msg.payload.payload);
            } else if (msg.payload.p === 2) {
                setPlayer2DiceValue(msg.payload.payload);
            }
        
            findLegalMoves(msg.payload.payload, currentPlayerColor)
            if (msg.user === user.username) {
                socket.emit("chatControl", buildMessage({ msg: `${msg.user} rolled ${msg.payload.payload}` }));
            }
        } else {
            dispatch(updateBoard(msg.payload));
            if(msg.payload.action === "MOVE"){
                const toState = boardState[msg.payload.payload.to.x][msg.payload.payload.to.y];
                if(currentPlayerColor === "Y" && (toState.match(/Y/g) || []).length === 4){
                    socket.emit("move", buildMessage({ action: "GAME_END", payload: {  player:findCurrentPlayer() } }, 0));
                }
                else if(currentPlayerColor === "R" && (toState.match(/R/g) || []).length === 4){
                    socket.emit("move", buildMessage({ action: "GAME_END", payload: { player:findCurrentPlayer() } }, 0));
                }
            }
        }


        console.log("Received: " + JSON.stringify(msg));
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

    function passTurnToNextPlayer() {
    
        if(socket){
            const p = findCurrentPlayer();
            const nextTurn = Number(p.game_position) === 1 ? 2 : 1
            socket.emit("move", buildMessage({ action: "CHANGE_TURN", payload: { playerColor: findCurrentPlayerColor() } }, nextTurn));
        }
    }


    function findCurrentPlayer() {
        return game.players.find(p => p.member.user.id === user.id);
    }

    function findPlayerByGamePosition(game_position) {
        return game.players.find(p => Number(p.game_position) === game_position);
    }

    function findPlayerNameByGamePosition(game_position){
        var player = findPlayerByGamePosition(game_position);
        if(player){
            return player.member.user.username;
        }else{
            return "Viewer"
        }

    }

    function findCurrentPlayerColor() {
        const playerColors = ["", "Y", "R", "G", "B"]
        const cp = findCurrentPlayer();
        if(cp){
            return playerColors[cp.game_position];
        }else{
            return "";
        }
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
                if( curPos.x == YellowEndBlock.x && curPos.y ===YellowEndBlock.y ){
                    console.log(`Skipping as this position (${curPos.x}, ${curPos.y} ) is End Block for Yellow`);
                }
                else if (isStartCoordinate("Y", curPos) && diceRoll === 6) {
                    lm.push(new LegalMove(curPos, new PawnCoordinate(13, 6)));
                } else {
                    const curPosIndex = yellowPath.findIndex(yp => yp.x === curPos.x && yp.y === curPos.y);
                    if(curPosIndex >=0){
                        const nextPos = yellowPath[curPosIndex + diceRoll];
                        if(nextPos){
                            lm.push(new LegalMove(curPos, new PawnCoordinate(nextPos.x, nextPos.y)))
                        }
                    }
                }
            }
            else if (cpc === "R") {
                if( curPos.x == RedEndBlock.x && curPos.y === RedEndBlock.y ){
                    console.log(`Skipping as this position (${curPos.x}, ${curPos.y} ) is End Block for Red`);
                }
                else if (isStartCoordinate("R", allPositions[p])&& diceRoll === 6) {
                    lm.push(new LegalMove(allPositions[p], new PawnCoordinate(1, 8)));
                } else {
                    const curPosIndex = redPath.findIndex(rp => rp.x === curPos.x && rp.y === curPos.y);
                    if(curPosIndex >=0){
                        const nextPos = redPath[curPosIndex + diceRoll];
                        if(nextPos){
                            lm.push(new LegalMove(curPos, new PawnCoordinate(nextPos.x, nextPos.y)))
                        }
                    }

                }
            }
            else if (cpc === "G") {
                if( curPos.x == GreenEndBlock.x && curPos.y === GreenEndBlock.y ){
                    console.log(`Skipping as this position (${curPos.x}, ${curPos.y} ) is End Block for Green`);
                }
                else  if (isStartCoordinate("G", allPositions[p]) && diceRoll === 6) {
                    lm.push(new LegalMove(allPositions[p], new PawnCoordinate(6, 1)));
                } else {
                    const curPosIndex = greenPath.findIndex(rp => rp.x === curPos.x && rp.y === curPos.y);
                    if(curPosIndex >=0){
                        const nextPos = greenPath[curPosIndex + diceRoll];
                        if(nextPos){
                            lm.push(new LegalMove(curPos, new PawnCoordinate(nextPos.x, nextPos.y)))
                        }
                        
                    }

                }
            }
            else if (cpc === "B") {
                if( curPos.x == BlueEndBlock.x && curPos.y === BlueEndBlock.y ){
                    console.log(`Skipping as this position (${curPos.x}, ${curPos.y} ) is End Block for Blue`);
                }
                else if (isStartCoordinate("B", allPositions[p]) && diceRoll === 6) {
                    lm.push(new LegalMove(allPositions[p], new PawnCoordinate(8, 13)));
                } else {
                    const curPosIndex = bluePath.findIndex(rp => rp.x === curPos.x && rp.y === curPos.y);
                    if(curPosIndex >=0){
                        const nextPos = bluePath[curPosIndex + diceRoll];
                        if(nextPos){
                            lm.push(new LegalMove(curPos, new PawnCoordinate(nextPos.x, nextPos.y)))
                        }
                        
                    }

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

        socket.on("leave", (msg) => {
            alert(JSON.stringify(msg));
        })


        socket.on("chat", (msg) => {
            setChatMessages(messages => [...messages, msg]);
        })

        socket.on("chatControl", (msg) => {
            // when we recieve a chat, add it into our messages array in state
            setChatMessages(messages => [...messages, msg])
        })


        // when component unmounts, disconnect
        return (() => {
            socket.emit("leave", buildMessage({ action: "LEAVE" }));
            socket.disconnect()
        })
    }, []);




    function buildMessage(payload, switchTurn) {
        return { roomId: roomId, gameId: gameId, user: user.username, room: chatRoomId, switchTurn: switchTurn, payload: payload };
    }

    function startGame() {
        socket.emit("move", buildMessage({ action: "INIT" }, 1));
    }

    function startDemoGame() {
        socket.emit("move", buildMessage({ action: "INIT_DEMO" }, 1));
    }


    function rollDice(player) {
        let roll = Math.floor(Math.random() * 6) + 1;
        dice_audio.play()
        socket.emit("move", buildMessage({ action: "ROLL_DICE", p: player, payload: roll }, playerTurn));
    }

    if (!(boardState && user && game && currentGameState)) return null;


    return boardState && user && game && currentGameState &&  (
        <div className={styles.mainDiv}>
            <div className={styles.mainContainer}>
                <div className={styles.player1}>{playerTurn === 1 ? "*" : ""}{findPlayerByGamePosition(1).member.user.username}
                    <Die face={player1DiceValue} />
                    {playerTurn === 1 &&
                        <div>
                            {allowedAction === EnumAllowedActions.ROLL_DICE && findPlayerByGamePosition(playerTurn).member.user.username === user.username && <div className={styles.handPointer} onClick={() => rollDice(1)} ><i class="fa-solid fa-hand-point-up fa-2xl fa-bounce"></i></div>}
                        </div>
                    }

                </div>
                <div className={styles.boardDiv}>
                    <div className={styles.moveDescription}>
                        {playerTurn === 0
                            && 
                            <>
                                {game.game_status === "new" && findPlayerByGamePosition(2) && findPlayerByGamePosition(1) && findCurrentPlayer() && <button onClick={startGame} >Start Game</button>}
                                {game.game_status === "new" && findPlayerByGamePosition(2) && findPlayerByGamePosition(1) && findCurrentPlayer() && <button onClick={startDemoGame} >Start Demo Game</button>}
                            </>
                            || 
                            <div className={styles.playerInfo}>
                            {findPlayerByGamePosition(playerTurn) 
                                && <div>Player {playerTurn} ({findPlayerByGamePosition(playerTurn).member.user.username}) to {EnumAllowedActionsToString(allowedAction)} </div> 
                                || <div>View only mode</div> 
                            }
                            </div>
                        }
                    </div>
                    {currentGameState.state === "GAME_END" && <div className={styles.gameWon}>Game won by Player {currentGameState.winner.member.user.username} </div>
                    || <LudoBoard boardState={boardState} currentPlayerColor={currentPlayerColor} legalMoves={legalMoves} isMyTurn={allowedAction === EnumAllowedActions.MOVE_PAWN && findCurrentPlayer() && playerTurn === Number(findCurrentPlayer().game_position)} onPawnClick={onPawnClick} passTurnToNextPlayer={passTurnToNextPlayer} />
                    }
                </div>
                <div className={styles.player2}>{playerTurn === 2 ? "*" : ""}{findPlayerByGamePosition(2) ? findPlayerByGamePosition(2).member.user.username: "Waiting for Player 2"}
                    <Die face={player2DiceValue} />
                    {playerTurn === 2 &&
                        <div>
                            {
                                findPlayerByGamePosition(2) 
                                && allowedAction === EnumAllowedActions.ROLL_DICE 
                                && findPlayerByGamePosition(playerTurn).member.user.username === user.username 
                                && 
                                <div className={styles.handPointer} onClick={() => rollDice(2)} ><i class="fa-solid fa-hand-point-up fa-2xl fa-bounce"></i></div>
                            }
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
    { x: 7, y: 6 },
];


const bluePath = [
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
    { x: 7, y: 8 }
];

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
    { x: 1, y: 7 },
    { x: 2, y: 7 },
    { x: 3, y: 7 },
    { x: 4, y: 7 },
    { x: 5, y: 7 },
    { x: 6, y: 7 }
];

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
    { x: 9, y: 7 },
    { x: 8, y: 7 },
];


const GreenEndBlock = new PawnCoordinate(7,6);
const BlueEndBlock = new PawnCoordinate(7,8);
const YellowEndBlock = new PawnCoordinate(8,7);
const RedEndBlock = new PawnCoordinate(6,7);