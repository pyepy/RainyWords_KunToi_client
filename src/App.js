import './App.css';
import io from "socket.io-client";
import { useEffect, useState } from "react";
const socket = io.connect("http://localhost:3001");

function App() {
  //room state
  const [oldRoom, setOldRoom] = useState(""); //current room
  const [newRoom, setNewRoom] = useState(""); //room code in input

   //add username
  const [name,setName] = useState("");  
  //no. of online user
  const [count,setCount] = useState("");

  //message state
  const [message, setMessage] = useState("");
  const [messageRecieved, setMessageRecieved] = useState("");
  
  
  const joinRoom = () => {
    if(newRoom !== ""){
      socket.emit("join_room", {oldRoom, newRoom});
    }
  };

  const addName = () => {   //register name, change to room 1
    socket.emit("add_name", {name, oldRoom, newRoom})
  };

  const sendMessage = () => {
    socket.emit("send_message", {message, oldRoom})
  };

  useEffect(() =>{
    socket.on("recieve_message", (data) =>{
      setMessageRecieved(data.message);
    });

    socket.on("ack_room", (data) => { //set oldRoom = newRoom
      setOldRoom(data.newRoom)
    });

    socket.on("online_no", (data) => {  //check no. of online players
      setCount(data);
    });
  }, [socket])

  if (oldRoom === "") {  //first entering the url
    return (
      <div className="Welcome"> 
        <h3>Online Players: {count}</h3> 
        <h1>Welcome to KunToi Game</h1>  
        <input 
        placeholder = "Enter Your Username" 
        onChange={(event) => {
          setName(event.target.value);
          setNewRoom(1);
        }}
      />
      <button onClick={addName}> Confirm</button>  
      </div>
    );
  } else {    //after entering username
    return (
      <div className="App">
        <h3>Online Players: {count}</h3> 
        <h1>Welcome, {name}</h1>
        <h3> </h3>
        <input 
          placeholder='room number' 
          onChange={(event) =>{
            setNewRoom(event.target.value);
          }}
        ></input>
        <button onClick={joinRoom}>join room</button>
  
        <input 
          placeholder='message' 
          onChange={(event) =>{
            setMessage(event.target.value);
          }}
        ></input>
        <button onClick={sendMessage}>send message</button>
        <h1>My room: {oldRoom}</h1>
        <h1>Message:</h1>
        <h1>{messageRecieved}</h1>
      </div>
    )
  }
}

export default App;
