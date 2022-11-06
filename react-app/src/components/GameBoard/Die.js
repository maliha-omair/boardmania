import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDice, faDiceOne, faDiceTwo, faDiceThree, faDiceFour, faDiceFive, faDiceSix } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react';


export default function Die({face}) {
    const icons = [faDice, faDiceOne, faDiceTwo, faDiceThree, faDiceFour, faDiceFive, faDiceSix];
    
    const [shake, setShake] = useState(false);
    const [tempFace, setTempFace] = useState(face);

    useEffect(()=>{
        if(face !== 0){
            let intervalId = setInterval(()=>{
                setShake(true);
                setTempFace(Math.floor(Math.random() * 6)+1);
            },100);
            setTimeout(()=> {
                clearInterval(intervalId)
                setShake(false);
            }, 2000);

            return () => clearInterval(intervalId);
        }
    },[])

    return shake && 
            <FontAwesomeIcon icon={icons[tempFace]}  /> 
            || <FontAwesomeIcon icon={icons[face]}  /> 
        
        
}