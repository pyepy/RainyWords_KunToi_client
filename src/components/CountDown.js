import React, { useState, useEffect } from 'react';
import { socket } from '../utils/socket'
import { useNavigate } from 'react-router-dom';
import { userLogin } from '../utils/userdata';

export function Countdown() {
  //Countdown
  const [seeThree, setSeeThree] = useState(false);
  const [seeTwo, setSeeTwo] = useState(false);
  const [seeOne, setSeeOne] = useState(false);
  const [seeStart, setSeeStart] = useState(false);

  function request_word() {
    socket.emit("request_word",4);
  }

  useEffect(() => {
    const timer3on = setTimeout(() => {
      setSeeThree(true);
      request_word();
      request_word();
    }, 500); 

    const timer3off = setTimeout(() => {
      setSeeThree(false);
      request_word();
      request_word();
    }, 1500); 

    const timer2on = setTimeout(() => {
      setSeeTwo(true);
      request_word();
      request_word();
    }, 1500); 

    const timer2off = setTimeout(() => {
      setSeeTwo(false);
      request_word();
      request_word();
    }, 2500); 

    const timer1on = setTimeout(() => {
      setSeeOne(true);
      request_word();
      request_word();
    }, 2500); 

    const timer1off = setTimeout(() => {
      setSeeOne(false);
      request_word();
      request_word();
    }, 3500); 

    const timer0on = setTimeout(() => {
      setSeeStart(true);
      request_word();
      request_word();
    }, 3500); 

    const timer0off = setTimeout(() => {
      setSeeStart(false);
      request_word();
      request_word();
    }, 5000); 

    return () => clearTimeout(timer3on , timer3off, timer2on , timer2off, timer1on , timer1off, timer0on , timer0off); // Clean up the timer on component unmount
  }, []);

  return (
    
        <div className='bigNumber'>
          {seeThree && <span className='three'>3</span>}
          {seeTwo && <span className='two'>2</span>}
          {seeOne && <span className='one'>1</span>}
          {seeStart &&  <span className='start'>Crack!</span>}
        </div>
  )
}