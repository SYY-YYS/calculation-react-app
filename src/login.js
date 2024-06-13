import {React, useState} from 'react';
import axios from 'axios';
import { redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { checkLoggedin } from './App';

function LoginPage({loggedin, setloggedin}){

  checkLoggedin(setloggedin)

  const [username, setusername] = useState("")
  const [password, setpassword] = useState("") 


  async function submitForm(event) {
    event.preventDefault();
    console.log(username, password)
    const userData = {username:username, password: password};
    await axios.post('http://localhost:8030/login', userData, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    .then(function(res) {
      console.log(res.status,res.data)

      if(res.data === 'loggedin') {
        console.log('loggedin')
        setloggedin(true);
        
      }
    }).catch((err) => {
        console.log(err)
    })

    return redirect('/')
  } 
  return(
    <>
      {!loggedin &&<div>
        <h1>Login Page</h1>
        <form onSubmit={submitForm}>
          <div className='input-group'>
            <label>Username:
              <input required type='text' name='username' onChange={e => {setusername(e.target.value)}}></input>
            </label>
            <br></br>
            <label>Password:
              <input required type='password' name='password' onChange={e => {setpassword(e.target.value)}}></input>
            </label>
            <br></br>
            <input type='submit' value="Submit"></input>
          </div>
        </form>
      </div>}
      {loggedin}
      {loggedin && <div>
        <h1>Welcome, you have logged in</h1>
        <Link to="/mathapp">Mathapp</Link>
        <Link to="/home">Home</Link>
        </div>}
    </>
  )
}

export default LoginPage;