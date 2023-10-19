import React, { useState, useEffect } from 'react';
import { socket } from '../utils/socket'
import playerIcon from '../images/playerIcon.png';
import { useNavigate } from 'react-router-dom';

export function LobbyPanel() {

    const navigate = useNavigate();

    const [gameMode, setGameMode] = useState('Game');
    const [roomNo, setRoomNo] = useState('00000');
    const [playerOne, setPlayerOne] = useState('Waiting');
    const [playerTwo, setPlayerTwo] = useState('Waiting');
    const [playerInLobby, setPlayerInLobby] = useState(0);

    

    //get room info
    socket.emit('request_room_info');

    useEffect(() => {
        socket.on("giveRoomInfo", (data) => {  
            console.log(data)
            setGameMode(data.myRoom.gameMode);
            setRoomNo(data.myRoom.roomNo);
            setPlayerInLobby(data.myRoom.roomPlayerCount);
            setPlayerOne(data.myRoom.player1);
            if (data.myRoom.player2 === undefined) {
                setPlayerTwo('Waiting...');
            }else setPlayerTwo(data.myRoom.player2);
        })

        socket.on('updateRoomInfo', (data) => { 
            setGameMode(data.myRoom.gameMode);
            setRoomNo(data.myRoom.roomNo);
            setPlayerInLobby(data.myRoom.roomPlayerCount);
            setPlayerOne(data.myRoom.player1);
            if (data.myRoom.player2 === undefined) {
                setPlayerTwo('Waiting...');
            }else setPlayerTwo(data.myRoom.player2);
        })
    
      });

      const startGame = () => {     
        if(playerInLobby === 2){
            socket.emit("request_start_game"); 
        } else alert('waiting for player');
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
            <button className='startGame' onClick={startGame}>Start Game</button>
            

        </div>
    )
}