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
import { Title } from './components/Title';
import { Menu } from './components/Menu';

function App() {
  const handleStartGame = () => {
    window.location.href="/game" // Refresh the page
  };

  const listItems = ['Play Classic', 'Play NON-classic', 'Options', 'Credits'];

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

            <Title/>

            <AddUsername/>
            <Menu items={listItems} />
            <div className='didntTouch'>
            <SendMessage />
              <RandomWord />
              <Link to="/game">
                <button onClick={handleStartGame}>Start the fucking game</button>
              </Link>
            </div>
            
            

          </>
        )}
      </div>
    </Router>
  );
}

export default App;
