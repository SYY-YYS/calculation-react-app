import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import LoginPage from './login';
import Mathapp from './mathapp';
import Home from './home';

function App() {
  // let loggedin = true;
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route exact path='/login' element={<LoginPage />}></Route>
          <Route path='/mathapp' element={<Mathapp />}></Route>
          <Route path='*' element={<Navigate to='/' />}></Route>
        </Routes>
      </Router>
      
    </>
  );
}

export default App;
