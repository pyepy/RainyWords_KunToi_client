import React, { useState, useEffect } from 'react';
import { socket } from '../utils/socket'

export function PlayerCount() {
    const [onlineNo,setOnlineNo] = useState(0);

    socket.emit("req_online_no");

    useEffect(() => {
        socket.on("online_no", (count) => {
            console.log(count);
            setOnlineNo(count);     //show online number
        })
    },);

    return( //display
        <div className="PlayerCount">
            <div>Online Players: {onlineNo}</div>
        </div>
    );  
}


