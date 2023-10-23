import React, { useState } from 'react';
import '../App.css';
import { ReactP5Wrapper } from 'react-p5-wrapper';
import sketch from './sketch';
import Keyboard from '../components/Keyboard';
import { RandomWord } from '../components/RandomWord';
import { InitialRandomWord } from '../components/initialRandomWord';

import { Timer } from '../components/Timer';
import { PlayerScore } from '../components/PlayerScore';

const Game = () => {
  // const wordList = InitialRandomWord();

  return (
    <div className="App">
      <div className="canvasContainer">
        <ReactP5Wrapper sketch={p => sketch(p)} />
      </div>
      <div className='otherContainer'>
        <div className='topOverlay'>
          <Timer/>
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