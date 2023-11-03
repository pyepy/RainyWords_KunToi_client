import React, { useState, useEffect } from 'react';
import { socket } from '../utils/socket'
import playerIcon from '../images/playerIconPink.png';
import playerIconMe from '../images/playerIconPurple.png';
import playerIconHead from '../images/pinkKing.png';
import playerIconMeHead from '../images/purpleKing.png';
import { useNavigate } from 'react-router-dom';

import { userLogin, userName} from '../utils/userdata.js' 

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
        
    }
    

    useEffect(() => {
        if (userLogin == 1) {
            //get room info
            socket.emit('request_room_info');
        } 

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

      const startGameNotHost = () => {     
        const confirmation = window.confirm('อยากกิน kfc');
        if (confirmation) {
          window.location.href = 'https://www.kfc.co.th/menu/promotions?utm_source=google_sem&utm_medium=ads_pfm&utm_campaign=211201_brand_sem_awo&utm_content=cpa_search_sem_ad_text_&gclid=CjwKCAjwkY2qBhBDEiwAoQXK5T7gr7h8sv7KdKifWLug2ju3GVOvLsaosVyyjy9wqsknJ37YGupMORoCP1MQAvD_BwE&gclsrc=aw.ds';
        }
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
                {gameMode} Room
            </div>
            <div className='lobbyCount'>
                <span>Room No. {roomNo}</span>
                <span className='waiting'>players in lobby: {playerInLobby} </span>
                
            </div>
            <div className='lobbyPlayers'>
                {console.log(players)}
                {players.map((player,index) => (
                    <div key={index} className='lobbyPlayer'>
                        {player === userName ? 
                        <>
                            {index === 0 ? <img className="playerIcon" src={playerIconMeHead}/> : <img className="playerIcon" src={playerIconMe}/>}
                            <span key={index} className='playerMe'>{player}&nbsp;</span>
                        </>
                        :
                        <>
                            {index === 0 ? <img className="playerIcon" src={playerIconHead}/> : <img className="playerIcon" src={playerIcon}/>}
                            <span key={index} >{player}&nbsp;</span>
                        </>}
                        
                    </div>
                ))}
            </div>
            {players[0] === userName ? <button className='startGame' onClick={startGame}>Start Game</button> : <button className='startGameNotHead' onClick={startGameNotHost}>Start Game</button> }
            

        </div>
    )
}