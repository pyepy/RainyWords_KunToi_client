import '../App.css';
import { Router, Routes, Link } from 'react-router-dom';
import { NavItem, NavLink } from "reactstrap";
import React, { useState, useEffect } from 'react';
import { socket } from '../utils/socket'

import { userLogin, updateLogin } from '../utils/userdata';

import { SendMessage } from '../components/SendMessage';
import { PlayerCount } from '../components/PlayerCount';
import { AddUsername } from '../components/AddUsername';
import { RandomWord } from '../components/RandomWord';
import { Title } from '../components/Title';
import { Menu } from '../components/Menu';

const Home = () => {
  const [login, setLogin] = useState(userLogin)

  //const listItems = [['Create room','/play'], ['Join room','/play'], ['Options','/game'], ['Credits','/credit']];

  console.log("login?")
  console.log(login)

  useEffect(() => {
    socket.on("ack_name", (data) => {
      setLogin(1);
      updateLogin(1);
    });
  },[]);

  if (login == 1) {
    return (
      <div className="AppHome">
        <PlayerCount />
        <Title/>
        <AddUsername/>
        <Menu/>
        {/*<div className='didntTouch'>
          <SendMessage />
          <RandomWord />
          <NavItem tag={Link} to="/game">To Game</NavItem>
    </div>*/}
      </div>
    )
  } else if (login == 0) {
    return (
      <div className="App">
        <PlayerCount />
        <Title/>
        <AddUsername/>
      </div>
    )
  }
  
}

export default Home;

/*let player1 = 'PlayerOne';
  let player2 = 'PlayerTwo';

  return (
      <div className="App">
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
        <NavItem tag={Link} to="/game">To Game</NavItem>
        <GroundBoarder/>
      </div>
  );*/
