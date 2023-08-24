
import axios from 'axios';
import React,{createContext, useContext, useEffect, useState} from'react';
import { Login } from './login';
import { BrowserRouter } from 'react-router-dom';

export const UserContext = createContext({});



export const UserContextProvider = ({ children }) => {

    const [username,setUsername]=React.useState('');
    const [id,setId]=React.useState('');

    const [pending,setpending]=useState(true);

    useEffect(()=>{

  console.log(`inside useefect of userContextProvider`);
        axios.get('http://localhost:5000/profile').then((res)=>{
               
        setpending(false);
        console.log(res.data);
            setId(res.data.userId);

            setUsername(res.data.username);

        })
        .catch((err)=>{


console.log(`hi`);
            if(err.statusText==='Unauthorized'){


            }
            setpending(false)


           console.log(err.status+''+err);
            console.log(err);
            
        })


    },[]);


   console.log(id +''+pending);



  

    return (
        <UserContext.Provider value={{username,username, setUsername, id, setId,pending}}>
            {children}
        </UserContext.Provider>
    )


}