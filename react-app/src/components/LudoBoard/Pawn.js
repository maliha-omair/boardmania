import styles from "../LudoBoard/LudoBoard.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faChessPawn, faCircle} from '@fortawesome/free-solid-svg-icons'

export default function Pawn({s,x,y, playable, shake, currentPlayer, onPawnClick}) {

    const redPawnCount = [...s].reduce((count, char) => char === "R"?count+1:count,0);
    const greenPawnCount = [...s].reduce((count, char) => char === "G"?count+1:count,0);
    const yellowPawnCount = [...s].reduce((count, char) => char === "Y"?count+1:count,0);
    const bluePawnCount = [...s].reduce((count, char) => char === "B"?count+1:count,0);


    function handleClick(){
        onPawnClick(x,y);
    }

    return (
        <>
            {    
                (redPawnCount > 0)  && 
                (
                    <div className={styles.redPawn}>
                        {s && (
                        <span class="fa-layers fa-lg fa-fw">
                            {playable && 
                                <div onClick={handleClick} className={styles.legalPawn}>
                                    <FontAwesomeIcon icon={faCircle} beat={shake && currentPlayer === "R"}/>
                                    <span className="fa-layers-text fa-inverse">{redPawnCount}</span>
                                </div>
                            || 
                                <div>
                                    <FontAwesomeIcon icon={faCircle} />
                                    <span className="fa-layers-text fa-inverse">{redPawnCount}</span>
                                </div>
                            }
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
                            {playable && 
                                <div onClick={handleClick} className={styles.legalPawn}>
                                    <FontAwesomeIcon icon={faCircle} beat={shake && currentPlayer === "G"}/>
                                    <span className="fa-layers-text fa-inverse">{greenPawnCount}</span>
                                </div>
                                ||  
                                <div>
                                    <FontAwesomeIcon icon={faCircle} />
                                    <span className="fa-layers-text fa-inverse">{greenPawnCount}</span>
                                </div>
                            }
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
                            {playable && 
                                <div onClick={handleClick} className={styles.legalPawn}>
                                    <FontAwesomeIcon icon={faCircle}   beat={shake && currentPlayer === "Y"} />
                                    <span className="fa-layers-text fa-inverse">{yellowPawnCount}</span>
                                </div>
                            || 
                                <div>
                                    <FontAwesomeIcon icon={faCircle}  />
                                    <span className="fa-layers-text fa-inverse">{yellowPawnCount}</span>
                                </div>
                            }
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
                            {playable && 
                                <div onClick={handleClick} className={styles.legalPawn}> 
                                    <FontAwesomeIcon icon={faCircle}  beat={shake && currentPlayer === "B"}/>
                                    <span className="fa-layers-text fa-inverse">{bluePawnCount}</span>
                                </div>
                            || 
                                <div>
                                    <FontAwesomeIcon icon={faCircle} />
                                    <span className="fa-layers-text fa-inverse">{bluePawnCount}</span>
                                </div>}
                        </span> 
                        )}
                    </div>
                )
            }
        </>
        
   )
}


