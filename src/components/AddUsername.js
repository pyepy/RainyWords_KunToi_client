import React, { useState, useEffect } from 'react';
import { socket } from '../socket'

//simport userData from '../userdata';

export function AddUsername() {
  const [tempName,setTempName] = useState("");    //name written in input
  const [name,setName] = useState(""/*userData.username*/);            //name sent
  const [nameList,setNameList] = useState("");         

  console.log(name);
  console.log(userData);

  const addName = () => {       
    socket.emit("assign_name",tempName);          //assign server-side
  }

  useEffect(() => {
    socket.on("ack_name", (data) => {  //rcv name and namelist from server
      setName(data.name);
      //userData.username = name;
      setNameList(data.namelist);
    })

    socket.on("ack_login", (data) => {  //rcv name and namelist from server  
      console.log(data.name)      
      setName(data.name);
    });    
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