import {  useState } from "react";
import { useDispatch } from "react-redux";

import { useHistory} from "react-router-dom";
import { createGameThunk } from "../../store/rooms";
import styles from "../SingleRoom/SingleRoom.module.css"


export default function CreateGame({room}) {

    const dispatch = useDispatch();
    const history = useHistory();
    const [name, setName] = useState("")
    const [error,setError] = useState([])
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
                history.push(`/rooms/${room.id}/games/${res.id}`)
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
                <button type="submit" className={styles.createGameButton} onClick={handleCreateGame}> Create</button>
            </form>
            
        </div>
    )
}