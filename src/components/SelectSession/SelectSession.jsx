import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useEffect, useState } from 'react';
import { getAllSessions } from '../../utils/utils.js';

function SelectSession(props) {
    
    const [allSessions, setAllSessions] = useState([])
    
    
    const handleChange = (e) => {
        props.handleCallBack(e.target.value)
        
    }
    
    
    
    useEffect(()=> {

        getAllSessions().then(res => setAllSessions(res))

    }, [allSessions])
    
    return (
        <>
<Box sx={{ width:'100%' }}>
      <FormControl fullWidth>
        <InputLabel id="sessionSelector">Elige una sesion</InputLabel>
        <Select labelId="sessionSelector" id="sessionSelector" defaultValue={''} label="Elige una sesion" placeholder='lala' onChange={handleChange} sx={{boxShadow: 3, width:'100%'}}>
        {
            allSessions?.map( session =>{
                 
                return(
                 <MenuItem key={session.code} value={session.code}>{`${session.playerOne.name}  ${session.playerTwo ? '(2/2)' : '(1/2)'}`}</MenuItem> 
                )
            })
        }

         

        </Select>
      </FormControl>
    </Box>       
        
        
        </>
    );
}

export default SelectSession;