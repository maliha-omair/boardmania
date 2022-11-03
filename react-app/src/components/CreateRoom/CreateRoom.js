import { useState } from "react"
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createNewRoomThunk } from "../../store/rooms";
import styles from "../CreateRoom/CreateRoom.module.css"

export default function CreateRoom() {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [isPublic, setIsPublic] = useState(true);
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();
    const history = useHistory();
    function handleSubmit(e) {
        e.preventDefault();

        const room = {
            title: title,
            description: desc,
            isPublic: isPublic
        }

        setErrors([]);
        let validations = [];
        if (title.length < 4 || title.length > 100) {
            validations.push("Title: Title needs to be between 4 and 100 characters")
        }
        if (desc.length < 10 || desc.length > 500) {
            validations.push("Description: Description needs to be between 10 and 500 characters")
        }


        if (validations && validations.length > 0) {
            setErrors(validations)
            return
        }
        if (errors.length === 0) {
            dispatch(createNewRoomThunk(room))
            .then((res) => {
                    console.log(res, "create res is")
                    history.push(`/userRoom`)
                })
                .catch(async (res) => {
                    if (res.status && res.status === 400) {
                        const body = await res.json();
                        for(let i in body.errors){
                            validations.push(body.errors[i])
                        }
                        setErrors(body.errors);
                    }
                });
        }
    }
    return (
        <div className={styles.mainDiv}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.errorMessage}>
                    {Object.values(errors).map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
                </div>
                <div>
                    <input type="text" placeholder="Title" className={styles.input} value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div>
                    <input type="text" placeholder="Description" className={styles.input} value={desc} onChange={(e) => setDesc(e.target.value)} />
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