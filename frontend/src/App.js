import React,{useState} from 'react';
import axios from 'axios';

function App() {
  const [firstname,setFirstname] = useState("")
  const [lastname,setLastname] = useState("")
  const [phone,setPhone] = useState("")
  const [password,setPassword] = useState("")
  const [email,setEmail] = useState("")
  const [address,setAddress] = useState("")
  const [loginpassword,setLoginPassword] = useState("")
  const [loginemail,setLoginEmail] = useState("")
  const [token,setToken] = useState("")
  const [data,setData] = useState("")

  const add = () => {
    axios.post("http://127.0.0.1:2000/add" , //127.0.0.1:2000 (localhost)
            {
                firstname : firstname,
                lastname : lastname,
                phone : phone,
                password : password,
                email : email,
                address : address,
            }).then((res)=>{
                console.log(res)
            })
  }
  const login = () => {
    console.log("clicked")
    axios.post("http://127.0.0.1:2000/login" , //127.0.0.1:2000 (localhost)
            {
                loginpassword : loginpassword,
                loginemail : loginemail,
            }).then((res)=>{
                console.log("success")
                console.log(res)
                setToken(res.data.token)
            }).catch((err)=>{
                console.log(err)
            })
  }
  const get = () => {
    console.log("Token = "+token)
    axios.get("http://127.0.0.1:2000/get" , //127.0.0.1:2000 (localhost)
            {
              token : token,
              data : data,
            }).then((res)=>{
                console.log(res)
            }).catch((err)=>{
                console.log(err)
            })
  }
  return (
    <>
      <div>
            <label><h1>Register</h1></label>
            <label>Firstname <br/> </label>
            <input type="text" onChange={(event)=>{setFirstname(event.target.value)}}/><br/>
            <label>Lastname <br/> </label>
            <input type="text" onChange={(event)=>{setLastname(event.target.value)}}/><br/>
            <label>Mobile No. <br/> </label>
            <input type="text" onChange={(event)=>{setPhone(event.target.value)}}/><br/>
            <label>Email <br/> </label>
            <input type="text" onChange={(event)=>{setEmail(event.target.value)}}/><br/>
            <label>Address <br/> </label>
            <input type="text" onChange={(event)=>{setAddress(event.target.value)}}/><br/>
            <label>Password <br/> </label>
            <input type="text" onChange={(event)=>{setPassword(event.target.value)}}/><br/>
            <button onClick={add}>ADD</button><br/>
            <label><h1>Login</h1></label>
            <label>Email <br/> </label>
            <input type="text" onChange={(event)=>{setLoginEmail(event.target.value)}}/>
            <br/>
            <label>Password <br/> </label>
            <input type="password" onChange={(event)=>{setLoginPassword(event.target.value)}}/>
            <br/>
            <button onClick={login}>LOGIN</button>
            <label><h1>Get Data</h1></label>
            <label>firstname <br/> </label>
            <input type="text" onChange={(event)=>{setData(event.target.value)}}/>
            <br/>
            <button onClick={get}>Get</button>
      </div>
    </>
  );
}

export default App;
