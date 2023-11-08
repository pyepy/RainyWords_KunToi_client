import React, { useState, useEffect } from 'react';
import { socket } from '../utils/socket'
import playerIcon from '../images/playerIconPink.png';
import playerIconMe from '../images/playerIconPurple.png';
import playerIconHead from '../images/pinkKing.png';
import playerIconMeHead from '../images/purpleKing.png';
import chickenInEgg from '../images/chicken5.png';
import { useNavigate } from 'react-router-dom';

import chicken from '../images/chicken4.png';
import chickenKing from '../images/chicken6.png';
import goose from '../images/goose4.png';
import gooseKing from '../images/goose6.png';

import { userLogin, userName} from '../utils/userdata.js' 

// Import your music file
import song from '../images/songs/seaHeartSadger.mp3';

export function LobbyPanel() {
    // State to manage the audio element
    const [audio] = useState(new Audio(song));

    // Function to play the song
    const playSong = () => {
        audio.play().catch(error => console.error("Failed to play audio:", error));
    };

    //-----------------------------------------------------------------setting------------------------------------------------------------  
    const [wordDifficulty, setWordDifficulty] = useState(['Medium', 2]);
    const [speedValue, setSpeedValue] = useState(100);
    const [timeMin, setTimeMin] = useState('5');
    const [timeSecond, setTimeSecond] = useState('00');
  
    const handleSpeedChange = (event) => {
        const value = event.target.value;
        setSpeedValue(value);
    }
  
    const handleTimeChange = (event) => {
        const value = event.target.value;
        const minutes = Math.floor(value / 60);
        const seconds = (value % 60).toString().padStart(2, '0');
        setTimeMin(minutes);
        setTimeSecond(seconds);
    }

    const chooseDifficulty = (level) => {
        setWordDifficulty(level);
    }

    const resetSetting = () =>{
        setWordDifficulty(['Medium',2]);
        setSpeedValue(100);
        setTimeMin('5');
        setTimeSecond('00');
    }
  
    //-----------------------------------------------------------------setting------------------------------------------------------------

    const navigate = useNavigate();

    const [gameMode, setGameMode] = useState('Game');
    const [roomNo, setRoomNo] = useState('00000');
    const [playerInLobby, setPlayerInLobby] = useState(0);
    const [players, setPlayers] = useState(['no one here yet']);

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

                if(data.myRoom.wordDifficulty == 1) setWordDifficulty(["Easy",1]);
                if(data.myRoom.wordDifficulty == 2) setWordDifficulty(["Medium",2]);
                if(data.myRoom.wordDifficulty == 3) setWordDifficulty(["Hard",3]);
                setSpeedValue(data.myRoom.speedMultiplier*100);

                const time = data.myRoom.timeInSec;
                const minutes = Math.floor(time / 60);
                const seconds = (time % 60).toString().padStart(2, '0');
                setTimeMin(minutes);
                setTimeSecond(seconds);
                
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

            if(data.myRoom.wordDifficulty == 1) setWordDifficulty(["Easy",1]);
            if(data.myRoom.wordDifficulty == 2) setWordDifficulty(["Medium",2]);
            if(data.myRoom.wordDifficulty == 3) setWordDifficulty(["Hard",3]);
            setSpeedValue(data.myRoom.speedMultiplier*100);
            const time = data.myRoom.timeInSec;
            const minutes = Math.floor(time / 60);
            const seconds = (time % 60).toString().padStart(2, '0');
            setTimeMin(minutes);
            setTimeSecond(seconds);
        })
    },[]);

      const startGame = () => {     
        if(playerInLobby >= 1){
            let timeInSec = (parseInt(timeMin) * 60) + parseInt(timeSecond);
            let speedMultiplier = speedValue/100;
            let wordDifficultyLevel =wordDifficulty[1];
            console.log(wordDifficultyLevel);
            console.log(timeInSec);
            console.log(speedMultiplier);
            socket.emit("request_start_game", {wordDifficultyLevel, timeInSec, speedMultiplier}); 
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

      useEffect(() => {
        // Set audio to loop
        audio.loop = true;

        // Play the song when the component mounts
        playSong();

        return () => {
            // Stop the song when the component unmounts
            audio.pause();
        };
      },[audio])



  

    return (
        <>
        {players[0] == userName ? 
        <div className='lobbySetting'>
            <div className='settingTitle'>Setting</div>
            <div className='wordSetting'>
                <div className='wordSettingTitle'>Word Difficulty : {wordDifficulty[0]}</div>
                <div className='difficulties'>
                    <div className='difficulty easy' onClick={() => chooseDifficulty(["Easy",1])}>Easy</div>
                    <div className='difficulty medium' onClick={() => chooseDifficulty(["Medium",2])}>Medium</div>
                    <div className='difficulty hard'onClick={() => chooseDifficulty(["Hard",3])}>Hard</div>
                </div>
            </div>
            <div className='speedSetting'>
                <div className='speedSettingTitle'>Falling Speed: {speedValue}%</div>
                <input 
                    type="range" 
                    id="speedInput" 
                    min={50} 
                    max={200} 
                    step={1} 
                    value={speedValue} 
                    className='speedInput'
                    onChange={handleSpeedChange}
                />
            </div>
            <div className='timeSetting'>
                <div className='timeSettingTitle' >Time: {timeMin}.{timeSecond}</div>
                <input 
                    type="range" 
                    id="timeInput" 
                    min={30} 
                    max={600} 
                    step={30} 
                    value={parseInt(timeMin) * 60 + parseInt(timeSecond)}
                    className='timeInput'
                    onChange={handleTimeChange}
                />
            </div>
            <div className='defaultSetting' onClick={resetSetting}>Reset to default</div>
        </div>
        : null }

        <div className="midScreenContainer">
            <div className='gameMode'>
                insert ui title
            </div>
            <div className='lobbyCount'>
                <span>Room No. {roomNo}</span>
                <span className='waiting'>players in lobby: {playerInLobby} </span>
                
            </div>
            <div className='lobbyPlayers'>
                {console.log(players)}
                {/* {players.map((player,index) => (
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
                ))} */}
                {players.map((player,index) => (
                    <div key={index} className='lobbyPlayer'>
                        {player === userName ? 
                        <>
                            {index === 0 ? <img className="playerIcon" src={chickenKing}/> : <img className="playerIcon" src={chicken}/>}
                            <span key={index} className='playerMe'>{player}&nbsp;</span>
                        </>
                        :
                        <>
                            {index === 0 ? <img className="playerIcon" src={gooseKing}/> : <img className="playerIcon" src={goose}/>}
                            <span className='notMyName' key={index} >{player}&nbsp;</span>
                        </>}
                        
                    </div>
                ))}
            </div>
            {players[0] === userName ? <button className='startGame' onClick={startGame}>Start Game</button> : <button className='startGameNotHead' onClick={startGameNotHost}>Start Game</button> }
            

        </div>

        </>
    )
}