import { NavLink, Route, Switch, useRouteMatch } from "react-router-dom"
import CreateRoom from "../CreateRoom/CreateRoom"
import styles from "../Home/Home.module.css"
import PublicRooms from "../PublicRooms/PublicRooms"
export default function Home() {

    let { path, url } = useRouteMatch();


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

            </div>
            <div className={styles.centerDiv}>
                <Switch>
                    <Route exact path="/newRoom">
                        <CreateRoom />
                    </Route>
                    <Route exact path="/publicRoom">
                        <PublicRooms />
                    </Route>
                </Switch>

            </div>
            <div className={styles.rightDiv}>
                <div className={styles.roomMembers}>
                    Room Members
                </div>
            </div>


        </div>
    )
}