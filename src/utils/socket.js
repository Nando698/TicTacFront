import { getUserID } from './utils'
import {io} from 'socket.io-client'



const socket = io(`${process.env.REACT_APP_BASE_URL}`,{

extraHeaders: {
    
    "userID": getUserID()
  }
})

const emit = (event, data) => {
    socket.emit(event, data)
}

const on = (event, data) => {
    socket.on(event, data)
}





export {
    emit,
    on
}