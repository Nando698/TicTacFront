import "./Counter.css";
import { getSessionData } from "../../utils/utils.js";
import { useEffect, useState } from "react";
import {emit, on} from '../../utils/socket.js'


export default function Counter (props){
    

    
    const [sessionNames, setSessionNames] = useState("")
    
    useEffect(()=> {
        
        getSessionData(sessionStorage.getItem('sessionCode')).then(res => setSessionNames(res))
        
        
    },[])
    
    
    on('server:newPlayer', (session) => {
        setSessionNames(session)
    })


    return (
        <>
        
            <div id="counterScore">
                <div id="counterScore1"><p id="player1name">{sessionNames.playerOne ? (sessionNames.playerOne.name).toUpperCase() : "Esperando jugador"}</p><p id="player1score">{props.score?.p1}</p></div>
                <div id="counterScore2"><p id="player2name">{sessionNames.playerTwo ? (sessionNames.playerTwo.name).toUpperCase() : "Esperando jugador"}</p><p id="player2score">{props.score?.p2}</p></div>
            </div>
        
        </>
    )
}