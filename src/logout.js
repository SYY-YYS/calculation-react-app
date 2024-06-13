import React from 'react';
import axios from 'axios';


function LogoutButton ({setloggedin}) {
    
    async function logout() {
        await axios.post("http://localhost:8030/logout",{}, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              }
        })
        .then(function(res) {
            console.log(res.status, res.data)

            if(res.data === 'loggedout') {
                setloggedin(false)
            }
        }).catch((err) => {
            console.log(err)
        })
    }
  
    return(
        
        <button id='logoutbtn' onClick={logout}>
            Logout
        </button>
        
    )}
export default LogoutButton;