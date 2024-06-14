import React from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from './logout';

import { checkLoggedin } from './App';

function Home({backendUrl, loggedin, setloggedin}) {

  checkLoggedin(setloggedin, backendUrl)
  
  return(
    <>
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
            <li>
                <Link to="/userprofile">UserProfile</Link>
            </li>
        </ul>
    </>
  );
}

export default Home;