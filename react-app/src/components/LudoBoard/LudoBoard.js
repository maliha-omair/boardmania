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
                <GreenBlock/>
                <GreenBlock/>
                <GreenBlock/>
                <GreenBlock/>
                <GreenBlock/>
                <WhiteBlock/>
                <WhiteBlock/>
                <WhiteBlock/>
                <RedBlock/>
                <RedBlock/>
                <RedBlock/>
                <RedBlock/>
                <RedBlock/>
                <RedBlock/>
            </div>
            <div id="row2" className={styles.board}>
                <GreenBlock/>
                <WhiteBlockNoBorder/>
                <WhiteBlockNoBorder/>
                <WhiteBlockNoBorder/>
                <WhiteBlockNoBorder/>
                <GreenBlock/>
                <WhiteBlock/>
                <RedBlock/>
                <RedBlock/>
                <RedBlock/>
                <WhiteBlockNoBorder/>
                <WhiteBlockNoBorder/>
                <WhiteBlockNoBorder/>
                <WhiteBlockNoBorder/>
                <RedBlock/>
            </div>
            <div id="row3" className={styles.board}>
                <GreenBlock/>
                <WhiteBlockNoBorder/>
                <WhiteBlockNoBorder/>
                <WhiteBlockNoBorder/>
                <WhiteBlockNoBorder/>
                <GreenBlock/>
                <WhiteBlock/>
                <RedBlock/>
                <WhiteBlock/>
                <RedBlock/>
                <WhiteBlockNoBorder/>
                <WhiteBlockNoBorder/>
                <WhiteBlockNoBorder/>
                <WhiteBlockNoBorder/>
                <RedBlock/>
            </div>
            <div id="row4" className={styles.board}>
                <GreenBlock/>
                <WhiteBlockNoBorder/>
                <WhiteBlockNoBorder/>
                <WhiteBlockNoBorder/>
                <WhiteBlockNoBorder/>
                <GreenBlock/>
                <WhiteBlock/>
                <RedBlock/>
                <WhiteBlock/>
                <RedBlock/>
                <WhiteBlockNoBorder/>
                <WhiteBlockNoBorder/>
                <WhiteBlockNoBorder/>
                <WhiteBlockNoBorder/>
                <RedBlock/>
            </div>
            <div id="row5" className={styles.board}>
                <GreenBlock/>
                <WhiteBlockNoBorder/>
                <WhiteBlockNoBorder/>
                <WhiteBlockNoBorder/>
                <WhiteBlockNoBorder/>
                <GreenBlock/>
                <WhiteBlock/>
                <RedBlock/>
                <WhiteBlock/>
                <RedBlock/>
                <WhiteBlockNoBorder/>
                <WhiteBlockNoBorder/>
                <WhiteBlockNoBorder/>
                <WhiteBlockNoBorder/>
                <RedBlock/>
            </div>
            <div id="row6" className={styles.board}>
                <GreenBlock/>
                <GreenBlock/>
                <GreenBlock/>
                <GreenBlock/>
                <GreenBlock/>
                <GreenBlock/>
                <WhiteBlock/>
                <RedBlock/>
                <WhiteBlock/>
                <RedBlock/>
                <RedBlock/>
                <RedBlock/>
                <RedBlock/>
                <RedBlock/>
                <RedBlock/>
            </div>
            <div id="row7" className={styles.board}>
            <WhiteBlock/>
                <GreenBlock/>
                <WhiteBlock/>
                <WhiteBlock/>
                <WhiteBlock/>
                <WhiteBlock/>
                <div className={[styles.border].join(" ")}></div>
                <div className={[styles.border, styles.arrowDown].join(" ")}></div>
                <div className={[styles.border].join(' ')} />
                <WhiteBlock/>
                <WhiteBlock/>
                <WhiteBlock/>
                <WhiteBlock/>
                <WhiteBlock/>
                <WhiteBlock/>
            </div>
            <div className={styles.board}>
            <WhiteBlock/>
                <GreenBlock/>
                <GreenBlock/>
                <GreenBlock/>
                <GreenBlock/>
                <GreenBlock/>
                <div className={[styles.border, styles.arrowRight].join(" ")}></div>

                <div className={styles.border}></div>
                <div className={[styles.border, styles.arrowLeft].join(" ")}></div>
                <BlueBlock/>
                <BlueBlock/>
                <BlueBlock/>
                <BlueBlock/>
                <BlueBlock/>
                <WhiteBlock/>
            </div>
            <div className={styles.board}>
                <WhiteBlock/>
                <WhiteBlock/>
                <WhiteBlock/>
                <WhiteBlock/>
                <WhiteBlock/>
                <WhiteBlock/>
                <div className={styles.border}></div>
                <div className={[styles.border, styles.arrowUp].join(" ")}></div>
                <div className={styles.border}></div>
                <WhiteBlock/>
                <WhiteBlock/>
                <WhiteBlock/>
                <WhiteBlock/>
                <BlueBlock/>
                <WhiteBlock/>
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