import React from 'react';
import axios from 'axios';

function Mathapp() {

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