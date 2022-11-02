import { useSelector } from "react-redux"
import styles from "../SplashPage/SplashPage.module.css"
import image from "../../assets/ludoBoard.png"
export default function SplashPage() {
    const user = useSelector(state => state.session.user)
    if (!user) return null
    return user && (
        <div className={styles.mainContainer}>

            <div className={styles.subContainer}>

                {/* <div className={styles.subDiv}> */}

                <div className={styles.innerDiv}>
                    <div className={styles.welcomeDiv} >
                        Welcome {user.username}
                    </div>
                    <h1>Board Mania</h1>
                    PUZZLE»BOARD

                    BoardMania is an online Ludo game. You can play Ludo King in online multiplayer mode or locally, as well as against computer opponents. The first player to move all four pieces into their home triangle wins the game!

                    <h2>About Boarmania</h2>
                    Boardmania is an online version of the classic board game Ludo. You can play with your friends and family, or against the computer. It’s a really easy game to learn, making it suitable for players of all ages.

                    <h3>Ludo Rules</h3>
                    Ludo is a game played by two to four players. Each player must choose one of the four available colors to play as.

                    The game starts with each player taking turns to roll the die. For a player to start moving a piece around the board, they must roll a six. Once you have multiple pieces in play, you can choose which piece you want to move.

                    <h3>Rule of six</h3>
                    If you have one or more pieces in play, you can choose whether to take a piece out or move a piece six spaces.
                    Players that roll a six earn an additional roll.
                    Occupied squares
                    If your piece lands on a square occupied by an opponent, their piece goes back to their base, and they must roll a six to take it back out.
                    If you land on the same square as one of your other pieces, it blocks the path for your opponents.
                </div>
                <div className={styles.imageDiv}>
                    <img className={styles.image} src={image}></img>
                </div>
                {/* </div> */}
            </div>
        </div>
    )
}