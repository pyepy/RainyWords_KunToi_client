import React, { useState, useEffect } from 'react';
import { socket } from '../socket'

export function PlayerScore(props) {
    const [playerScore,setPlayerScore] = useState("0");
    const playerName = props.playerName;

    useEffect(() => { //run everytime func is thrown to us from backend
        socket.on("receive_scores", (data) => {  //detect rcv_msg event form backend
            setPlayerScore(data.score);
        });

    });

    return (
        <div className="PlayerScore">
            {playerName} : {playerScore}
        </div>
    )
}