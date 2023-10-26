import React, { useState, useEffect } from 'react';
import { socket } from '../utils/socket'
import { useNavigate } from 'react-router-dom';

export function PlayerScore(props) {
  const navigate = useNavigate();
  const [players,setPlayers] = useState([['Alice',420],['Bob',69]]);

  const seperateScore = function (l) {
    let n = [];
    console.log(l)
    for (let i = 0; i < l.length; i++) {
      let user = l[i];
      console.log(user);
      console.log(user["name"],user["score"]);
      n.push([user.score,user.name])
    }
    return n.sort((a, b) => a[0] - b[0]).reverse();
  }

  const sendScoreReq = () => {    //temp function
    socket.emit("req_update_score",{"word":"hi"})
  }

  useEffect(() => {
    socket.on("send_score", (data) => {
      let n = seperateScore(data.namelist)
      setPlayers(n);
    });

  },[])

  const toEndGame = () => {
    navigate('../finish');
  }

    return (
        <div className="PlayerScores">
            {players.map(([playerScore, playerName], index) => (
              <div key={index} className="PlayerScore">
                {playerName} : {playerScore}
              </div>
            ))}
            <button onClick = {sendScoreReq}>Hi</button>
            <button onClick = {toEndGame}>dont press</button>
        </div>
    )
}