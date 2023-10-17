import React, { useState, useEffect } from 'react';
import { playSocket } from '../socket.js'
import { io } from 'socket.io-client';

/*const playSocket = io('/play')*/

export function SelectLobby() {
    const [room, setRoom] = useState("");
    const [oldRoom, setOldRoom] = useState("");

    const [message, setMessage] = useState("");
    const [messageReceived, setMessageReceived] = useState("");

    const sendMessage = () => { //emit the input to the listener of the server (backend)
        playSocket.emit("send_message", {message, room});
     };

    const joinRoom = () => {  //join room
        if (room !== "") {
          console.log("sgyufhcjk")
            playSocket.emit("select_lobby", {room, oldRoom})
        }
    };

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
        {messageReceived} 
        </div>
    );
};