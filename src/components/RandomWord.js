import React, { useState, useEffect } from 'react';
import { socket } from '../socket'

export function RandomWord() {
  const [word,setWord] = useState("");
  const [len,setLen] = useState(0);
  const [mode,setMode] = useState("");

  const reqLen = () => {
    socket.emit("request_len", mode)
  }

  useEffect(() => {
    socket.once("send_len", (len) => {
      setLen(len);
      socket.emit("request_word", len);
    });

    socket.once("send_word", (data) => {
      setWord(data.word);
    });
  }, [word]);

  return(
    <div>
      <input 
        placeholder = "1/2/3"
        onChange={(event) => {
          setMode(event.target.value);
        }}/>
        <button onClick={reqLen}>Request Word</button>
      <h1>Word: {word}</h1>
      <h1>Length: {len}</h1>
    </div>
  )

}