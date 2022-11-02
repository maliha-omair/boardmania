import { NavLink, Route, Switch, useHistory } from "react-router-dom"
import CreateRoom from "../CreateRoom/CreateRoom"
import EditRoom from "../EditRoom/EditRoom";
import GameBoard from "../GameBoard/GameBoard";
import styles from "../Home/Home.module.css"
import PublicRooms from "../PublicRooms/PublicRooms"
import SingleRoom from "../SingleRoom/SingleRoom";
import SplashPage from "../SplashPage/SplashPage";
import UserRooms from "../UserRooms/UserRooms";

export default function Home() {
    const history = useHistory();
    return (
        <div className={styles.mainContainer}>

            <div className={styles.leftDiv}>
                {/* <div className={styles.homeDiv}>
                    Home
                </div> */}
                <div className={styles.newRoomDiv} 
                    onClick={()=>history.push(`/newRoom`)}
                >
                    <NavLink className={styles.newRoom} to={`/newRoom`} >New Room</NavLink>
                </div>
                <div className={styles.publicRoomDiv}
                    onClick={()=>history.push(`/publicRoom`)}
                >
                    <NavLink className={styles.publicRoom} to={`/publicRoom`} >Public Rooms</NavLink>
                </div>
                <div className={styles.yourRoomDiv}
                    onClick={()=>history.push(`/userRoom`)}
                >
                    <NavLink className={styles.yourRoom} to={`/userRoom`} >Your Rooms</NavLink>
                </div>

            </div>
            <div className={styles.centerDiv}>
               
                <Switch>
                    <Route exact path="/">
                        <SplashPage />
                    </Route>
                    <Route exact path="/newRoom">
                        <CreateRoom />
                    </Route>
                    <Route exact path="/publicRoom">
                        <PublicRooms />
                    </Route>
                    <Route exact path="/userRoom">
                         <UserRooms />
                    </Route>
                    <Route path="/rooms/:roomId/edit">
                        <EditRoom />
                     </Route>
                     <Route path="/rooms/:roomId/view">
                        <SingleRoom />
                     </Route>
                     <Route path="/rooms/:roomId/games/:gameId">
                        <GameBoard />
                     </Route>
                </Switch>

            </div>
            

        </div>
    )
}