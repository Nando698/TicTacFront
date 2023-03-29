



const randomCode = () => {
    return Math.random().toString(36).slice(2)
}


const getSessionData =  async (code) => {
    let resp = await fetch(`${process.env.REACT_APP_BASE_URL}/${code}`)
    let respuesta = await resp.json()
    
    return respuesta
    
}

const getAllSessions = async() => {
    let resp = await fetch(`${process.env.REACT_APP_BASE_URL}/sessions/all`)
    let respuesta = await resp.json()
    return respuesta
}

const userID = () => {
    if(!sessionStorage.getItem('userID')){
        sessionStorage.setItem('userID', randomCode())
    }
}

const getUserID = () => {
   return sessionStorage.getItem('userID')
}



export {
    randomCode,
    getSessionData,
    userID,
    getUserID,
    getAllSessions
}