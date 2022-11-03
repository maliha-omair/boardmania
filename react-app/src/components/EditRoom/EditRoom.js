import { useEffect } from "react";
import { useState } from "react"
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {  editRoomThunk } from "../../store/rooms";
import styles from "../EditRoom/EditRoom.module.css"

export default function EditRoom({room}) {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [isPublic, setIsPublic] = useState(true);
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();
    const history = useHistory();    
    const rooms = useSelector(state => state.rooms && state.rooms.userRooms);
    const { roomId } = useParams();
    const editRoom = rooms.find(room => room.id==roomId);

    useEffect(()=>{
        if(editRoom){
            setTitle(editRoom.title);
            setIsPublic(editRoom.isPublic)
            setDesc(editRoom.description)
        }     
    },[editRoom])

    function handleSubmit(e) {
        e.preventDefault();
        const room = {
            title: title,
            description: desc,
            isPublic: true
        }

        setErrors([]);
        let validations = [];
        if (title.length < 4){
            validations.push("Title length should be atleast 4 character")
        }
        if (desc.length < 10){
            validations.push("Description length should be atleast 10 character")
        }
        if(validations && validations.length > 0) {
            setErrors(validations)
            return
        }
        return dispatch(editRoomThunk(roomId,room))
            .then((res) => {

                history.push(`/userRoom`)
            })
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    setErrors(Object.values(data.errors))
                    return
                }
            });

    }
    return (
        <div className={styles.mainDiv}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.errorMessage}>
                    {errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
                </div>
                <div>
                    <input type="text" placeholder="title" className={styles.input} value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div>
                    <input type="text" placeholder="description" className={styles.input} value={desc} onChange={(e) => setDesc(e.target.value)} />
                </div>
                {/* <div>
                    <input type="checkbox" className={styles.inputPrivate} checked={isPublic} onChange={(e) => setIsPublic(!isPublic)} ></input>
                    <label className={styles.label}>Private</label>
                </div> */}
                <div>
                    <button className={styles.button}>Submit</button>
                </div>
            </form>
        </div>
    )
}