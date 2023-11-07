import React, { useState, useEffect } from 'react';
import { socket } from '../utils/socket'
import { useNavigate } from 'react-router-dom';
import { userLogin } from '../utils/userdata';
import goodEgg from '../images/Emu1.png';
import badEgg from '../images/Goose1.png';

export function Legend() {

    return (
        <div className='legend'> 
            <div className='legendTitle'>Special Eggs</div>
            <div className='legendEggContainer'>
                <div className='legendEgg'>
                    <img className="eggPic" src={goodEgg}/>
                    <div className='freeze'>Freeze</div>
                </div>
                <div className='legendEgg'>
                    <img className="eggPic" src={goodEgg}/>
                    <div className='slow'>Slow</div>
                </div>
                <div className='legendEgg'>
                    <img className="eggPic" src={goodEgg}/>
                    <div className='easyWord'>Easy Words</div>
                </div>
                <div className='legendEgg'>
                    <img className="eggPic" src={badEgg}/>
                    <div className='blind'>Blind</div>
                </div>
                <div className='legendEgg'>
                    <img className="eggPic" src={badEgg}/>
                    <div className='flood'>Flood</div>
                </div>
                <div className='legendEgg'>
                    <img className="eggPic" src={badEgg}/>
                    <div className='nword'>Danger Words</div>
                </div>
                <div className='legendEgg'>
                    <img className="eggPic" src={badEgg}/>
                    <div className='speedUp'>Speed up</div>
                </div>
                
            </div>
        </div>
    )

}