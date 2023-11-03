import React, { useState, useEffect } from 'react';
import { socket } from '../utils/socket'

export function CustomWordlist () {
  const [wordlist,setWordlist] = useState("");
  const [message,setMessage] = useState("hi");

  const sendWordlist = () => {
    console.log(wordlist)
    if (wordlist != "") {
      let wl = wordlist.split()
      console.log(wl)
      if (wl.length < 10) {
        setMessage("Not enough word for the custom word list...")
      } else {
        socket.emit("send_wl",wl)
      }
    }
  };

  useEffect(() => {
    socket.on("ack_wl",() => {
      setMessage("Custom Word List Added")
    })
  })

  return(
    <div className="midScreenContainer">
      <input onChange={(event) => {
          setWordlist(event.target.value);
        }} placeholder="Enter your word list..."></input>
      <button onClick={sendWordlist}>Save</button>
      <h3>{message}</h3>
    </div>
  )










}