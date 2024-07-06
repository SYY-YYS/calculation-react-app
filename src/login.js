import {React, useContext, useEffect, useState} from 'react';
import axios from 'axios';
import { redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { CommonContext, checkLoggedin } from './App';
import LoadingPage from './loading';

import BasicSpeedDial from './nav';

import googleLogo from "./images/google-logo.png"

function LoginPage({backendUrl, loggedin, setloggedin}){

  
  

  const [username, setusername] = useState("")
  const [password, setpassword] = useState("")
  const [responseSentence, setresponseSentence] = useState("")
  const {loading, setloading} = useContext(CommonContext)

  useEffect(()=>{
    checkLoggedin(setloading,setloggedin, backendUrl)
  },[])

  const googleAuth = () => {
    window.open(
      `${backendUrl}/login/google`,
      "_self"
    );
  };

  async function submitForm(event) {
    event.preventDefault();

    setloading(true)

    console.log(username, password)
    const userData = {username:username, password: password};
    await axios.post(backendUrl + '/login', userData, {
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
      } else if (res.status === 403 ) {
        setresponseSentence("[" + res.data + "]")
      } else {
        localStorage.setItem("token", res.data)
        setloggedin(true); //wont refresh after login lol (prob becoz preventDefault)
      }
    }).catch((err) => {
        console.log(err)
        setresponseSentence("[Error, server not connected]")
    })
    setloading(false)
  } 
  return(
    <>
      {loading && <LoadingPage text={'Loading...'}/>}
      {!loggedin &&<div>
        <h1>Login Page</h1>
        <form onSubmit={submitForm}>
          <div className='login-input'>
            <label>Username:
              <input required type='text' name='username' onChange={e => {setusername(e.target.value)}}></input>
            </label>
            <br></br>
            <label>Password:
              <input required type='password' name='password' onChange={e => {setpassword(e.target.value)}}></input>
            </label>
            <br></br>
            <input className='submitBtn' type='submit' value="Submit"></input>
          </div>
        </form>
        <p style={{color: "white"}}>{responseSentence}</p>
        <button className='google-login' onClick={googleAuth} style={{
          display: "flex",
          alignItems: "center",
          marginTop: "5px" 
        }}>
          <img src={googleLogo} style={{height: "18px"}}></img>
          <span>Sign in with Google</span>
        </button>
      </div>}
      {!loggedin && 
      <Link to="/register">Register</Link>
      }
      {loggedin && <div>
        <h1>Welcome, you have logged in</h1>
        {/* <Link to="/mathapp">Mathapp</Link>
        <Link to="/home">Home</Link> */}
        </div>}
        <BasicSpeedDial setloading={setloading} backendUrl={backendUrl} setloggedin={setloggedin} loggedin={loggedin}/>
    </>
  )
}

export default LoginPage;