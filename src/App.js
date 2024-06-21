import {React, useState, createContext} from 'react';
import {
  HashRouter as Router,
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

import MemDigits from './memDigits';

export const CommonContext = createContext()


export async function checkLoggedin(setloading, setloggedin, backendUrl) {
  setloading(true)
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
  setloading(false)
}

function App() {
  // let loggedin = true;

  const [loggedin, setloggedin] = useState(false);
  const [loading, setloading] = useState(false);
  

  const backendUrl = process.env.REACT_APP_Backend_URL;

  return (
    <>
    <CommonContext.Provider value={{loading, setloading}}>
      <Router>
        <Routes>
          <Route path='/' element={<Home backendUrl={backendUrl} loggedin={loggedin} setloggedin={setloggedin}/>}></Route>
          <Route exact path='/login' element={<LoginPage backendUrl={backendUrl} loggedin={loggedin} setloggedin={setloggedin}/>}></Route>
          <Route path='/mathapp' element={<Mathapp backendUrl={backendUrl} loggedin={loggedin} setloggedin={setloggedin}/>}></Route>
          <Route path='/register' element={<RegisterPage backendUrl={backendUrl} loggedin={loggedin} setloggedin={setloggedin}/>}></Route>
          <Route path='/userprofile' element={<UserProfile backendUrl={backendUrl} loggedin={loggedin} setloggedin={setloggedin}/>}></Route>
          {/* <Route path='/hidden' element={<MemDigits />}></Route> */}
          <Route path='*' element={<Navigate to='/' />}></Route>
          
        </Routes>
      </Router>
    </CommonContext.Provider>
    </>
  );
}

export default App;
