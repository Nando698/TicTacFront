import "./Main.css";
import Tateti from "../../Tateti/Tateti";
import { useEffect, useState } from "react";
import { getSessionData } from "../../../utils/utils.js";
import { Alert } from "@mui/material";
import { Link } from "react-router-dom"

export default function Main () {

    const [data, setData] = useState()

    useEffect(()=> {
        
        getSessionData(sessionStorage.getItem('sessionCode')).then(resp => setData(resp))
        
    },[])


    return (
        <div className="mainContainer">
            
            {
            data?.respuesta ? (<Alert severity="error">La sesion ha expirado, <Link to='/'>vuelva a la pantalla de inicio</Link> </Alert>) : (<Tateti />)
            }
        </div>
    )


}