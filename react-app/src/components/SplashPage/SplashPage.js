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
                  

                    BoardMania is an online Ludo game. You can play Ludo King in multiplayer mode. The first player to move all four pieces into their home triangle wins the game!

                    <h2>About Boarmania</h2>
                    Boardmania is an online version of the classic board game Ludo. You can play with your friends and family. It’s a really easy game to learn, making it suitable for players of all ages.

                    <h3>Ludo Rules</h3>
                    To play game players need to join room and create game. 
                    <li>Ludo is a game played by two players. </li>
                    <li>The game starts with each player taking turns to roll the die. </li>
                    <li>For a player to start moving a piece around the board, they must roll a six.</li>
                    <li>Once you have multiple pieces in play, you can choose which piece you want to move.</li>
                    <h3>Public Rooms</h3>
                    <li>Players can find public rooms by clicking public rooms and then join them. </li>
                    <li>Once player's membership is accepted they can create game. </li>
                    <h3>Your Rooms</h3>
                    <li>User can view their room and rooms which they have membership under your rooms</li>
                    <li>User can delete or edit rooms</li>
                    <h3>Game Viewers</h3>
                    Ludo needs two players to start the game. Other users can join as a viewer by clicking the small eye next to on going game. 
                    <h3>Membership</h3>
                    User can accept or reject(delete) membership request by other players on rooms created by them.
                </div>
                <div className={styles.imageDiv}>
                    <img className={styles.image} src={image}></img>
                </div>
                {/* </div> */}
            </div>
        </div>
    )
}