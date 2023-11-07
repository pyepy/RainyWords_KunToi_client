import { PlayerCount } from "../components/PlayerCount";
import { socket } from '../utils/socket'
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  
  const nukeServer = () => {
    socket.emit("prepare_nuke")
  }

  useEffect(() => {
    socket.on("nuke_incoming", (data) => {
      alert("Restarting Server...")
      console.log("hi")
    })
  })

  return (
    <div>
      <PlayerCount/>
      <button onClick={nukeServer}> Reset ALL</button>
    </div>
  )
}

export default Admin;