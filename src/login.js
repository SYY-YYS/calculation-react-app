import {React, useContext, useEffect, useState} from 'react';
import axios from 'axios';
import { redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { CommonContext, checkLoggedin } from './App';
import LoadingPage from './loading';
function LoginPage({backendUrl, loggedin, setloggedin}){

  useEffect(()=>{
    checkLoggedin(setloggedin, backendUrl)
  },[])
  

  const [username, setusername] = useState("")
  const [password, setpassword] = useState("")
  const [responseSentence, setresponseSentence] = useState("")
  const {loading, setloading} = useContext(CommonContext)


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
      } else {
        setresponseSentence("[" + res.data + "]")
      }
    }).catch((err) => {
        console.log(err)
        setresponseSentence("[Error, server not connected]")
    })
    setloading(false)
    return redirect('/')
  } 
  return(
    <>
      {loading && <LoadingPage text={'Loading...'}/>}
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
        <p style={{color: "white"}}>{responseSentence}</p>
      </div>}
      {!loggedin && 
      <Link to="/register">Register</Link>
      }
      {loggedin && <div>
        <h1>Welcome, you have logged in</h1>
        <Link to="/mathapp">Mathapp</Link>
        <Link to="/home">Home</Link>
        </div>}
    </>
  )
}

export default LoginPage;