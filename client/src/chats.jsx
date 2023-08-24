import React, { useEffect, useRef } from 'react'
import { useState } from 'react';
import { UserContext } from './userContext';
import { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export const Chats = () => {

   const [ws,setws]=useState(null);

   const [onlineUser,setOnlineUser] = useState({});

   const [offlineUser,setofflineUser] = useState([]);

 const [selectedUser,setSelectedUser] = useState(null);


 const [Msg,setMsg]=useState([]);

 const [message,setMessage]=useState('');

 const parentRef=useRef(null);
 const messageRef=useRef(null);

 const navigate = useNavigate()


   const showOnline=(data)=>{

    const obj={};

    data.forEach(element => {

      const {userId,username}=element;

      obj[userId]=username;
      
    });

    console.log(obj);

    setOnlineUser(obj);


   }

   const {username,id}=useContext(UserContext);
  


   console.log("my id is "+id);
           

   console.log(onlineUser);
   
  const onlineExcludingMe={...onlineUser};

  delete onlineExcludingMe[id];



  function sendFile(ev) {
    const reader = new FileReader();
    reader.readAsDataURL(ev.target.files[0]);
    reader.onload = () => {
      sendMessage(null, {
        name: ev.target.files[0].name,
        data: reader.result,
      });
    };

    console.log(ev.target.files[0].name);
  }


  const logout=async()=>{

    try {

   const {data}=  await axios.post('/logout');

console.log(data);
   navigate('/login');
      
    } catch (error) {
      
    }






  }


  const sendMessage=(ev,file)=>{


    if(file==null && message===""){

      alert(`you cant send empty message`);

      return ;

    }


    console.log(`sending`);
console.log(ws);

console.log(file);

// console.log(file.name);
console.log(message);                  
    ws.send(JSON.stringify({
      message:{
        reciepient:selectedUser,
        text:message,
        file,

        sender:id
      }
    }))

const Message={
  reciepient:selectedUser,
  text:message,
   
  sender:id
}

if(file!=null){

  Message.file=file;

}

if (file) {

 delete Message['text'];
    axios.get('/message/'+selectedUser).then(res => {

      console.log(res.data);
      setMsg(res.data);
    }).catch(err=>{
      console.log(err);
    })



}


else{

  setMsg(prev=>([...prev,Message]))

  setMessage('');

}
     
  
  
   }


   const handleMessage=(e)=>{


    const messageData=JSON.parse(e.data);


    console.log(messageData);


    if( messageData.online){


      showOnline(messageData.online)



    }
    else{

      setMsg(prevMsg => [...prevMsg, messageData]);

    


    }





    console.log(`new message`, JSON.parse(e.data));

   }


   const reconnect=()=>{

    
    const newWs = new WebSocket("ws://localhost:5000");
    setws(newWs);

    newWs.addEventListener("message", handleMessage);


     


   }


   useEffect(()=>{


  console.log(`useEffect is fired`);               

console.log(`newWs is fired`);

      let  newWs = new WebSocket("ws://localhost:5000");
      setws(newWs);

      newWs.addEventListener("message", handleMessage);
       
 console.log('new ws'); 
 
 
     newWs.addEventListener('close',(event)=>{

      if (!event.wasClean) {
        console.log('Attempting to reconnect...');
        const reconnectInterval = setInterval(() => {
          newWs = new WebSocket("ws://localhost:5000");
          newWs.addEventListener('open', () => {
            console.log('Reconnected to WebSocket');
            clearInterval(reconnectInterval);
          });
        }, 3000); 


     }})
      return () => {

        console.log(`unmounting`); 
        newWs.removeEventListener("message", handleMessage);
        newWs.close();
      };
    
   },[])



   useEffect(()=>{

    if(selectedUser){
      console.log(`id is ${selectedUser}`);
      axios.get(`http://localhost:5000/message/${selectedUser}`).then(({data})=>{
            console.log(`data has arrived`);
      console.log(data);
      setMsg(data);
    }
  
  ) }

   },[selectedUser])


   useEffect(()=>{

    const div=messageRef.current;

    if(div){



      console.log(id +"me");          



      div.scrollTop = div.scrollHeight;
    }

   },[Msg])

     

   useEffect(()=>{

    axios.get('http://localhost:5000/people').then(({data})=>{
      // console.log(data);

    const offline=data.filter((p)=>p._id!=id).filter((c)=>onlineUser.hasOwnProperty(c._id)==false);

    console.log(offline);
      
    setofflineUser(offline);
    }).catch((err)=>{
      console.log(err);
    })

   },[onlineUser])
       

 


console.log(Msg);

console.log(onlineExcludingMe);
  return (
    <div className='h-screen  flex'> 
    <div className="w-1/4 pl-3 pt-3">
  

  <div className="title text-blue-600 font-bold	text-2xl flex items-center mb-4" >
    <div >Chat-App</div>
      
   <div className='logo'>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
</svg>
</div>
    
  </div>


 <div className="onlineUsers font-semibold  text-xl  font-sans ">

{Object.keys(onlineExcludingMe).map(key=>(
<div className={ selectedUser==key?'mb-2 cursor-pointer bg-cyan-100 flex items-center gap-2':"mb-2 cursor-pointer  flex items-center gap-2 "
}   onClick={()=>setSelectedUser(key)} >
  <div  >
    {onlineUser[key]}
  </div>
 { key &&<span className=' bg-lime-600 h-2 w-2 	rounded-full'></span>}
  </div>
))

}

</div>


<div className="offlineUsers font-semibold  text-xl  font-sans ">

      
{offlineUser.map(user=>(

  <div  className={ selectedUser==user._id?'mb-2 cursor-pointer bg-cyan-100 flex items-center gap-2':"mb-2 cursor-pointer  flex items-center gap-2 "
}   onClick={()=>setSelectedUser(user._id)}>
     <div>
    {user.username}
    </div>
    <span className=' bg-zinc-200	 h-2 w-2 	rounded-full' ></span>
  </div>
  
))

}

</div>


   <div className='flex  items-center gap-2	'>

   <span className='font-bold text-xl	'>{'welcome  '+username}</span>
    <button onClick={logout} className='rounded-md bg-blue-600  text-center font-medium p-3 text-white text-base		'>Logout </button>
   </div>

    </div>

    <div className="w-3/4 p-4 bg-emerald-100	  " >

<div className="h-full flex  flex-col gap-2	 justify-center border-opacity-5">

<div ref={messageRef} className='messages flex-col gap-5 overflow-auto h-3/4 p-3 border-solid border-4 border-hapu-600 '>
       {/* <div  className='message flex flex-col '></div> */}
        {!selectedUser &&(<div>

          <div className='font-bold text-2xl	text-white text-center'>
          
          Pls select user to chat from sidebar
          </div>
          </div>
        )
        }

        {selectedUser &&(<div className=''>
          

{Msg.map(message=>(

     <div className={message.sender==id?('flex flex-row mb-5'):('flex flex-row-reverse mb-5 ')}>
    { message.text &&(<div className={message.sender==id?' bg-thapa-400 font-bold font-sans min-w-150 max-w-md	 break-words rounded-md border border-hapu-600 p-6':'bg-white font-serif  font-bold min-w-150 max-w-md	 break-words rounded-md p-6  border border-hapu-600'}>
   
      {message.text}
     </div>)}
     {message.file && (
                        <div className={"rounded-md p-2 text-white"+((id==message.sender)?(' bg-blue-500 '):(' bg-green-500 '))}>
                          <a target="_blank" className="flex items-center gap-1 border-b" href={axios.defaults.baseURL + '/uploads/' + message.file}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                              <path fillRule="evenodd" d="M18.97 3.659a2.25 2.25 0 00-3.182 0l-10.94 10.94a3.75 3.75 0 105.304 5.303l7.693-7.693a.75.75 0 011.06 1.06l-7.693 7.693a5.25 5.25 0 11-7.424-7.424l10.939-10.94a3.75 3.75 0 115.303 5.304L9.097 18.835l-.008.008-.007.007-.002.002-.003.002A2.25 2.25 0 015.91 15.66l7.81-7.81a.75.75 0 011.061 1.06l-7.81 7.81a.75.75 0 001.054 1.068L18.97 6.84a2.25 2.25 0 000-3.182z" clipRule="evenodd" />
                            </svg>
                            {message.file}
                          </a>
                        </div>
                      )}
     </div>
))

}      

</div> 
        )

        }
        </div>

      {selectedUser && <div className='Search flex gap-1'>

            <input type="text" value={message} onChange={(ev)=>setMessage(ev.target.value)} placeholder='send msg' className='grow border rounded-sm p-2' name="" id=""  />
            <label className="bg-blue-200 p-2 text-gray-600 cursor-pointer rounded-sm border border-blue-200">
              <input type="file" className="hidden" onChange={sendFile} />
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M18.97 3.659a2.25 2.25 0 00-3.182 0l-10.94 10.94a3.75 3.75 0 105.304 5.303l7.693-7.693a.75.75 0 011.06 1.06l-7.693 7.693a5.25 5.25 0 11-7.424-7.424l10.939-10.94a3.75 3.75 0 115.303 5.304L9.097 18.835l-.008.008-.007.007-.002.002-.003.002A2.25 2.25 0 015.91 15.66l7.81-7.81a.75.75 0 011.061 1.06l-7.81 7.81a.75.75 0 001.054 1.068L18.97 6.84a2.25 2.25 0 000-3.182z" clipRule="evenodd" />
              </svg>
            </label>
            <button onClick={sendMessage} className="bg-blue-500 p-2 text-white rounded-sm">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
              </svg>
            </button>

        </div>

        }
        
</div>
  
    </div>
    
    
    </div>
  )
}
