import '../App.css';
import { SendMessage } from '../components/SendMessage';
import { PlayerCount } from '../components/PlayerCount';
import { AddUsername } from '../components/AddUsername';
import { RandomWord } from '../components/RandomWord';
import { GroundBoarder } from '../components/GroundBoarder';
import { GameTimer } from '../components/GameTimer';
import { PlayerScore } from '../components/PlayerScore';
import { Title } from '../components/Title';
import { Menu } from '../components/Menu';

import { Router, Routes, Link } from 'react-router-dom';
import { NavItem, NavLink } from "reactstrap";

const Home = () => {
  const listItems = ['Play Classic', 'Play NON-classic', 'Options', 'Credits'];

  return (
    <div className="App">
      <PlayerCount />

      <Title/>

      <AddUsername/>
      <Menu items={listItems} />
      <div className='didntTouch'>
        <SendMessage />
        <RandomWord />
        <NavItem tag={Link} to="/game">To Game</NavItem>
      </div>
    </div>
  );
}

export default Home;
