import React, { useState, useEffect } from 'react';
import { socket } from '../utils/socket'

import { userName, updateName } from '../utils/userdata';

export function AddUsername() {
  const [tempName,setTempName] = useState("");    //name written in input
  const [name,setName] = useState(userName);            //name sent
  const [nameList,setNameList] = useState("");         

  const addName = () => {       
    socket.emit("assign_name",tempName);          //assign server-side
  }

  useEffect(() => {
    socket.on("ack_name", (data) => {  //rcv name and namelist from server
      setName(data.name);
      updateName(data.name)
      setNameList(data.namelist);
    })

    /*socket.on("ack_login", (data) => {  //rcv name and namelist from server  
      console.log(data.name)      
      setName(data.name);
    });  */ 
  });

  if (name == "") {      //if no name assigned yet
    return(   //display
      <div className="Welcome"> 
        <input 
        className='UsernameInput'
        placeholder = "Enter Your Username" 
        onChange={(event) => {
          setTempName(event.target.value);
        }}
      />
      <button className="SubmitName" onClick={addName}> Confirm</button>  
      </div>
    )
  } else if (name != "") {        //assigned name
    return(   //display
      <ul className="options">
        <li className="notOption">Welcome, <span className='Username'>{name}</span></li>
      </ul>
    )
  }
}