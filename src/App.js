import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Game from './game';
import './App.css';
import { SendMessage } from './components/SendMessage';
import { PlayerCount } from './components/PlayerCount';
import { AddUsername } from './components/AddUsername';
import { RandomWord } from './components/RandomWord';
import { GroundBoarder } from './components/GroundBoarder';
import { GameTimer } from './components/GameTimer';
import { PlayerScore } from './components/PlayerScore';

function App() {
  const handleStartGame = () => {
    window.location.href="/game" // Refresh the page
  };

  let player1 = 'PlayerOne';
  let player2 = 'PlayerTwo';

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/game" element={<Game />} />
          {/* Other routes can be added here if needed */}
        </Routes>
        
        {window.location.pathname !== '/game' && (
          <>
            <div className="topOverlay">
              <PlayerScore playerName={player1}/>
              <GameTimer/>
              <PlayerScore playerName={player2}/>
            </div>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            
            <PlayerCount />
            <AddUsername />
            <SendMessage />
            <RandomWord />
            <Link to="/game">
              <button onClick={handleStartGame}>Start the fucking game</button>
            </Link>
            <GroundBoarder/>
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
