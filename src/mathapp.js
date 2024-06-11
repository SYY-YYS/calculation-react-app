import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import LogoutButton from './logout';

function Mathapp({loggedin, setloggedin}) {

    async function sendData() {
        await axios.get('http://localhost:8030/dataOperation', {withCredentials: true})
        .then(function(res) {
            console.log(res)
        }).catch((err) => {
            console.log(err)
        })
    };

    
    return (

        <div className="App">
            <div id='test'>
            <button onClick={sendData}>
                submit
            </button>
            {loggedin && <LogoutButton setloggedin={setloggedin}/>}
            {!loggedin && <button>
                <Link to="/login">Login</Link>
            </button>}
            </div>
            {/* <i className='fa fa-bars'></i> */}
            <div className='turn-abacus'>
            <h1>
                inline / abacus mode
                </h1>
                <div className='turning-location'>
                {/* <div className='turning-btn' onClick={abacusMode}></div> */}
                
                </div>
            </div>

        </div>
    )}


export default Mathapp;