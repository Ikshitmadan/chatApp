import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Register } from './Register'
import { UserContext, UserContextProvider } from './userContext'
import axios from 'axios'
import { Login } from './login'
import { Chats } from './chats'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { PrivateRoute } from './PrivateRoute'
// import { UserContextProvider } from './userContext';


function App() {

  axios.defaults.baseURL = 'http://localhost:5000';
  axios.defaults.withCredentials = true;
  const [count, setCount] = useState(0)

  return (

    <BrowserRouter>
      <Routes>    
      <Route path="/login" element={<Login/>} />
      <Route exact path='/register' element={<Register/>}></Route>
      <Route exact path='/' element={<PrivateRoute/>}>
        <Route exact path='/' element={<Chats/>}/>
          </Route> 
        </Routes> 
    </BrowserRouter>
  
  )
}

export default App
