import {React, useState} from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import LoginPage from './login';
import Mathapp from './mathapp';
import Home from './home';
import RegisterPage from './register';
import axios from 'axios';




export async function checkLoggedin(setloggedin) {
  await axios.get('http://localhost:8030/login',{withCredentials: true})
  .then((res)=> {
    console.log(res.status, res.data)
    if (res.data) {
      setloggedin(true);
    } else {
      setloggedin(false);
    }
    
  }).catch((err)=>{
    // if(err) throw err
    setloggedin(false);
  }) 
}

function App() {
  // let loggedin = true;

  const [loggedin, setloggedin] = useState(false);
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home loggedin={loggedin} setloggedin={setloggedin}/>}></Route>
          <Route exact path='/login' element={<LoginPage loggedin={loggedin} setloggedin={setloggedin}/>}></Route>
          <Route path='/mathapp' element={<Mathapp loggedin={loggedin} setloggedin={setloggedin}/>}></Route>
          <Route path='/register' element={<RegisterPage loggedin={loggedin} setloggedin={setloggedin}/>}></Route>
          <Route path='*' element={<Navigate to='/' />}></Route>
        </Routes>
      </Router>
      
    </>
  );
}

export default App;
