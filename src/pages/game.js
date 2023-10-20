import React, { useState } from 'react';
import '../App.css';
import { ReactP5Wrapper } from 'react-p5-wrapper';
import sketch from './sketch';
import Keyboard from '../components/Keyboard';
import { RandomWord } from '../components/RandomWord';
import { InitialRandomWord } from '../components/initialRandomWord';

const Game = () => {
  const wordList = InitialRandomWord();
  const word = RandomWord();

  return (
    <div className="App">
      {/* <p><RandomWord /></p>
      <p><InitialRandomWord/></p> */}
      <header className="canvasContainer">
        <ReactP5Wrapper sketch={p => sketch(p, wordList)} />
      </header>
      <Keyboard />
    </div>
  );
};

export default Game;