import { PlayerCount } from "../components/PlayerCount";
import { socket } from '../utils/socket'
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  
  const nukeServer = () => {
    socket.emit("prepare_nuke")
  }

  return (
    <div className="AppHome">
      <h1>ADMIN CONTROL</h1>
      <PlayerCount/>
      <button onClick={nukeServer}> Reset ALL</button>
    </div>
  )
}

export default Admin;