import { NavLink, Route, Switch } from "react-router-dom"
import CreateRoom from "../CreateRoom/CreateRoom"
import EditRoom from "../EditRoom/EditRoom";
import styles from "../Home/Home.module.css"
import PublicRooms from "../PublicRooms/PublicRooms"
import SingleRoom from "../SingleRoom/SingleRoom";
import UserRooms from "../UserRooms/UserRooms";
export default function Home() {

    return (
        <div className={styles.mainContainer}>

            <div className={styles.leftDiv}>
                <div className={styles.homeDiv}>
                    Home
                </div>
                <div className={styles.newRoomDiv}>
                    <NavLink className={styles.newRoom} to={`/newRoom`} >New Room</NavLink>
                </div>
                <div className={styles.publicRoomDiv}>
                    <NavLink className={styles.publicRoom} to={`/publicRoom`} >Public Rooms</NavLink>
                </div>
                <div className={styles.yourRoomDiv}>
                    <NavLink className={styles.yourRoom} to={`/userRoom`} >Your Rooms</NavLink>
                </div>

            </div>
            <div className={styles.centerDiv}>
                <Switch>
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
                </Switch>

            </div>
            

        </div>
    )
}