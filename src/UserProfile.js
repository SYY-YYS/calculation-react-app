import {React, useEffect, useState, useContext} from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from './logout';

import { checkLoggedin, CommonContext } from './App';
import axios from 'axios';

import LoadingPage from './loading';

import BasicSpeedDial from './nav';
// import { BSON } from 'bson';
// import cloneDeepWith from 'lodash.clonedeepwith';

function UserProfile({backendUrl, loggedin, setloggedin}) {

  

  const [username, setusername] = useState('');
  const [minTime, setminTime] = useState('');
  const [averagetime, setaveragetime] = useState('');
  const [totaltrialnumber, settotaltrialnumber] = useState('');

  const {loading, setloading} = useContext(CommonContext)

  useEffect(()=>{
    checkLoggedin(setloading, setloggedin, backendUrl)
    async function fetchData(){
        setloading(true)
        await axios.get(backendUrl + '/userProfile',{ 
            withCredentials: true,
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                'Access-Control-Allow-Origin': backendUrl
              }
        })
        .then((res)=> {
            console.log(res.status, res.data)
            if (res.data) {
                // const step1 = res.date.toJSON({flattenDecimals: true})

                // console.log(res.data.username, res.data.mintime, res.data)
                // const data = JSON.stringify(res.data)
                // console.log(data)
                setusername(res.data.username)
                setminTime(res.data.mintime)
                setaveragetime(res.data.averagetime)
                settotaltrialnumber(res.data.totaltrialnumber)
            }     
        }).catch((err)=>{
            console.log(err)
        }) 
        setloading(false)
    };
    if (loggedin){
        fetchData();
    }
  },[])
    

  
  
  return(
    <>
        {loading && <LoadingPage text={'Loading...'}/>}
        <h1 style={{display: 'flex'}}>
        User Profile ({username}):
        {/* {loggedin && <LogoutButton backendUrl={backendUrl} setloggedin={setloggedin}/>} */}
        {!loggedin && <button>
            <Link to="/login">Login</Link>
        </button>}
        </h1>

        {loggedin && <ul>
            <li>Minimum time per each calculation: {minTime} s</li>
            <li>Average time per each calculation: {averagetime} s</li>
            <li>Game Played Total: {totaltrialnumber}</li>
            <li>
                Continue practicing: 
                <Link to="/mathapp">Mathapp</Link>
            </li>
        </ul>} 
        {/* {!loggedin &&<Link to="/mathapp">Mathapp</Link>}
        <Link to="/home">Home</Link> */}
        <BasicSpeedDial setloading={setloading} backendUrl={backendUrl} setloggedin={setloggedin} loggedin={loggedin}/>
    </>
  );
}

export default UserProfile;