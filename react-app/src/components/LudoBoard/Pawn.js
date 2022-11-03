import styles from "../LudoBoard/LudoBoard.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faChessPawn, faCircle} from '@fortawesome/free-solid-svg-icons'

export default function Pawn({s}) {

    const redPawnCount = [...s].reduce((count, char) => char === "R"?count+1:count,0);
    const greenPawnCount = [...s].reduce((count, char) => char === "G"?count+1:count,0);
    const yellowPawnCount = [...s].reduce((count, char) => char === "Y"?count+1:count,0);
    const bluePawnCount = [...s].reduce((count, char) => char === "B"?count+1:count,0);

    return (
        <>
            {    
                (redPawnCount > 0)  && 
                (
                    <div className={styles.redPawn}>
                        {s && (
                        <span class="fa-layers fa-lg fa-fw">
                            <FontAwesomeIcon icon={faCircle} />
                            <span className="fa-layers-text fa-inverse" transform="right-2" >{redPawnCount}</span>
                        </span> 
                        )}
                    </div>
                )
            }
            {    
                (greenPawnCount > 0)  && 
                (
                    <div className={styles.greenPawn}>
                        {s && (
                        <span class="fa-layers fa-lg fa-fw">
                            <FontAwesomeIcon icon={faCircle} />
                            <span className="fa-layers-text fa-inverse" >{greenPawnCount}</span>
                        </span> 
                        )}
                    </div>
                )
            }
            {    
                (yellowPawnCount > 0)  && 
                (
                    <div className={styles.yellowPawn}>
                        {s && (
                        <span class="fa-layers fa-lg fa-fw">
                            <FontAwesomeIcon icon={faCircle} />
                            <span className="fa-layers-text fa-inverse" >{yellowPawnCount}</span>
                        </span> 
                        )}
                    </div>
                )
            }
            {    
                (bluePawnCount > 0)  && 
                (
                    <div className={styles.bluePawn}>
                        {s && (
                        <span class="fa-layers fa-lg fa-fw">
                            <FontAwesomeIcon icon={faCircle} />
                            <span className="fa-layers-text fa-inverse" >{bluePawnCount}</span>
                        </span> 
                        )}
                    </div>
                )
            }
        </>
        
   )
}


const greenPath = [
    {x:6, y:1},
    {x:6, y:2},
    {x:6, y:3},
    {x:6, y:4},
    {x:6, y:5},
    {x:5, y:6},
    {x:4, y:6},
    {x:3, y:6},
    {x:2, y:6},
    {x:1, y:6},
    {x:0, y:6},
    {x:0, y:7},
    {x:0, y:8},
    {x:1, y:8},
    {x:2, y:8},
    {x:3, y:8},
    {x:4, y:8},
    {x:5, y:8},
    {x:6, y:9},
    {x:6, y:10},
    {x:6, y:11},
    {x:6, y:12},
    {x:6, y:13},
    {x:6, y:14},
    {x:7, y:14},
    {x:8, y:14},
    {x:8, y:13},
    {x:8, y:12},
    {x:8, y:11},
    {x:8, y:10},
    {x:8, y:9},
    {x:9, y:8},
    {x:10, y:8},
    {x:11, y:8},
    {x:12, y:8},
    {x:13, y:8},
    {x:14, y:8},
    {x:14, y:7},
    {x:14, y:6},
    {x:13, y:6},
    {x:12, y:6},
    {x:11, y:6},
    {x:10, y:6},
    {x:9, y:6},
    {x:8, y:5},
    {x:8, y:4},
    {x:8, y:3},
    {x:8, y:2},
    {x:8, y:1},
    {x:8, y:0},
    {x:7, y:0},
    {x:7, y:1},
    {x:7, y:2},
    {x:7, y:3},
    {x:7, y:4},
    {x:7, y:5},
]