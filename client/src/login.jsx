import React, { useContext, useState } from 'react'
import axios from 'axios';
import { UserContext } from './userContext';
import { Link, Navigate, useNavigate } from 'react-router-dom';

export const Login = () => {


    const navigate=useNavigate()
      
    
    const [username,setusername] =useState('');
    const [password,setpassword] =useState('');
    
    const {setId,setUsername:setLoggedInUsername}=useContext(UserContext);




    const handleSubmit = async(e) => { 

        e.preventDefault()

        
        try {
    const {data}=  await axios.post('http://localhost:5000/login', {
        username: username,
        password: password
    });

     setId(data.id);

     setLoggedInUsername(username);

     console.log(data);

     console.log(data.id," ",username);

     navigate('/');

            
        } catch (error) {

            
            
        }



     
    }


    console.log(`inside login`);

    return (
        <div className='bg-blue-50 h-screen flex items-center justify-center'>
            <form action="" className='w-96  p-6 bg-orange-100 ' onSubmit={handleSubmit} >
                <input value={username} onChange={(e)=>setusername(e.target.value)} className='block w-full rounded-md mb-6  p-2' type="text" name="" id=""  placeholder='username'/>
                <input value={password} onChange={(e)=>setpassword(e.target.value)}className='block w-full rounded-md mb-6 p-2' type="password" name="" id=""  placeholder='password'/>
                <button className='bg-blue-700 w-full rounded-sm p-2 mb-6 text-white'>Login</button>
                <div className='text-center	 text-sky-600	an-300	 text-lg'>
                     <Link to="/register" >
                    register now
                    </Link></div>
               
            </form>
           </div>
    
      )
      }

