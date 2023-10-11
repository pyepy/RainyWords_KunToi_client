import React from 'react';
import './App.css';
import { ReactP5Wrapper } from 'react-p5-wrapper'; 
import sketch from './sketch'

const Game = () => {
  // Add your game content here
  return (
    <div className="App">
      <h1>Game Page</h1>
      <p>Welcome to the game! Your game content goes here.</p>
      <header className="App-header">
        <>
          <ReactP5Wrapper sketch={sketch} />
        </>
      </header>
      
      {/* Add more game-related components or elements as needed. */}
    </div>
  );
};

export default Game;