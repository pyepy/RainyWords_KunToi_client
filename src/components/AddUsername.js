import React, { useState } from 'react';
import { socket } from '../socket'

export function AddUsername() {
  const [tempName,setTempName] = useState("");
  const [name,setName] = useState("");

  const addName = () => {
    if (tempName === "") {
      var x = (Math.floor(Math.random() * 900)+100)
      setName("KunToi#"+x);
    } else {
      setName(tempName);
    }
    socket.emit("add_name", name)
  }


  if (name === "") {
    return(
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
  } else {
    return(
      <div className="Welcome"> 
        <h1>Welcome, {name}</h1>
      </div>
    )
  }
}