import React, { useState } from 'react'
import axios from 'axios';
import { uploadFileWithProgress } from './utils/upload';
import { useNavigate } from 'react-router-dom';
export const Register = () => {

    const [username,setusername] =useState('');
    const [password,setpassword] =useState('');
    const [file,setfile] = useState('');
                        

    const navigate=useNavigate()


    const handleSubmit = async(e) => {

        e.preventDefault()

   try
{        console.log(username);
        console.log(password);
      const {data} = await axios.post('http://localhost:5000/register',{
            username:username,
            password:password,
            ...(file ? { file: url } : {})
        });

 

        

     navigate('/login');
            
        } catch (error) {
            console.log(error);

            
        }
        
     
    }


    
  return (
    <div className='bg-blue-50 h-screen flex items-center justify-center'>
        <form action="" className='w-96  p-6 bg-orange-100 ' onSubmit={handleSubmit} >
            <input value={username} onChange={(e)=>setusername(e.target.value)} className='block w-full rounded-md mb-6  p-2' type="text" name="" id=""  placeholder='username'/>
            <input value={password} onChange={(e)=>setpassword(e.target.value)}className='block w-full rounded-md mb-6 p-2' type="password" name="" id=""  placeholder='password'/>
            <button className='bg-blue-700 w-full rounded-sm p-2 mb-6 text-white'>Register</button>
        </form>
        
       </div>

  )
  }
