import { useEffect } from "react";
import {  useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useHistory} from "react-router-dom";
import { createGameThunk, getGamesByRoomID } from "../../store/rooms";
import styles from "../SingleRoom/SingleRoom.module.css"


export default function CreateGame({room}) {

    const dispatch = useDispatch();
    const history = useHistory();
    const [name, setName] = useState("")
    const [error,setError] = useState([])
    const roomMembers = useSelector(state => state.rooms.currentRoomMembers);
    const user = useSelector(state => state.session.user);

    const [showCreateButton, setShowCreateButton] = useState(false) 

    useEffect(()=>{
        if(user && roomMembers ){
            const thisMember = roomMembers.find(m => m.user.id === user.id)
            
            if(thisMember && thisMember.status === "member"){
                setShowCreateButton(true);
            }else{
                setShowCreateButton(false);
            }
        }
    },[roomMembers, user])

    function handleCreateGame(e) {
        e.preventDefault();
        setError("")

        if(name.length > 50) {
            setError("Name should be less than 50 characters")
        }
        if(name.length < 4){
            setError("Name should be more than 4 characters")
        }
        if (error.length === 0){
            dispatch(createGameThunk(room.id,name))
            .then((res) => {
                dispatch(getGamesByRoomID(room.id));
                // history.push(`/rooms/${room.id}/view`)
            })
            .catch(async res => {
                if(res.status && res.status === 400){
                    const body = await res.json();
                    setError(body.errors);
                }
                
            });
        }
        

    }
    if (!room) return null;

    return room && (
        <div>
            <div className={styles.errorMessage}>
              {error.length >0 && ( error)}                
            </div>
            <form onSubmit={()=>handleCreateGame}>
                <input placeholder="Game Name" value={name} onChange={(e)=>setName(e.target.value)} className={styles.gameInput}></input>   
                <button type="submit" disabled={!showCreateButton} className={showCreateButton?styles.createGameButton:styles.disabledCreateGameButton} onClick={handleCreateGame}> Create</button>
            </form>
            
        </div>
    )
}