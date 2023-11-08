import React, { useState, useEffect } from 'react';
import { socket } from '../utils/socket'
import { useNavigate } from 'react-router-dom';
import { userLogin } from '../utils/userdata';
import goodEgg from '../images/Emu5.png';
import badEgg from '../images/Goose5.png';
import badBadEgg from '../images/MuslimEgg.png'

export function Legend() {

    return (
        <div className='legend'> 
            <div className='legendTitle'>Special Eggs</div>
            <div className='legendEggContainer'>
                <div className='legendEgg'>
                    <img className="eggPic egg" src={goodEgg}/>
                    <div className='freeze eggLabel'>Freeze</div>
                </div>
                <div className='legendEgg'>
                    <img className="eggPic egg" src={goodEgg}/>
                    <div className='slow eggLabel'>Slow</div>
                </div>
                <div className='legendEgg'>
                    <img className="eggPic egg" src={goodEgg}/>
                    <div className='easyWord eggLabel'>Easy Words</div>
                </div>
                <div className='legendEgg'>
                    <img className="eggPic egg" src={badEgg}/>
                    <div className='blind eggLabel'>Blind</div>
                </div>
                <div className='legendEgg'>
                    <img className="eggPic egg" src={badEgg}/>
                    <div className='flood eggLabel'>Flood</div>
                </div>
                <div className='legendEgg'>
                    <img className="eggPic egg" src={badBadEgg}/>
                    <div className='nword eggLabel'>Danger Words</div>
                </div>
                {/* <div className='legendEgg'>
                    <img className="eggPic" src={badEgg}/>
                    <div className='speedUp'>Speed up</div>
                </div> */}
                
            </div>
        </div>
    )

}