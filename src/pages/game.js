import React, { useState } from 'react';
import '../App.css';
import { ReactP5Wrapper } from 'react-p5-wrapper';
import sketch from './sketch';
import Keyboard from '../components/Keyboard';
import { RandomWord } from '../components/RandomWord';
import { InitialRandomWord } from '../components/initialRandomWord';

import { GameTimer } from '../components/GameTimer';
import { PlayerScore } from '../components/PlayerScore';

const Game = () => {
  // const wordList = InitialRandomWord();

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
      {/* <Keyboard /> */}
    </div>
  );
};

export default Game;