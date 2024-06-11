import {React, useState} from 'react';
import axios from 'axios';
import { redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';


// class LoginForm extends React.Component{
//   constructor(props) {
//     super(props);
//     this.state = {username: "", password: ''}
//     // const [name, setname] = useState('');
//     // const [password, setpassword] = useState('');

//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }
  
//   handleChange(event) {
//     const select = event.target.name;
//     this.setState({[select]: event.target.value});
//   }

//     render(){
//     return(
//       <>
      
//       <h1>Login Page</h1>
//         <form >
//           <div className='input-group'>
//             <label>Username:
//               <input type='text' name='username' value={this.state.name} onChange={this.handleChange}></input>
//             </label>
//             <br></br>
//             <label>Password:
//               <input type='password' name='password' value={this.state.password} onChange={this.handleChange}></input>
//             </label>
//             <br></br>
//             <input type='submit' value="Submit"></input>
//           </div>
//         </form>
//       </>
//     );}
  
// }

function LoginPage({loggedin, setloggedin}){

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
      <h1>Login Page</h1>
        <form onSubmit={submitForm}>
          <div className='input-group'>
            <label>Username:
              <input type='text' name='username' onChange={e => {setusername(e.target.value)}}></input>
            </label>
            <br></br>
            <label>Password:
              <input type='password' name='password' onChange={e => {setpassword(e.target.value)}}></input>
            </label>
            <br></br>
            <input type='submit' value="Submit"></input>
          </div>
        </form>
      
    </>
  )
}

export default LoginPage;