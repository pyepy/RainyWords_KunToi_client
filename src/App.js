import './App.css';

import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Container, Row } from "reactstrap";
import { socket, gameSocket, playSocket } from './utils/socket'

import Home from './pages/Home.js';
import FindRoom from './pages/FindRoom.js';
import Game from './pages/game.js';
import Options from './pages/Options.js';
import Credit from './pages/Credit.js';
import Play from './pages/Play.js'
import EndGame from './pages/EndGame.js'

import routes from './utils/routes.js'
import { userLogin } from './utils/userdata.js'

function App() {      //homepage is moved to /page/Home.js
  const routeComponents = routes.map((r,i) => {
		return r.element ? (
    <Route 
      key = {i} 
      path = {r.path} 
      exact = {r.exact} 
      element = {<r.element/>}
    />
    ) : null;});

  return (
  <BrowserRouter>
    <Container>
      <Row>
        <Routes>
					{/*routeComponents*/}
          <Route path="/" exact element={<Home/>}></Route>
          <Route path="/findRoom" exact element={<FindRoom/>}></Route>
          <Route path="/game" element={<Game/>}></Route>
          <Route path="/options" element={<Options/>}></Route>
          <Route path="/credit" element={<Credit/>}></Route>
          <Route path="/play" element={<Play/>}></Route>
          <Route path="/finish" element={<EndGame/>}></Route>
        </Routes>
      </Row>
    </Container>
  </BrowserRouter>
  );
}

export default App
