import { useState, useEffect, useRef } from "react";
import { Router, Routes, Link } from 'react-router-dom';
import { NavItem, NavLink } from "reactstrap";
import { socket } from  "../utils/socket.js"

export function EndScreen () {
  const [players, setPlayers] = useState([]);
  const [winner, setWinner] = useState([]);
  const [losers, setLosers] = useState([[]]);

  const seperateScore = function (l) {
    let n = [];
    console.log(l)
    for (let i = 0; i < l.length; i++) {
      let user = l[i];
      console.log(user);
      console.log(user.name,user.score);
      n.push([user.score,user.name])
    }
    return n.sort((a, b) => a[0] - b[0]);
  }

  const routeBack = function () {
    socket.emit("routeback");
  }

  const hello = function () {
    socket.emit("game_leaderboard","")
    let n = [[169,"Alice"],[42,"Bob"],[100,"Noob"]];
    n.sort((a, b) => b[0] - a[0]);
    console.log(n,n.length);
    setWinner(n[n.length]);
    console.log(winner)
    let l = n.slice(n.length-1)
    setLosers(l.reverse());
    console.log(losers)
  }

  useEffect(() => {

    //routeRef.current.addEventListener('click',routeBack);

    /*const forceKick = setTimeout(() => {
      routeRef.current.click();
    },10000)*/

    socket.on("final_score", (data) => {
      let n = seperateScore(data.namelist);
      console.log(n)
      let w = n[0]
      setWinner(w);   //cannot set here
      let l = n.slice(-2)
      setLosers(l);     //cannot set here
      console.log(w,winner)
      console.log(l,losers)
    })
  },[players])

  return (
    <div className="PlayerScores">
      <h1>{winner[1]} : {winner[0]}</h1>
        {losers.map(([score, name], index) => (
          <div key={index} className="PlayerScore">
            {name} : {score}
          </div>
        ))}
        <NavItem tag={Link} to="/">Exit Game</NavItem>
        <button onClick={hello}>Clock</button>
    </div>
  )
}