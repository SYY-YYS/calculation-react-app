import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from './logout';

import { checkLoggedin, CommonContext } from './App';

import BasicSpeedDial from './nav';

function Home({backendUrl, loggedin, setloggedin}) {

  const {loading, setloading} = useContext(CommonContext)

  checkLoggedin(setloading, setloggedin, backendUrl)
  
  return(
    <>
        {loading && <LoadingPage text={'Loading...'}/>}
        <h1 style={{display: 'flex'}}>
          Home Page
        {loggedin && <LogoutButton backendUrl={backendUrl} setloggedin={setloggedin}/>}
        {!loggedin && <button>
            <Link to="/login">Login</Link>
        </button>}
        </h1>
        <ul>
            <li>
                <Link to="/mathapp">Mathapp</Link>
            </li>
            {loggedin && <li>
                <Link to="/userprofile">UserProfile</Link>
            </li>}
        </ul>
        <BasicSpeedDial loggedin={loggedin}/>
    </>
  );
}

export default Home;