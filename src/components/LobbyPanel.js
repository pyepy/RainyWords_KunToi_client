import React, { useState, useEffect } from 'react';
import { socket } from '../socket'
import playerIcon from '../images/playerIcon.png';

export function LobbyPanel() {

    return (
        <div className="lobbyContainer">
            <div className='gameMode'>
                Classic Mode
            </div>
            <div className='lobbyCount'>
                <span>player : 1/2</span>
                <span className='waiting'>waiting... </span>
            </div>
            <div className='players'>
                <div className='player'>
                    <img className="playerIcon" src={playerIcon}/>
                     player 1
                </div>
                <div className='player'>
                    <img className="playerIcon" src={playerIcon}/>
                    player 2
                </div>
            </div>
            <button className='startGame'>Start Game</button>
            

        </div>
    )
}