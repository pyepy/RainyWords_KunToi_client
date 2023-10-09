import React, { useState } from 'react';
import { socket } from '../socket'

export function AddUsername() {
  const [tempName,setTempName] = useState("");    //name written in input
  const [name,setName] = useState("");            //name sent

  const addName = () => {
    if (tempName === "") {
      var x = (Math.floor(Math.random() * 900)+100)   //assign random ID
      setName("KunToi#"+x);                           //default name
    } else {
      setName(tempName);
    }
    socket.emit("add_name", name)                     //no func yet
  }


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