import React, { useState, useEffect } from 'react';
import { socket } from '../utils/socket'
import { useNavigate } from 'react-router-dom';
import { userLogin } from '../utils/userdata';
import goodEgg from '../images/Emu1.png';
import badEgg from '../images/Goose1.png';
import { userName } from '../utils/userdata';

export function LobbyChat() {

    return (
        <div className='lobbyChat'>
            <div className='chatHistory'>                <br></br>
                <br></br>
                <br></br>
                <div className='chatWelcome'>Welcome to the kichen!</div>
                <div className='chatContainer'>
                    <div className='chat'>
                        <div className='chatPlayerName'>Player1</div>
                        <div className='chatMessage'>Hi two</div>
                        <div className='chatMessage'>Hey guys, did you know that in terms of male human and female Pokemon breeding, Vaporeon is the most compatible Pokmon for humans? Not only are they in the field group, which is mostly comprised of mammals, Vaporeon are an average of tall and 63.9 pounds.</div>

                    </div>
                </div>
                
                <div className='myChatContainer'>
                    <div className='chat'>
                        <div className='myChatPlayerName'>{userName}</div>
                        <div className='myChatMessage'>Hey guys, did you know that in terms of male human and female Pokemon breeding, Vaporeon is the most compatible Pokmon for humans? Not only are they in the field group, which is mostly comprised of mammals, Vaporeon are an average of tall and 63.9 pounds.</div>
                        <div className='myChatMessage'>Hey guys, did you know that in terms of male human and female Pokemon breeding, Vaporeon is the most compatible Pokmon for humans? Not only are they in the field group, which is mostly comprised of mammals, Vaporeon are an average of tall and 63.9 pounds.</div>
                        <div className='myChatMessage'>Hey guys, did you know that in terms of male human and female Pokemon breeding, Vaporeon is the most compatible Pokmon for humans? Not only are they in the field group, which is mostly comprised of mammals, Vaporeon are an average of tall and 63.9 pounds.</div>

                    </div>
                </div>
            </div> 
            <input className='chatInput'/>
        </div>
    )

}