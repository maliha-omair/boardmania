import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getGameThunk } from "../../store/rooms"
import styles from "../LudoBoard/LudoBoard.module.css"
import BlueBlock from "./BlueBlock"
import GreenBlock from "./GreenBlock"
import RedBlock from "./RedBlock"
import WhiteBlock from "./WhiteBlock"
import WhiteBlockNoBorder from "./WhiteBlockNoBorder"
import YellowBlock from "./YellowBlock"

export default function LudoBoard() {

    const boardState = useSelector(state =>  state.rooms &&  state.rooms.board)
    const dispatch = useDispatch()
    
    
    // const {roomId,gameId} = useParams();
    
    // useEffect(()=>{
    //     dispatch(getGameThunk(gameId))
    // },[dispatch, gameId])

    if (!boardState) return null;
    return boardState && (
        <div className={styles.mainContainer}>
            <div id="row1" className={styles.board}>
                <GreenBlock s = {boardState[0][0]}/>
                <GreenBlock s = {boardState[0][1]}/>
                <GreenBlock s = {boardState[0][2]}/>
                <GreenBlock s = {boardState[0][3]}/>
                <GreenBlock s = {boardState[0][4]}/>
                <GreenBlock s = {boardState[0][5]}/>
                <WhiteBlock s = {boardState[0][6]}/>
                <WhiteBlock s = {boardState[0][7]}/>
                <WhiteBlock s = {boardState[0][8]}/>
                <RedBlock s = {boardState[0][9]}/>
                <RedBlock s = {boardState[0][10]}/>
                <RedBlock s = {boardState[0][11]}/>
                <RedBlock s = {boardState[0][12]}/>
                <RedBlock s = {boardState[0][13]}/>
                <RedBlock s = {boardState[0][14]}/>
            </div>
            <div id="row2" className={styles.board}>
                <GreenBlock s = {boardState[1][0]}/>
                <WhiteBlockNoBorder s = {boardState[1][1]}/>
                <WhiteBlockNoBorder s = {boardState[1][2]}/>
                <WhiteBlockNoBorder s = {boardState[1][3]}/>
                <WhiteBlockNoBorder s = {boardState[1][4]}/>
                <GreenBlock s = {boardState[1][5]}/>
                <WhiteBlock s = {boardState[1][6]}/>
                <RedBlock s = {boardState[1][7]}/>
                <RedBlock s = {boardState[1][8]}/>
                <RedBlock s = {boardState[1][9]}/>
                <WhiteBlockNoBorder s = {boardState[1][10]}/>
                <WhiteBlockNoBorder s = {boardState[1][11]}/>
                <WhiteBlockNoBorder s = {boardState[1][12]}/>
                <WhiteBlockNoBorder s = {boardState[1][13]}/>
                <RedBlock s = {boardState[1][14]}/>
            </div>
            <div id="row3" className={styles.board}>
                <GreenBlock s = {boardState[2][0]}/>
                <WhiteBlockNoBorder s = {boardState[2][1]}/>
                <WhiteBlockNoBorder s = {boardState[2][2]}/>
                <WhiteBlockNoBorder s = {boardState[2][3]}/>
                <WhiteBlockNoBorder s = {boardState[2][4]}/>
                <GreenBlock s = {boardState[2][5]}/>
                <WhiteBlock s = {boardState[2][6]}/>
                <RedBlock s = {boardState[2][7]}/>
                <WhiteBlock s = {boardState[2][8]}/>
                <RedBlock s = {boardState[2][9]}/>
                <WhiteBlockNoBorder s = {boardState[2][10]}/>
                <WhiteBlockNoBorder s = {boardState[2][11]}/>
                <WhiteBlockNoBorder s = {boardState[2][12]}/>
                <WhiteBlockNoBorder s = {boardState[2][13]}/>
                <RedBlock s = {boardState[2][14]}/>
            </div>
            <div id="row4" className={styles.board}>
                <GreenBlock s = {boardState[3][0]}/>
                <WhiteBlockNoBorder s ={boardState[3][1]}/>
                <WhiteBlockNoBorder s ={boardState[3][2]}/>
                <WhiteBlockNoBorder s ={boardState[3][3]}/>
                <WhiteBlockNoBorder s ={boardState[3][4]}/>
                <GreenBlock s ={boardState[3][5]}/>
                <WhiteBlock s ={boardState[3][6]}/>
                <RedBlock s ={boardState[3][7]}/>
                <WhiteBlock s ={boardState[3][8]}/>
                <RedBlock s ={boardState[3][9]}/>
                <WhiteBlockNoBorder s ={boardState[3][10]}/>
                <WhiteBlockNoBorder s ={boardState[3][11]}/>
                <WhiteBlockNoBorder s ={boardState[3][12]}/>
                <WhiteBlockNoBorder s ={boardState[3][13]}/>
                <RedBlock s ={boardState[3][14]}/>
            </div>
            <div id="row5" className={styles.board}>
                <GreenBlock s ={boardState[4][0]}/>
                <WhiteBlockNoBorder s ={boardState[4][1]}/>
                <WhiteBlockNoBorder s ={boardState[4][2]}/>
                <WhiteBlockNoBorder s ={boardState[4][3]}/>
                <WhiteBlockNoBorder s ={boardState[4][4]}/>
                <GreenBlock s ={boardState[4][5]}/>
                <WhiteBlock s ={boardState[4][6]}/>
                <RedBlock s ={boardState[4][7]}/>
                <WhiteBlock s ={boardState[4][8]}/>
                <RedBlock s ={boardState[4][9]}/>
                <WhiteBlockNoBorder s ={boardState[4][10]}/>
                <WhiteBlockNoBorder s ={boardState[4][11]}/>
                <WhiteBlockNoBorder s ={boardState[4][12]}/>
                <WhiteBlockNoBorder s ={boardState[4][13]}/>
                <RedBlock s ={boardState[4][14]}/>
            </div>
            <div id="row6" className={styles.board}>
                <GreenBlock s ={boardState[5][0]}/>
                <GreenBlock s ={boardState[5][1]}/>
                <GreenBlock s ={boardState[5][2]}/>
                <GreenBlock s ={boardState[5][3]}/>
                <GreenBlock s ={boardState[5][4]}/>
                <GreenBlock s ={boardState[5][5]}/>
                <WhiteBlock s ={boardState[5][6]}/>
                <RedBlock s ={boardState[5][7]}/>
                <WhiteBlock s ={boardState[5][8]}/>
                <RedBlock s ={boardState[5][9]}/>
                <RedBlock s ={boardState[5][10]}/>
                <RedBlock s ={boardState[5][11]}/>
                <RedBlock s ={boardState[5][12]}/>
                <RedBlock s ={boardState[5][12]}/>
                <RedBlock s ={boardState[5][14]}/>
            </div>
            <div id="row7" className={styles.board}>
            <WhiteBlock s ={boardState[6][0]}/>
                <GreenBlock s ={boardState[6][1]}/>
                <WhiteBlock s ={boardState[6][2]}/>
                <WhiteBlock s ={boardState[6][3]}/>
                <WhiteBlock s ={boardState[6][4]}/>
                <WhiteBlock s ={boardState[6][5]}/>
                <div className={[styles.border].join(" ")} ></div>
                <div className={[styles.border, styles.arrowDown].join(" ")}></div>
                <div className={[styles.border].join(' ')} />
                <WhiteBlock s ={boardState[6][9]}/>
                <WhiteBlock s ={boardState[6][10]}/>
                <WhiteBlock s ={boardState[6][11]}/>
                <WhiteBlock s ={boardState[6][12]}/>
                <WhiteBlock s ={boardState[6][13]}/>
                <WhiteBlock s ={boardState[6][14]}/>
            </div>
            <div className={styles.board}>
            <WhiteBlock s ={boardState[7][0]}/>
                <GreenBlock s ={boardState[7][1]}/>
                <GreenBlock s ={boardState[7][2]}/>
                <GreenBlock s ={boardState[7][3]}/>
                <GreenBlock s ={boardState[7][4]}/>
                <GreenBlock s ={boardState[7][5]}/>
                <div className={[styles.border, styles.arrowRight].join(" ")}></div>

                <div className={styles.border}></div>
                <div className={[styles.border, styles.arrowLeft].join(" ")}></div>
                <BlueBlock s ={boardState[7][9]}/>
                <BlueBlock s ={boardState[7][10]}/>
                <BlueBlock s ={boardState[7][11]}/>
                <BlueBlock s ={boardState[7][12]}/>
                <BlueBlock s ={boardState[7][13]}/>
                <WhiteBlock s ={boardState[7][14]}/>
            </div>
            <div className={styles.board}>
                <WhiteBlock s ={boardState[8][0]}/>
                <WhiteBlock s ={boardState[8][1]}/>
                <WhiteBlock s ={boardState[8][2]}/>
                <WhiteBlock s ={boardState[8][3]}/>
                <WhiteBlock s ={boardState[8][4]}/>
                <WhiteBlock s ={boardState[8][5]}/>
                <div className={styles.border}></div>
                <div className={[styles.border, styles.arrowUp].join(" ")}></div>
                <div className={styles.border}></div>
                <WhiteBlock s ={boardState[8][9]}/>
                <WhiteBlock s ={boardState[8][10]}/>
                <WhiteBlock s ={boardState[8][11]}/>
                <WhiteBlock s ={boardState[8][12]}/>
                <BlueBlock s ={boardState[8][13]}/>
                <WhiteBlock s ={boardState[8][14]}/>
            </div>
            <div className={styles.board}>
                <YellowBlock/>
                <YellowBlock/>
                <YellowBlock/>
                <YellowBlock/>
                <YellowBlock/>
                <YellowBlock/>
                <WhiteBlock/>
                <YellowBlock/>
                <WhiteBlock/>
                <BlueBlock/>
                <BlueBlock/>
                <BlueBlock/>
                <BlueBlock/>
                <BlueBlock/>
                <BlueBlock/>
            </div>
            <div className={styles.board}>
                <YellowBlock/>
                <WhiteBlockNoBorder/>
                <WhiteBlockNoBorder/>
                <WhiteBlockNoBorder/>
                <WhiteBlockNoBorder/>
                <YellowBlock/>
                <WhiteBlock/>
                <YellowBlock/>
                <WhiteBlock/>
                <BlueBlock/>
                <WhiteBlockNoBorder/>
                <WhiteBlockNoBorder/>
                <WhiteBlockNoBorder/>
                <WhiteBlockNoBorder/>
                <BlueBlock/>
            </div>
            <div className={styles.board}>
            <YellowBlock/>
                <WhiteBlockNoBorder/>
                <WhiteBlockNoBorder/>
                <WhiteBlockNoBorder/>
                <WhiteBlockNoBorder/>
                <YellowBlock/>
                <WhiteBlock/>
                <YellowBlock/>
                <WhiteBlock/>
                <BlueBlock/>
                <WhiteBlockNoBorder/>
                <WhiteBlockNoBorder/>
                <WhiteBlockNoBorder/>
                <WhiteBlockNoBorder/>
                <BlueBlock/>
            </div>
            <div className={styles.board}>
            <YellowBlock/>
            <WhiteBlockNoBorder/>
                <WhiteBlockNoBorder/>
                <WhiteBlockNoBorder/>
                <WhiteBlockNoBorder/>
                <YellowBlock/>
                <WhiteBlock/>
                <YellowBlock/>
                <WhiteBlock/>
                <BlueBlock/>
                <WhiteBlockNoBorder/>
                <WhiteBlockNoBorder/>
                <WhiteBlockNoBorder/>
                <WhiteBlockNoBorder/>
                <BlueBlock/>
            </div>
            <div className={styles.board}>
                <YellowBlock/>
                <WhiteBlockNoBorder/>
                <WhiteBlockNoBorder/>
                <WhiteBlockNoBorder/>
                <WhiteBlockNoBorder/>
                <YellowBlock/>
                <YellowBlock/>
                <YellowBlock/>
                <WhiteBlock/>
                <BlueBlock/>
                <WhiteBlockNoBorder/>
                <WhiteBlockNoBorder/>
                <WhiteBlockNoBorder/>
                <WhiteBlockNoBorder/>
                <BlueBlock/>
            </div>
            <div className={styles.board}>
                <YellowBlock/>
                <YellowBlock/>
                <YellowBlock/>
                <YellowBlock/>
                <YellowBlock/>
                <YellowBlock/>
                <WhiteBlock/>
                <WhiteBlock/>
                <WhiteBlock/>
                <BlueBlock/>
                <BlueBlock/>
                <BlueBlock/>
                <BlueBlock/>
                <BlueBlock/>
                <BlueBlock/>
            </div>
        </div>
    )
}