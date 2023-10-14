import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';

import Layout from './Layout.js'


import { Title } from './components/Title';
import { Menu } from './components/Menu';


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


  const listItems = ['Play Classic', 'Play NON-classic', 'Options', 'Credits'];


    {/*}
    <Router>
      <div className="App">
        <Routes>
          <Route path="/game" element={<Game />} />
          {/* Other routes can be added here if needed }
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

export default App*/}
