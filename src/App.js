import './App.css';
import LoginPage from './login';
import Mathapp from './mathapp';

function App() {
  let loggedin = true;
  return (
    <>
      {loggedin && <LoginPage/>}
      {!loggedin && <Mathapp/>}
      
    </>
  );
}

export default App;
