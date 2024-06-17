import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';


import AlignHorizontalLeftIcon from '@mui/icons-material/AlignHorizontalLeft';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import FunctionsIcon from '@mui/icons-material/Functions';
import HomeIcon from '@mui/icons-material/Home';

import { useNavigate } from 'react-router-dom';


const actions = [
  { icon: <HomeIcon />, name: 'Home', link: '/home'},
  { icon: <FunctionsIcon />, name: 'MathApp', link:'/mathapp'},
  { icon: <LoginIcon />, name: 'Login', link:'/login'},
  { icon: <LogoutIcon />, name: 'Logout', link:'/login'},
  { icon: <AlignHorizontalLeftIcon />, name: 'UserProfile', link:'/userprofile'},
];

export default function BasicSpeedDial({loggedin}) {

    const navigate = useNavigate();

    function navigating(path){
        navigate(path)
    }
  return (
    <Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        {actions.filter((action) => {
            if (loggedin && action.name === "Login") {
                return false
            } else if (!loggedin && action.name === "Logout") {
                return false
            }else {
                return true
            }
        }).map((action)=>(
                <SpeedDialAction
                    key={action.name}
                    icon={action.icon}
                    tooltipTitle={action.name}
                    onClick={()=>navigating(action.link)}
                />
        ))}
      </SpeedDial>
    </Box>
  );
}
