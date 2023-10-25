import React, { useState, useEffect } from 'react';
import { socket } from '../utils/socket'

export function PlayerScore(props) {
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
    return n;
  }

  const sendScoreReq = () => {    //temp function
    socket.emit("req_update_score",{"word":"hi"})
  }

  useEffect(() => {
    socket.on("send_score", (data) => {
      let n = seperateScore(data.namelist)
      console.log(n,n.sort().reverse())
      setPlayers(n.sort().reverse());
    });

  },[])

    return (
        <div className="PlayerScores">
            {players.map(([playerScore, playerName], index) => (
              <div key={index} className="PlayerScore">
                {playerName} : {playerScore}
              </div>
            ))}
            <button onClick = {sendScoreReq}>Hi</button>
        </div>
    )
}