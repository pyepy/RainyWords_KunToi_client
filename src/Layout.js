import './App.css';

import React from "react";
import { Container, Row } from "reactstrap";
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home.js';
import Game from './pages/Game.js';

import routes from './routes.js'

function Layout() {

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
  <div>
    <Container>
      <Row>
        <Routes>
					{/*routeComponents*/}
          <Route path="/" exact element={<Home/>}></Route>
          <Route path="/game" element={<Game/>}></Route>
        </Routes>
      </Row>
    </Container>
  </div>
  );
}

export default Layout;