import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Game from './game';
import './App.css';
import { SendMessage } from './components/SendMessage';
import { PlayerCount } from './components/PlayerCount';
import { AddUsername } from './components/AddUsername';
import { RandomWord } from './components/RandomWord';
import { GroundBoarder } from './components/GroundBoarder';


function App() {
  const handleStartGame = () => {
    window.location.href="/game" // Refresh the page
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/game" element={<Game />} />
          {/* Other routes can be added here if needed */}
        </Routes>
        
        {window.location.pathname !== '/game' && (
          <>
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
