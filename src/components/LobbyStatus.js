import { useState, useEffect } from 'react'
import { socket } from '../utils/socket'

//can be merge with lobbypanel.js later

export function LobbyStatus() {
  const [status, setStatus] = useState("Not Ready!");
  const [display, setDisplay] = useState("");

  socket.emit("status_update",{status})

  const toggleStatus = () => {
    if (status = "Not Ready!") {
      setStatus("Ready!");
    } else if (status = "Ready!") {
      setStatus("Not Ready!");
    }
    socket.emit("status_update",{status});
  };

  useEffect(() => {
    socket.on("status_display", (data) => {
      setDisplay(data.display);
    });
  });

  return(
    <div>
    </div>
  )
}