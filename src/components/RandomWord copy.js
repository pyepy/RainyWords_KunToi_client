import React, { useState, useEffect } from 'react';
import { socket } from '../utils/socket'

export function RandomWord() {
  const [word,setWord] = useState("");    //random word
  const [len,setLen] = useState(0);       //random word length
  const [mode,setMode] = useState("");    //easy/medium/hard mode

  const reqLen = () => {      //request length of word
    socket.emit("request_len", mode)
  }

  useEffect(() => {   
    socket.once("send_len", (len) => {    //got length, request word
      setLen(len);  
      socket.emit("request_word", len);
    });

    socket.once("send_word", (data) => {    //accept word
      setWord(data.word);
    });
  }, [word]);

  return(     //display
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