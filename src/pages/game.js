import React from 'react';
import '../App.css';
import { ReactP5Wrapper } from 'react-p5-wrapper';
import sketch from './sketch';
import Keyboard from '../components/Keyboard';
import { RandomWord } from '../components/RandomWord';

const Game = () => {
  const wordList = RandomWord(); // Call the RandomWord component and store the result

  return (
    <div className="App">
      <RandomWord />
      <header className="App-header">
        <ReactP5Wrapper sketch={p => sketch(p, wordList)} />
      </header>
      <Keyboard />
    </div>
  );
};

export default Game;