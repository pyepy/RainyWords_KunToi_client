import './App.css';
import io from "socket.io-client";
import { useEffect, useState} from "react";
const socket = io.connect("http://localhost:3001");

function App() {
  //room state
  const [room, setRoom] = useState("");

  //message state
  const [message, setMessage] = useState("");
  const [messageRecieved, setMessageRecieved] = useState("");
  
  
  const joinRoom = () => {
    if(room !== ""){
      socket.emit("join_room", room);
    }
  };

  const sendMessage = () => {
    socket.emit("send_message", {message, room})
  };

  useEffect(() =>{
    socket.on("recieve_message", (data) =>{
      setMessageRecieved(data.message);
    })
  }, [socket])

  return (
    <div className="App">
      <input 
        placeholder='room number' 
        onChange={(event) =>{
          setRoom(event.target.value);
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
      {/* <h1>My room: {room}</h1> */}
      <h1>Message:</h1>
      <h1>{messageRecieved}</h1>
    </div>
  );
}

export default App;
