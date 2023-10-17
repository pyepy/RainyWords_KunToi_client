import React, { useState, useEffect } from 'react';
import { socket, playSocket } from '../socket.js'
import { io } from 'socket.io-client';

import { Router, Routes, Link } from 'react-router-dom';
import { NavItem, NavLink } from "reactstrap";

export function SelectLobby() {
  const [room, setRoom] = useState("");
  const [oldRoom, setOldRoom] = useState("");

  const [message, setMessage] = useState("");
  const [messageRcv, setMessageRcv] = useState("");

  const [mode,setMode] = useState("c");

  const createLobby = () => {
    socket.emit("create_lobby",{mode,room});
  }

  const joinLobby = () => {  //join room
    if (room !== "") {
      socket.emit("select_lobby", {room, oldRoom});
    }
  };

  const leaveLobby = () => {
    playSocket.emit("leave_lobby",{oldRoom});
  }

  const sendMessage = () => { //emit the input to the listener of the server (backend)
    playSocket.emit("send_msg", {message, room});
  };

  useEffect(() => {
    playSocket.on("rcv_lobby",(data) => {
      setRoom(data.room)
      setOldRoom(data.oldRoom);
    });
    
    playSocket.on("rcv_msg", (data) => {
      setMessageRcv(data.message);
    });
  });

  return(
    <div>
      <input 
        placeholder = "Message..." 
        onChange={(event) => {
          setMessage(event.target.value);
        }}
      />
      <button onClick={sendMessage}> Send Message</button>
      <h1>Room ID: {oldRoom}</h1>  
      <h1>Message:</h1>   
      
    </div>
  );


}



   
/*
    useEffect(() => { //run everytime func is thrown to us from backend
        playSocket.on("receive_message", (data) => {  //detect rcv_msg event form backend
            setMessageReceived(data.message);
        });

        playSocket.on("ack_lobby", (data) => {
            setOldRoom(data.room);  //change oldRoom to room
        });
    });

    return(     //display
        <div className="SendMessage">
        <input 
        placeholder = "Room ID..." 
        onChange={(event) => {
          setRoom(event.target.value);
        }}
        />
        <button onClick={joinRoom}> Join Room</button>  
        <input 
        placeholder = "Message..." 
        onChange={(event) => {
          setMessage(event.target.value);
        }}
        />
        <button onClick={sendMessage}> Send Message</button>
        <h1>Room ID: {oldRoom}</h1>  
        <h1>Message:</h1>   
        {MessageRcv} 
        </div>
    );
};*/