import React, { useState, useEffect } from 'react';
import { socket } from '../utils/socket'

export function GameTimer () {
  const [minute,setMinute] = useState(5);
  const [second,setSecond] = useState("00");

  const startTimer = function () {
    socket.emit("mess_with_time","hi")
  }

  const pauseTimer = function () {
    socket.emit("mess_with_time","bye")
  }

  const resetTimer = function () {
    socket.emit("mess_with_time","no")
  }

  useEffect(() => {
    socket.on('counter', (data) => {
      setMinute(data.min);
      setSecond(("00"+data.sec).slice(-2));
    });
  }, [second]);

  return(
    <div className="GameTimer">
      <h3>{minute}:{second}</h3>
      {/*<button onClick={startTimer}>Start Timer</button>
      <h3></h3>
      {/*<button onClick={pauseTimer}>Pause Timer</button>
      <h3></h3>
  <button onClick={resetTimer}>Reset Timer</button>*/}
    </div>
  );
}