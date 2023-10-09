import React, { useState, useEffect } from 'react';
import { socket } from '../socket'


export function SendMessage() {
    const [room, setRoom] = useState("");
    const [oldRoom, setOldRoom] = useState("");

    const [message, setMessage] = useState("");
    const [messageReceived, setMessageReceived] = useState("");

    const sendMessage = () => { //emit the input to the listener of the server (backend)
        socket.emit("send_message", {message, room});
     };

    const joinRoom = () => {  //join room
        if (room !== "") {
            socket.emit("join_room", {room, oldRoom})
        }
    };

    useEffect(() => { //run everytime func is thrown to us from backend
        socket.on("receive_message", (data) => {  //detect rcv_msg event form backend
            setMessageReceived(data.message);
        });

        socket.on("ack_room", (data) => {
            setOldRoom(data.room);  //change oldRoom to room
        });
    });

    return(
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