import React, { useState, useEffect } from 'react';
import { socket } from '../socket'

export function PlayerCount() {
    const [onlineNo,setOnlineNo] = useState(0);

    socket.on("connect",() => {
        socket.emit("connected")
    })

    useEffect(() => {
        socket.on("online_no", (count) => {
            console.log(count);
            setOnlineNo(count);     //show online number
        })
    }, [count]);

    return(
        <div className="PlayerCount">
            <h3>Online Players: {onlineNo}</h3>
        </div>
    );  
}


