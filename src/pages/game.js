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

import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { socket } from '../utils/socket';
import { userLogin } from '../utils/userdata';

const Game = () => {
  // const wordList = InitialRandomWord();
  const navigate = useNavigate();

  useEffect(() => {
    if (userLogin == 0) {
      console.log(userLogin)
      navigate("../");
    }
  },[])

  useEffect(() => {
    socket.on("timesUp", () => {
      navigate('../finish')
    });

    socket.on("forced_leave", () => {
      navigate('../play')
      alert("A player disconnected...")
    })

  },[])

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
        
        <div className='game-right'>
        </div>
        
        
      </div>
      <div className='otherOtherContainer'>
        <Countdown/>
      </div>
      
      <Keyboard />
    </div>
  );
};

export default Game;