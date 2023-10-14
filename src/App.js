import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';
import Layout from './Layout.js'

function App() {
  return (
    <BrowserRouter>
      {<Layout/>}
      {/*<Routes>
        <Route path="/game" element={<Layout/>}></Route>
      </Routes>*/}
    </BrowserRouter>

  );
}

export default App; 

    {/*}
    <Router>
      <div className="App">
        <Routes>
          <Route path="/game" element={<Game />} />
          {/* Other routes can be added here if needed }
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

export default App*/}
