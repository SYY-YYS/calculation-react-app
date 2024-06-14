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
import UserProfile from './UserProfile';
import axios from 'axios';



export async function checkLoggedin(setloggedin, backendUrl) {
  await axios.get(backendUrl + '/login',{withCredentials: true})
  .then((res)=> {
    console.log(res.status, res.data)
    if (res.data) {
      setloggedin(true);
      return res.data;
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
  

  const backendUrl = 'http://localhost:8030';

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home backendUrl={backendUrl} loggedin={loggedin} setloggedin={setloggedin}/>}></Route>
          <Route exact path='/login' element={<LoginPage backendUrl={backendUrl} loggedin={loggedin} setloggedin={setloggedin}/>}></Route>
          <Route path='/mathapp' element={<Mathapp backendUrl={backendUrl} loggedin={loggedin} setloggedin={setloggedin}/>}></Route>
          <Route path='/register' element={<RegisterPage backendUrl={backendUrl} loggedin={loggedin} setloggedin={setloggedin}/>}></Route>
          <Route path='/userprofile' element={<UserProfile backendUrl={backendUrl} loggedin={loggedin} setloggedin={setloggedin}/>}></Route>
          <Route path='*' element={<Navigate to='/' />}></Route>
        </Routes>
      </Router>
      
    </>
  );
}

export default App;
