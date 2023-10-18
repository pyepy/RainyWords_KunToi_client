import React, { useState, useEffect } from 'react';
import { socket } from '../socket'
import playerIcon from '../images/playerIcon.png';

export function LobbyPanel() {
    socket.emit('request_room_info');

    const [gameMode, setGameMode] = useState('Game');
    const [roomNo, setRoomNo] = useState('00000');
    const [playerOne, setPlayerOne] = useState('Waiting');
    const [playerTwo, setPlayerTwo] = useState('Waiting');
    const [playerInLobby, setPlayerInLobby] = useState(0);

    useEffect(() => {
        socket.on("giveRoomInfo", (data) => {  //rcv name and namelist from server
            console.log(data)
        })
    
      });


    return (
        <div className="lobbyContainer">
            <div className='gameMode'>
                {gameMode} Mode
            </div>
            <div className='lobbyCount'>
                <span>Room No. {roomNo}</span>
                <span className='waiting'>player : {playerInLobby}/2 </span>
            </div>
            <div className='players'>
                <div className='player'>
                    <img className="playerIcon" src={playerIcon}/>
                     {playerOne}
                </div>
                <div className='player'>
                    <img className="playerIcon" src={playerIcon}/>
                    {playerTwo}
                </div>
            </div>
            <button className='startGame'>Start Game</button>
            

        </div>
    )
}