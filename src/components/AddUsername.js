import React, { useState, useEffect } from 'react';
import { socket } from '../socket'

export function AddUsername() {
  const [tempName,setTempName] = useState("");    //name written in input
  const [name,setName] = useState("");            //name sent
  const [nameList,setNameList] = useState("");            

  const addName = () => {       
    socket.emit("assign_name",tempName);          //assign server-side
  }

  useEffect(() => {
    socket.on("ack_name", (data) => {  //rcv name and namelist from server
        setName(data.name);
        setNameList(data.namelist);
    });

  });

  if (name == "") {      //if no name assigned yet
    return(   //display
      <div className="Welcome"> 
        <h1>Welcome to KunToi Game</h1>  
        <input 
        placeholder = "Enter Your Username" 
        onChange={(event) => {
          setTempName(event.target.value);
        }}
      />
      <button onClick={addName}> Confirm</button>  
      </div>
    )
  } else {        //assigned name
    return(   //display
      <div className="Welcome"> 
        <h1>Welcome, {name}</h1>
      </div>
    )
  }
}