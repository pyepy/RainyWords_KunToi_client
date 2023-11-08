import React, { useState } from 'react';
import '../App.css';
import { ReactP5Wrapper } from 'react-p5-wrapper';
import sketch from './sketch';
import Keyboard from '../components/Keyboard';
import { RandomWord } from '../components/RandomWord';
import { InitialRandomWord } from '../components/initialRandomWord';

import { GameTimer } from '../components/GameTimer';
import { PlayerScore } from '../components/PlayerScore';
import { Countdown } from '../components/CountDown';
import { Legend } from '../components/Legend';

import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { socket } from '../utils/socket';
import { userLogin } from '../utils/userdata';

// Import your music file
import song from '../images/songs/DriftveilCity.mp3';

const Game = () => {
  // State to manage the audio element
  const [audio] = useState(new Audio(song));

  // Function to play the song
  const playSong = () => {
    audio.play().catch(error => console.error("Failed to play audio:", error));
  };

  // const wordList = InitialRandomWord();
  const navigate = useNavigate();

  useEffect(() => {
    if (userLogin == 0) {
      console.log(userLogin)
      navigate("../");
    }

    socket.on("nuke_incoming", (data) => {
      navigate("../")
    })
  },[])

  useEffect(() => {
    // Set audio to loop
    audio.loop = true;

    // Play the song when the component mounts
    playSong();

    socket.on("timesUp", () => {
      navigate('../finish')
    });

    socket.on("forced_leave", () => {
      navigate('../play')
      alert("A player disconnected...")
    })

    return () => {
      // Stop the song when the component unmounts
      audio.pause();
    };

  },[audio])

  return (
    <div className="AppGame">
      <div className="canvasContainer">
        <ReactP5Wrapper sketch={p => sketch(p)} />
      </div>
      <div className='otherContainer'>
        <div className='topOverlay'>
          <GameTimer/>
        </div>
        <div className='game-left'>
          <PlayerScore/>
        </div>
      
        
      </div>
      <div className='otherOtherContainer'>
        <Countdown/>
      </div>
      <div className='otherOtherOtherContainer'>
        <Legend/>
      </div>

      <Keyboard />
    </div>
  );
};

export default Game;