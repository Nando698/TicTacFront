import './app.css';
import Main from './components/pages/Main/Main';
import Login from './components/pages/login/Login';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { userID, getUserID } from './utils/utils.js';
import { emit, on } from './utils/socket.js';
import { useEffect } from 'react';



function App() {

  useEffect(()=> {

    userID()
    
    
  })
  
  on('refresh',()=> window.location.reload())
  

return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/main" element={<Main />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
