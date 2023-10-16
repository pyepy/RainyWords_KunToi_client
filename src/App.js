import './App.css';

import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Container, Row } from "reactstrap";

import Home from './pages/Home.js';
import FindRoom from './pages/FindRoom.js';
import Game from './pages/game.js';

import routes from './routes.js'

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
        </Routes>
      </Row>
    </Container>
  </BrowserRouter>
  );
}

export default App
