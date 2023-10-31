import { useState, useEffect, useRef } from "react";
import { Router, Routes, Link } from 'react-router-dom';
import { NavItem, NavLink } from "reactstrap";
import { socket } from  "../utils/socket.js"
import { useNavigate } from 'react-router-dom';
import { userLogin } from '../utils/userdata.js';

export function EndScreen () {

  const navigate = useNavigate();

  const [players, setPlayers] = useState([]);
  const [winner, setWinner] = useState([300,'Player1']);
  const [losers, setLosers] = useState([[150,'Player2'],[69,'Player3']]);

  const seperateScore = function (l) {
    let n = [];
    console.log(l)
    for (let i = 0; i < l.length; i++) {
      let user = l[i];
      console.log(user);
      console.log(user.name,user.score);
      n.push([user.score,user.name])
    }
    return n.sort((a, b) => b[0] - a[0]);
  }

  useEffect(() => {
    if (userLogin == 1) {
      let noChange = true;
      socket.emit('addScore', {noChange});
    }
  })

  useEffect(() => {
    socket.once("timesUp", () => {
      socket.emit('game_leaderboard');
    })

    socket.once("final_score", (data) => {
      let n = seperateScore(data.namelist);
      console.log(n)
      let w = n[0]
      setWinner(n[0]);   //cannot set here
      let l = n.slice(1);
      setLosers(l);     //cannot set here
      console.log(w,winner)
      console.log(l,losers)
    })

    socket.on("forced_kick", () => {
      navigate('../');
    })

    socket.on("forced_to_lobby", () => {
      navigate('../play');
    })

  },[])

  const goToHome = () => {
    socket.emit("reset_user");
  }

  const restartGame = () => {
    socket.emit("play_again");
  }

  return (
    // <div className="FinalScores">
    //   <h1>{winner[1]} : {winner[0]}</h1>
    //     {losers.map(([score, name], index) => (
    //       <div key={index} className="PlayerScore">
    //         {name} : {score}
    //       </div>
    //     ))}
    //     <NavItem tag={Link} to="/">Exit Game</NavItem>
    //     <button onClick={hello}>Clock</button>
    // </div>
    <div className="midScreenContainer">
      <div className="finalScores">

        <div className="winner">
          {console.log(winner)}
          {console.log(losers)}
          <div className="winnerName">
            {winner[1]} wins
          </div>
          <div className="winnerScore">
            --- {winner[0]} points ---
          </div>
        </div>

        {losers.map(([score, name], index) => (
          <div key={index} className="looser">
            {name} : {String(score)} points
          </div>
        ))}
        
        {/* <div  className="looser">
          Bob : 150 points
        </div>
        <div  className="looser">
          noob : 69 points
        </div> */}
      </div>
      <div className='endButtons'>
        <button className='button' onClick={goToHome}>Home</button>
        {losers[0] != undefined ? <button className='button' onClick={restartGame}>Play Again</button> : null}
        
      </div>
    
        {/* <NavItem tag={Link} to="/">Exit Game</NavItem>
        <button onClick={hello}>Clock</button> */}
      

    </div>
    
  )
}