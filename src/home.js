import React from 'react';
import { Link } from 'react-router-dom';

function Home() {

  return(
    <>
        <h1>Home Page</h1>
        <br></br>
        <ul>
            <li>
                {/* Endpoint to route to Home component */}
                <Link to="/login">Login</Link>
            </li>
            <li>
                {/* Endpoint to route to About component */}
                <Link to="/mathapp">Mathapp</Link>
            </li>
        </ul>
    </>
  );
}

export default Home;