import {React, useState, useEffect, useContext} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { checkLoggedin, CommonContext } from './App';

import LoadingPage from './loading';

import BasicSpeedDial from './nav';

import googleLogo from "./images/google-logo.png"

function RegisterPage({backendUrl, loggedin, setloggedin}){

  

  const navigate = useNavigate();

  const [username, setusername] = useState("")
  const [email, setemail] = useState('')
  const [password, setpassword] = useState("") 
  const [passwordCheck, setpasswordCheck] = useState('')
  const {loading, setloading} = useContext(CommonContext)


  useEffect(()=>{
    checkLoggedin(setloading, setloggedin, backendUrl)
  },[])

  const googleAuth = () => {
    window.open(
      `${backendUrl}/login/google`,
      "_self"
    );
  };

  async function submitForm(event) {
    event.preventDefault();
    console.log(username, email, password)
    const userData = {username:username, email: email, password: password};
    await axios.post(backendUrl + '/register', userData, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    .then(function(res) {
      console.log(res.status,res.data)

      if(res.data === 'username was taken!') {
        setpasswordCheck('username was taken!')
      } else if (res.data === 'registered!') {
        navigate('/login')
      } else if (res.data === 'email was taken!'){
        setpasswordCheck('email was taken!')
      }
    }).catch((err) => {
        console.log(err)
    })

    
  } 

  function checkpassword(secondpassword) {
    if (password === secondpassword) {
        setpasswordCheck("matched!")
    } else {
        setpasswordCheck('not match!')
    }
  }

  return(
    <>
      {loading && <LoadingPage text={'Loading...'}/>}
      {!loggedin &&<div>
        <h1>Register Page</h1>
        <form onSubmit={submitForm}>
          <div className='register-input'>
            <label>Username:
              <input required type='text' name='username' onChange={e => {setusername(e.target.value)}}></input>
            </label>
            <br></br>
            <label>Email:
              <input required type='email' name='email' onChange={e => {setemail(e.target.value)}}></input>
            </label>
            <br></br>
            <label>Set password:
              <input required type='password' name='password' onChange={e => {setpassword(e.target.value)}}></input>
            </label>
            <br></br>
            <label>Confirm password:
              <input required type='password' name='password' onChange={e => {checkpassword(e.target.value)}}></input>
              <p>{passwordCheck}</p>
            </label>
            <input className='submitBtn' type='submit' value="Submit"></input>
            <button className='google-login' onClick={googleAuth} style={{
              display: "flex",
              alignItems: "center",
              marginTop: "5px" 
            }}>
              <img src={googleLogo} style={{height: "18px"}}></img>
              <span>Sign up with Google</span>
            </button>
          </div>
        </form>
      </div>}
      {loggedin&& <div>
        <h1>You have logged in, you may log out for registering a new account</h1>
        {/* <Link to="/home">Home</Link> */}
        </div>}
        <BasicSpeedDial setloading={setloading} backendUrl={backendUrl} setloggedin={setloggedin} loggedin={loggedin}/>
    </>
  )
}

export default RegisterPage;