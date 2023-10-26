import React, { useState, useEffect } from 'react';
import { socket } from '../utils/socket'
import playerIcon from '../images/playerIcon.png';
import { useNavigate } from 'react-router-dom';

import { userLogin } from '../utils/userdata.js' 

export function LobbyPanel() {

    const navigate = useNavigate();

    const [gameMode, setGameMode] = useState('Game');
    const [roomNo, setRoomNo] = useState('00000');
    // const [playerOne, setPlayerOne] = useState('Waiting');
    // const [playerTwo, setPlayerTwo] = useState('Waiting');
    const [playerInLobby, setPlayerInLobby] = useState(0);

    const [players, setPlayers] = useState(['no one here yet']);

    

    if (userLogin == 1) {
        //get room info
        socket.emit('request_room_info'); 
    }
    

    useEffect(() => {
        socket.once("giveRoomInfo", (data) => {  
            if (data != "") {
                console.log(data)
                setGameMode(data.myRoom.gameMode);
                setRoomNo(data.myRoom.roomNo);
                setPlayerInLobby(data.myRoom.roomPlayerCount);
                setPlayers(data.myRoom.players);
                
            }
            
        })
    
    },[]);

    useEffect(() => {
        
        socket.on('updateRoomInfo', (data) => { 
            console.log(data)
            setGameMode(data.myRoom.gameMode);
            setRoomNo(data.myRoom.roomNo);
            setPlayerInLobby(data.myRoom.roomPlayerCount);
            setPlayers(data.myRoom.players);
        })
    
    },[]);

      const startGame = () => {     
        if(playerInLobby >= 2){
            socket.emit("request_start_game"); 
        } else alert('waiting for other players');
      }

      useEffect(() => {
        const handleGameStart = (data) => {
          navigate('../game');
        };
    
        socket.on("goToGame", handleGameStart);
      
        return () => {
          socket.off("goToGame", handleGameStart);
        };
      }, []);


    return (
        <div className="midScreenContainer">
            <div className='gameMode'>
                {gameMode} Mode
            </div>
            <div className='lobbyCount'>
                <span>Room No. {roomNo}</span>
                <span className='waiting'>players in lobby: {playerInLobby} </span>
                
            </div>
            <div className='lobbyPlayers'>
                {players.map((player,index) => (
                    <div key={index} className='lobbyPlayer'>
                        <img className="playerIcon" src={playerIcon}/>
                        <span key={index} >{player}&nbsp;</span>
                    </div>
                ))}
            </div>
            <button className='startGame' onClick={startGame}>Start Game</button>
            

        </div>
    )
}