import { PlayerCount } from "../components/PlayerCount";
import { socket } from '../utils/socket'
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const [msg,setMsg] = useState("");
  
  const nukeServer = () => {
    socket.emit("prepare_nuke")
  }

  const checkName = () => {
    socket.emit("checkname")
  }

  const checkRoom = () => {
    socket.emit("checkroom")
  }

  useEffect(() => {
    socket.on("admin_log",(data) => {
      setMsg(JSON.stringify(data));
    })
  },[])

  return (
    <div className="AppHome">
      <h1>ADMIN CONTROL</h1>
      <PlayerCount/>
      <button onClick={nukeServer}> Reset ALL</button>
      <button onClick={checkName}> Req Name</button>
      <button onClick={checkRoom}> Req Room</button>
      <h3>{msg}</h3>
    </div>
  )
}

export default Admin;