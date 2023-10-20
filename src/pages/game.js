import React, { useState } from 'react';
import '../App.css';
import { ReactP5Wrapper } from 'react-p5-wrapper';
import sketch from './sketch';
import Keyboard from '../components/Keyboard';
import { RandomWord } from '../components/RandomWord';
import { InitialRandomWord } from '../components/initialRandomWord';

const Game = () => {
  // const wordList = InitialRandomWord();

  return (
    <div className="App">
      <header className="App-header">
        <ReactP5Wrapper sketch={p => sketch(p)} />
      </header>
      <Keyboard />
    </div>
  );
};

export default Game;