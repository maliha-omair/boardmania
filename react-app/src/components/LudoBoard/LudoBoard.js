import { useDispatch, useSelector } from "react-redux"
import styles from "../LudoBoard/LudoBoard.module.css"
import BlueBlock from "./BlueBlock"
import GreenBlock from "./GreenBlock"
import RedBlock from "./RedBlock"
import WhiteBlock from "./WhiteBlock"
import WhiteBlockNoBorder from "./WhiteBlockNoBorder"
import YellowBlock from "./YellowBlock"






export default function LudoBoard({boardState, currentPlayer, legalMoves, onPawnClick}) {

    const shake=true;
    // use state for controlled form input
    const dispatch = useDispatch()
    console.log("legalMoves : "+ legalMoves);

    if (!boardState) return null;
    return legalMoves && boardState && (
        <div className={styles.mainContainer}>            
            <div id="row1" className={styles.board}>
                <GreenBlock s = {boardState[0][0]} x={0} y={0} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <GreenBlock s = {boardState[0][1]} x={0} y={1} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <GreenBlock s = {boardState[0][2]} x={0} y={2} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <GreenBlock s = {boardState[0][3]} x={0} y={3} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <GreenBlock s = {boardState[0][4]} x={0} y={4} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <GreenBlock s = {boardState[0][5]} x={0} y={5} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <WhiteBlock s = {boardState[0][6]} x={0} y={6} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <WhiteBlock s = {boardState[0][7]} x={0} y={7} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <WhiteBlock s = {boardState[0][8]} x={0} y={8} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <RedBlock s = {boardState[0][9]} x={0} y={9} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <RedBlock s = {boardState[0][10]} x={0} y={10} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <RedBlock s = {boardState[0][11]} x={0} y={11} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <RedBlock s = {boardState[0][12]} x={0} y={12} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <RedBlock s = {boardState[0][13]} x={0} y={13} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <RedBlock s = {boardState[0][14]} x={0} y={14} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
            </div>
            <div id="row2" className={styles.board}>
                <GreenBlock s = {boardState[1][0]} x={1} y={0} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <WhiteBlockNoBorder s = {boardState[1][1]} x={1} y={1} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <WhiteBlockNoBorder s = {boardState[1][2]} x={1} y={2} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <WhiteBlockNoBorder s = {boardState[1][3]} x={1} y={3} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <WhiteBlockNoBorder s = {boardState[1][4]} x={1} y={4} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <GreenBlock s = {boardState[1][5]} x={1} y={5} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <WhiteBlock s = {boardState[1][6]} x={1} y={6} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <RedBlock s = {boardState[1][7]} x={1} y={7} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <RedBlock s = {boardState[1][8]} x={1} y={8} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <RedBlock s = {boardState[1][9]} x={1} y={9} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <WhiteBlockNoBorder s = {boardState[1][10]} x={1} y={10} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <WhiteBlockNoBorder s = {boardState[1][11]} x={1} y={11} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <WhiteBlockNoBorder s = {boardState[1][12]} x={1} y={12} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <WhiteBlockNoBorder s = {boardState[1][13]} x={1} y={13} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <RedBlock s = {boardState[1][14]} x={1} y={14} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
            </div>
            <div id="row3" className={styles.board}>
                <GreenBlock s = {boardState[2][0]}  x={2} y={0} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <WhiteBlockNoBorder s = {boardState[2][1]}  x={2} y={1} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <WhiteBlockNoBorder s = {boardState[2][2]}  x={2} y={2} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <WhiteBlockNoBorder s = {boardState[2][3]}  x={2} y={3} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <WhiteBlockNoBorder s = {boardState[2][4]}  x={2} y={4} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <GreenBlock s = {boardState[2][5]}  x={2} y={5} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <WhiteBlock s = {boardState[2][6]}  x={2} y={6} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <RedBlock s = {boardState[2][7]}  x={2} y={7} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <WhiteBlock s = {boardState[2][8]}  x={2} y={8} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <RedBlock s = {boardState[2][9]}  x={2} y={9} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <WhiteBlockNoBorder s = {boardState[2][10]}  x={2} y={10} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <WhiteBlockNoBorder s = {boardState[2][11]}  x={2} y={11} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <WhiteBlockNoBorder s = {boardState[2][12]}  x={2} y={12} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <WhiteBlockNoBorder s = {boardState[2][13]}  x={2} y={13} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <RedBlock s = {boardState[2][14]}  x={2} y={14} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
            </div>
            <div id="row4" className={styles.board}>
                <GreenBlock s = {boardState[3][0]}  x={3} y={0} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <WhiteBlockNoBorder s ={boardState[3][1]}  x={3} y={1} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <WhiteBlockNoBorder s ={boardState[3][2]}  x={3} y={2} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <WhiteBlockNoBorder s ={boardState[3][3]}  x={3} y={3} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <WhiteBlockNoBorder s ={boardState[3][4]}  x={3} y={4} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <GreenBlock s ={boardState[3][5]}  x={3} y={5} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <WhiteBlock s ={boardState[3][6]}  x={3} y={6} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <RedBlock s ={boardState[3][7]}  x={3} y={7} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <WhiteBlock s ={boardState[3][8]}  x={3} y={8} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <RedBlock s ={boardState[3][9]}  x={3} y={9} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <WhiteBlockNoBorder s ={boardState[3][10]}  x={3} y={10} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <WhiteBlockNoBorder s ={boardState[3][11]}  x={3} y={11} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <WhiteBlockNoBorder s ={boardState[3][12]}  x={3} y={12} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <WhiteBlockNoBorder s ={boardState[3][13]}  x={3} y={13} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <RedBlock s ={boardState[3][14]}  x={3} y={14} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
            </div>
            <div id="row5" className={styles.board}>
                <GreenBlock s ={boardState[4][0]}  x={4} y={0} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <WhiteBlockNoBorder s ={boardState[4][1]}  x={4} y={1} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <WhiteBlockNoBorder s ={boardState[4][2]}  x={4} y={2} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <WhiteBlockNoBorder s ={boardState[4][3]}  x={4} y={3} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <WhiteBlockNoBorder s ={boardState[4][4]}  x={4} y={4} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <GreenBlock s ={boardState[4][5]}  x={4} y={5} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <WhiteBlock s ={boardState[4][6]}  x={4} y={6} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <RedBlock s ={boardState[4][7]}  x={4} y={7} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <WhiteBlock s ={boardState[4][8]}  x={4} y={8} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <RedBlock s ={boardState[4][9]}  x={4} y={9} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <WhiteBlockNoBorder s ={boardState[4][10]}  x={4} y={10} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <WhiteBlockNoBorder s ={boardState[4][11]}  x={4} y={11} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <WhiteBlockNoBorder s ={boardState[4][12]}  x={4} y={12} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <WhiteBlockNoBorder s ={boardState[4][13]}  x={4} y={13} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <RedBlock s ={boardState[4][13]}  x={4} y={13} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
            </div>
            <div id="row6" className={styles.board}>
                <GreenBlock s ={boardState[5][0]}  x={5} y={0} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <GreenBlock s ={boardState[5][1]}  x={5} y={1} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <GreenBlock s ={boardState[5][2]}  x={5} y={2} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <GreenBlock s ={boardState[5][3]}  x={5} y={3} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <GreenBlock s ={boardState[5][4]}  x={5} y={4} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <GreenBlock s ={boardState[5][5]}  x={5} y={5} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <WhiteBlock s ={boardState[5][6]}  x={5} y={6} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <RedBlock s ={boardState[5][7]}  x={5} y={7} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <WhiteBlock s ={boardState[5][8]}  x={5} y={8} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <RedBlock s ={boardState[5][9]}  x={5} y={9} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <RedBlock s ={boardState[5][10]}  x={5} y={10} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <RedBlock s ={boardState[5][11]}  x={5} y={11} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <RedBlock s ={boardState[5][12]}  x={5} y={12} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <RedBlock s ={boardState[5][13]}  x={5} y={13} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <RedBlock s ={boardState[5][14]}  x={5} y={14} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
            </div>
            <div id="row7" className={styles.board}>
                <WhiteBlock s ={boardState[6][0]}  x={6} y={0} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <GreenBlock s ={boardState[6][1]}  x={6} y={1} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <WhiteBlock s ={boardState[6][2]}  x={6} y={2} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <WhiteBlock s ={boardState[6][3]}  x={6} y={3} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <WhiteBlock s ={boardState[6][4]}  x={6} y={4} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <WhiteBlock s ={boardState[6][5]}  x={6} y={5} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <div className={[styles.border].join(" ")} ></div>
                <div className={[styles.border, styles.arrowDown].join(" ")}></div>
                <div className={[styles.border].join(' ')}  />
                <WhiteBlock s ={boardState[6][9]}  x={6} y={9} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <WhiteBlock s ={boardState[6][10]}  x={6} y={10} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <WhiteBlock s ={boardState[6][11]}  x={6} y={11} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <WhiteBlock s ={boardState[6][12]}  x={6} y={12} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <WhiteBlock s ={boardState[6][13]}  x={6} y={13} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <WhiteBlock s ={boardState[6][14]}  x={6} y={14} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
            </div>
            <div className={styles.board}>
                <WhiteBlock s ={boardState[7][0]}  x={7} y={0} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <GreenBlock s ={boardState[7][1]}  x={7} y={1} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <GreenBlock s ={boardState[7][2]}  x={7} y={2} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <GreenBlock s ={boardState[7][3]}  x={7} y={3} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <GreenBlock s ={boardState[7][4]}  x={7} y={4} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <GreenBlock s ={boardState[7][5]}  x={7} y={5} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <div className={[styles.border, styles.arrowRight].join(" ")}></div>
                <div className={styles.border}></div>
                <div className={[styles.border, styles.arrowLeft].join(" ")}></div>
                <BlueBlock s ={boardState[7][9]}  x={7} y={9} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <BlueBlock s ={boardState[7][10]}  x={7} y={10} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <BlueBlock s ={boardState[7][11]}  x={7} y={11} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <BlueBlock s ={boardState[7][12]}  x={7} y={12} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <BlueBlock s ={boardState[7][13]}  x={7} y={13} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <WhiteBlock s ={boardState[7][14]}  x={7} y={14} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
            </div>
            <div className={styles.board}>
                <WhiteBlock s ={boardState[8][0]}  x={8} y={0} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <WhiteBlock s ={boardState[8][1]}  x={8} y={1} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <WhiteBlock s ={boardState[8][2]}  x={8} y={2} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <WhiteBlock s ={boardState[8][3]}  x={8} y={3} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <WhiteBlock s ={boardState[8][4]}  x={8} y={4} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <WhiteBlock s ={boardState[8][5]}  x={8} y={5} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <div className={styles.border}></div>
                <div className={[styles.border, styles.arrowUp].join(" ")}></div>
                <div className={styles.border}></div>
                <WhiteBlock s ={boardState[8][9]}  x={8} y={9} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <WhiteBlock s ={boardState[8][10]}  x={8} y={10} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <WhiteBlock s ={boardState[8][11]}  x={8} y={11} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <WhiteBlock s ={boardState[8][12]}  x={8} y={12} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <BlueBlock s ={boardState[8][13]}  x={8} y={13} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <WhiteBlock s ={boardState[8][14]}  x={8} y={14} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
            </div>
            <div className={styles.board}>
                <YellowBlock s={boardState[9][0]}  x={9} y={0} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <YellowBlock s={boardState[9][1]}  x={9} y={1} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <YellowBlock s={boardState[9][2]}  x={9} y={2} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <YellowBlock s={boardState[9][3]}  x={9} y={3} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <YellowBlock s={boardState[9][4]}  x={9} y={4} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <YellowBlock s={boardState[9][5]}  x={9} y={5} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <WhiteBlock s={boardState[9][6]}  x={9} y={6} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <YellowBlock s={boardState[9][7]}  x={9} y={7} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <WhiteBlock s={boardState[9][8]}  x={9} y={8} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <BlueBlock s={boardState[9][9]}  x={9} y={9} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <BlueBlock s={boardState[9][10]}  x={9} y={10} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <BlueBlock s={boardState[9][11]}  x={9} y={11} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <BlueBlock s={boardState[9][12]}  x={9} y={12} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <BlueBlock s={boardState[9][13]}  x={9} y={13} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <BlueBlock s={boardState[9][14]}  x={9} y={14} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
            </div>
            <div className={styles.board}>
                <YellowBlock s={boardState[10][0]}  x={10} y={0} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <WhiteBlockNoBorder s={boardState[10][1]}  x={10} y={1} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <WhiteBlockNoBorder s={boardState[10][2]}  x={10} y={2} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <WhiteBlockNoBorder s={boardState[10][3]}  x={10} y={3} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <WhiteBlockNoBorder s={boardState[10][4]}  x={10} y={4} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <YellowBlock s={boardState[10][5]}  x={10} y={5} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <WhiteBlock s={boardState[10][6]}  x={10} y={6} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <YellowBlock s={boardState[10][7]}  x={10} y={7} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <WhiteBlock s={boardState[10][8]}  x={10} y={8} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <BlueBlock s={boardState[10][9]}  x={10} y={9} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <WhiteBlockNoBorder s={boardState[10][10]}  x={10} y={10} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <WhiteBlockNoBorder s={boardState[10][11]}  x={10} y={11} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <WhiteBlockNoBorder s={boardState[10][12]}  x={10} y={12} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <WhiteBlockNoBorder s={boardState[10][13]}  x={10} y={13} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <BlueBlock s={boardState[10][14]}  x={10} y={14} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
            </div>
            <div className={styles.board}>
                <YellowBlock s={boardState[11][0]}  x={11} y={0} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <WhiteBlockNoBorder s={boardState[11][1]}  x={11} y={1} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <WhiteBlockNoBorder s={boardState[11][2]}  x={11} y={2} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <WhiteBlockNoBorder s={boardState[11][3]}  x={11} y={3} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <WhiteBlockNoBorder s={boardState[11][4]}  x={11} y={4} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <YellowBlock s={boardState[11][5]}  x={11} y={5} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <WhiteBlock s={boardState[11][6]}  x={11} y={6} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <YellowBlock s={boardState[11][7]}  x={11} y={7} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <WhiteBlock s={boardState[11][8]}  x={11} y={8} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <BlueBlock s={boardState[11][9]}  x={11} y={9} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <WhiteBlockNoBorder s={boardState[11][10]}  x={11} y={10} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <WhiteBlockNoBorder s={boardState[11][11]}  x={11} y={11} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <WhiteBlockNoBorder s={boardState[11][12]}  x={11} y={12} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <WhiteBlockNoBorder s={boardState[11][13]}  x={11} y={13} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <BlueBlock s={boardState[11][14]}  x={11} y={14} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
            </div>
            <div className={styles.board}>
                <YellowBlock s={boardState[12][0]}  x={12} y={0} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <WhiteBlockNoBorder s={boardState[12][1]}  x={12} y={1} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <WhiteBlockNoBorder s={boardState[12][2]}  x={12} y={2} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <WhiteBlockNoBorder s={boardState[12][3]}  x={12} y={3} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <WhiteBlockNoBorder s={boardState[12][4]}  x={12} y={4} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <YellowBlock s={boardState[12][5]}  x={12} y={5} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <WhiteBlock s={boardState[12][6]}  x={12} y={6} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <YellowBlock s={boardState[12][7]}  x={12} y={7} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <WhiteBlock s={boardState[12][8]}  x={12} y={8} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <BlueBlock s={boardState[12][9]}  x={12} y={9} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <WhiteBlockNoBorder s={boardState[12][10]}  x={12} y={10} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <WhiteBlockNoBorder s={boardState[12][11]}  x={12} y={11} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <WhiteBlockNoBorder s={boardState[12][12]}  x={12} y={12} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <WhiteBlockNoBorder s={boardState[12][13]}  x={12} y={13} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <BlueBlock s={boardState[12][14]}  x={12} y={14} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
            </div>
            <div className={styles.board}>
                <YellowBlock s={boardState[13][0]}  x={13} y={0} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <WhiteBlockNoBorder s={boardState[13][1]}  x={13} y={1} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <WhiteBlockNoBorder s={boardState[13][2]}  x={13} y={2} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <WhiteBlockNoBorder s={boardState[13][3]}  x={13} y={3} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <WhiteBlockNoBorder s={boardState[13][4]}  x={13} y={4} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <YellowBlock s={boardState[13][5]}  x={13} y={5} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <YellowBlock s={boardState[13][6]}  x={13} y={6} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <YellowBlock s={boardState[13][7]}  x={13} y={7} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <WhiteBlock s={boardState[13][8]}  x={13} y={8} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <BlueBlock s={boardState[13][9]}  x={13} y={9} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <WhiteBlockNoBorder s={boardState[13][10]}  x={13} y={10} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <WhiteBlockNoBorder s={boardState[13][11]}  x={13} y={11} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <WhiteBlockNoBorder s={boardState[13][12]}  x={13} y={12} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <WhiteBlockNoBorder s={boardState[13][13]}  x={13} y={13} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <BlueBlock s={boardState[13][14]}  x={13} y={14} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
            </div>
            <div className={styles.board}>
                <YellowBlock s={boardState[14][0]}  x={14} y={0} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <YellowBlock s={boardState[14][1]}  x={14} y={1} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <YellowBlock s={boardState[14][2]}  x={14} y={2} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <YellowBlock s={boardState[14][3]}  x={14} y={3} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <YellowBlock s={boardState[14][4]}  x={14} y={4} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <YellowBlock s={boardState[14][5]}  x={14} y={5} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <WhiteBlock s={boardState[14][6]}  x={14} y={6} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <WhiteBlock s={boardState[14][7]}  x={14} y={7} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <WhiteBlock s={boardState[14][8]}  x={14} y={8} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <BlueBlock s={boardState[14][9]}  x={14} y={9} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <BlueBlock s={boardState[14][10]}  x={14} y={10} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <BlueBlock s={boardState[14][11]}  x={14} y={11} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <BlueBlock s={boardState[14][12]}  x={14} y={12} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <BlueBlock s={boardState[14][13]}  x={14} y={13} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
                <BlueBlock s={boardState[14][14]}  x={14} y={14} legalMoves={legalMoves} currentPlayer={currentPlayer} onPawnClick={onPawnClick} />
            </div>
                      
        </div>
    )
}