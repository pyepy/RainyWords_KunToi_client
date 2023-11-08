import React, { useState, useEffect } from 'react';

export function LobbySetting() {
    const [speedValue, setSpeedValue] = useState(100);
    const [timeMin, setTimeMin] = useState('5');
    const [timeSecond, setTimeSecond] = useState('00');

    const handleSpeedChange = (event) => {
        const value = event.target.value;
        setSpeedValue(value);
    }

    const handleTimeChange = (event) => {
        const value = event.target.value;
        const minutes = Math.floor(value / 60);
        const seconds = (value % 60).toString().padStart(2, '0');
        setTimeMin(minutes);
        setTimeSecond(seconds);
    }

    return (
        <div className='lobbySetting'>
            <div className='settingTitle'>Setting</div>
            <div className='wordSetting'>
                <div className='wordSettingTitle'>Word Difficulty</div>
                <div className='difficulties'>
                    <div className='difficulty easy'>Easy</div>
                    <div className='difficulty medium'>Medium</div>
                    <div className='difficulty hard'>Hard</div>
                </div>
            </div>
            <div className='speedSetting'>
                <div className='speedSettingTitle' >Falling Speed: {speedValue}%</div>
                <input type="range" id="speedInput" 
                min={50} max={200} step={1} defaultValue={100} 
                className='speedInput'
                onChange={handleSpeedChange}
                ></input>
            </div>
            <div className='timeSetting'>
                <div className='timeSettingTitle' >Time: {timeMin}.{timeSecond}</div>
                <input 
                    type="range" 
                    id="timeInput" 
                    min={60} 
                    max={600} 
                    step={30} 
                    value={parseInt(timeMin) * 60 + parseInt(timeSecond)}
                    className='timeInput'
                    onChange={handleTimeChange}
                />
            </div>
        </div>
    )

}