import React from 'react';


function LoginPage () {
  

  
    return(
      <>
      <h1>Login Page</h1>
      <form action='http://localhost:8030/login' method='post'>
        <div className='input-group'>
          <label>Username:
            <input type='text' name='username'></input>
          </label>
          <br></br>
          <label>Password:
            <input type='password' name='password'></input>
          </label>
          <br></br>
          <input type='submit' value={"Submit"}></input>
        </div>
      </form>
      </>
    );
  
}

export default LoginPage;