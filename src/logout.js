import React from 'react';
import axios from 'axios';



export default async function Logout(setloading, backendUrl, setloggedin) {
    setloading(true)
    // destroy the jwt (httpOnly cookie cant be destroyed)
    localStorage.clear();

    console.log(document.cookie)

    await axios.post(backendUrl + "/logout",{}, {
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
    setloading(false)
}

// function LogoutButton ({backendUrl, setloggedin}) {
    
    
  
    // return(
        
    //     <button id='logoutbtn' onClick={logout}>
    //         Logout
    //     </button>
        
    // )
// }
// export default LogoutButton;