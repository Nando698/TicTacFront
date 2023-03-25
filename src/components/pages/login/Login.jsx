import "./Login.css";
import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import SelectSession from "../../SelectSession/SelectSession";
import {
  randomCode,
  getSessionData,
  userID,
  getUserID,
} from "../../../utils/utils";
import { emit, on } from "../../../utils/socket.js";
import { useEffect } from "react";


const buttonStyle = { backgroundColor: "black" };
const styles = {  margin: "10px 0 10px 0", boxShadow: 3 };





export default function Login() {

  useEffect(() => {

    emit('client:connected', { uid: getUserID()})

  })

  const [nameFIeld, setNameField] = React.useState("");
  const [selectedSession, setSelectedSession] = React.useState("");

  



  const callBack = (childData) => {
    setSelectedSession(childData);
  };

  const createSession = async () => {
    if (!nameFIeld) {
      return alert("Debes escribir un nombre");
    }

    let sessionCode = randomCode();
    sessionStorage.setItem("sessionCode", sessionCode);

    console.log(getUserID());

    emit("client:created", {
      name: nameFIeld,
      code: sessionCode,
      uid: getUserID(),
    });
    window.location.href = "./main";
  };

  const joinSession = async (code) => {
    if (!nameFIeld) {
      return alert("Debes escribir un nombre");
    }

    let session = await getSessionData(code);

    if (!session.respuesta) {
      if (session.playerTwo) {
        alert("Esa sesion esta llena");
      } else {
        sessionStorage.setItem("sessionCode", selectedSession);
        emit("client:connectedPlayer2", {
          name: nameFIeld,
          code: selectedSession,
          uid: getUserID(),
        });
        window.location.href = "./main";
      }
    } else {
      alert("No existe esa sesion");
    }
  };

  return (
    <>
      <div className="logForm">
        <div className="joinForm">
          
            <h2>Unirse a partida</h2>
            <TextField
              label="Nombre"
              inputProps={{ maxLength: 10, style:{color:'white', paddingLeft:'50px', width:'100%'} }}
              sx={styles}
              onChange={(newValue) => setNameField(newValue.target.value)}
              
            />
            <SelectSession handleCallBack={callBack} />
            <Button
              variant="contained"
              sx={buttonStyle}
              onClick={() => joinSession(selectedSession)}
            >
              Unirse
            </Button>
          
        </div>

        <div className="hostForm">
          
            <h2>Crear partida</h2>
            <TextField
              label="Nombre"
              inputProps={{ maxLength: 10, style:{color:'white', paddingLeft:'50px', width:'100%' }}}
              sx={styles}
              onChange={(newValue) => setNameField(newValue.target.value)}
            />
            <Button
              variant="contained"
              sx={buttonStyle}
              onClick={createSession}
            >
              Crear
            </Button>
          
        </div>
      </div>
    </>
  );
}
