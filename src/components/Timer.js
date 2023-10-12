import React, { useState, useEffect } from 'react';
import { socket } from '../socket'

export function Timer() {
    const [time,setTime] = useState("5:00");

    useEffect(() => { //run everytime func is thrown to us from backend
        socket.on("receive_time", (data) => {  //detect rcv_msg event form backend
            setTime(data.time);
        });

    });

    return (
        <div className="Timer">
            {time}
        </div>
    )
}