import '../App.css';
import { SendMessage } from '../components/SendMessage';
import { PlayerCount } from '../components/PlayerCount';
import { AddUsername } from '../components/AddUsername';
import { RandomWord } from '../components/RandomWord';
import { GroundBoarder } from '../components/GroundBoarder';
import { GameTimer } from '../components/GameTimer';
import { PlayerScore } from '../components/PlayerScore';

import { Router, Routes, Link } from 'react-router-dom';
import { NavItem, NavLink } from "reactstrap";

const Home = () => {
  let player1 = 'PlayerOne';
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
  );
}

export default Home;
