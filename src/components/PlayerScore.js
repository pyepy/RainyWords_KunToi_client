import React, { useState, useEffect } from 'react';
import { socket } from '../utils/socket'

export function PlayerScore(props) {
  const [players,setPlayers] = useState([['Alice',420],['Bob',69]]);

  const seperateScore = function (l) {
    let n = [];
    console.log(l)
    for (let i = 0; i < 2; i++) {
      let user = l[i];
      console.log(user);
      console.log(user["name"],user["score"]);
      n.push([user["name"],user["score"]])
    }
    return n;
  }

  const sendScoreReq = () => {    //temp function
    socket.emit("req_update_score",{"word":"hi"})
  }

  useEffect(() => {
    socket.on("send_score", (data) => {
      let n = [];
      let l = (data.namelist).length;
      for (let i = 0; i < l; i++) {
        let user = (data.namelist)[i];
        console.log(user)
        console.log(Object.keys(user));
        n.push([user.name,user.score]);
        //n.push([user.score,user.name])
    }
    //n.sort().reverse
    setPlayers(n);
    });

  },[players])

    return (
        <div className="Playerplayers">
            {players.map(([playerName, playerScore], index) => (
              <div key={index} className="PlayerScore">
                {playerName} : {playerScore}
              </div>
            ))}
            <button onClick = {sendScoreReq}>Hi</button>
        </div>
    )
}