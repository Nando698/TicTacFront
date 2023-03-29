import './tateti.css';
import Counter from '../Counter/Counter';
import { useEffect, useState } from 'react';
import { on, emit } from '../../utils/socket.js';
import { getSessionData, getUserID } from '../../utils/utils.js';


export default function Tateti () {
    
    const[sessionData, setSessionData] = useState()
    

    useEffect(()=> {
        
    
        getSessionData(sessionStorage.getItem('sessionCode')).then(resp => setSessionData(resp))
        

    },[])
    
    
    
    on('server:click', (data) => {
        setSessionData(data)
    })
    
    on('update', (data) => {
        setSessionData(data)
    })

    on('tie', () => {
        efecto()
    })
    
    on('p1win', () => {
        efecto('cruz')
    })
    on('p2win', () => {
        efecto('circulo')
    })


    const efecto = (clase) => {
        const squares = document.querySelectorAll(`.${clase}`)
        
        const board = document.querySelector('.tateti-board')

        board.classList = 'tateti-board noClick'

        squares.forEach(element => {
        element.classList = `${clase} ${clase}Win` })

        setTimeout(() => {
        window.location.reload()
        squares.classList = `${clase}`
        board.classList.remove = ('noClick')
        }, 3000);
    }


    
    const tateClick =  (e) => {
        let p1 = getUserID() == sessionData.playerOne.uid
        
     

        if(sessionData.turn == p1){

            setSessionData({...sessionData, classes: {...sessionData.classes, [e.target.id]: p1 ? 'cruz' : 'circulo' } })
            emit('client:clicked', {user: getUserID(), code: sessionData.code, clicked: e.target.id })
        }else{
            
            alert('no es tu turno')
        }
        
        
    }
    
    
   
    
    
    return(
        
        
        
        
        <>
        <div className='tateti-container'>
            <div className='tateti-board'>
                <div id='casillero1' className={sessionData?.classes.casillero1} onClick={tateClick} ></div>
                <div id='casillero2' className={sessionData?.classes.casillero2} onClick={tateClick}></div>
                <div id='casillero3' className={sessionData?.classes.casillero3} onClick={tateClick}></div>
                <div id='casillero4' className={sessionData?.classes.casillero4} onClick={tateClick}></div>
                <div id='casillero5' className={sessionData?.classes.casillero5} onClick={tateClick}></div>
                <div id='casillero6' className={sessionData?.classes.casillero6} onClick={tateClick}></div>
                <div id='casillero7' className={sessionData?.classes.casillero7} onClick={tateClick}></div>
                <div id='casillero8' className={sessionData?.classes.casillero8} onClick={tateClick}></div>
                <div id='casillero9' className={sessionData?.classes.casillero9} onClick={tateClick}></div>
            </div>
        <Counter score={sessionData?.score} />
        </div>
        </>
       
    );
}


