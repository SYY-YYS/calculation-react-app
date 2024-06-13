import React from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from './logout';

import { checkLoggedin } from './App';

function UserProfile({loggedin, setloggedin}) {

  checkLoggedin(setloggedin)
  
  return(
    <>
        <h1 style={{display: 'flex'}}>
        User Profile:
        {loggedin && <LogoutButton setloggedin={setloggedin}/>}
        {!loggedin && <button>
            <Link to="/login">Login</Link>
        </button>}
        </h1>
        <ul>
            <li>
                <Link to="/mathapp">Mathapp</Link>
            </li>
        </ul>
    </>
  );
}

export default UserProfile;