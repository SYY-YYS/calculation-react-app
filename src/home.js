import React from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from './logout';

function Home({loggedin, setloggedin}) {

  
  return(
    <>
        <h1>
          Home Page
        {loggedin && <LogoutButton/>}
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

export default Home;