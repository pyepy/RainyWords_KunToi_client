import React, { useState, useEffect } from 'react';
import { socket } from '../utils/socket';
import { userDiff } from '../utils/userdata';
import crackImage from '../images/crack.gif';

export function Countdown() {
  // Countdown
  const [seeThree, setSeeThree] = useState(false);
  const [seeTwo, setSeeTwo] = useState(false);
  const [seeOne, setSeeOne] = useState(false);
  const [seeStart, setSeeStart] = useState(false);
  const [mode, setMode] = useState(userDiff);

  function request_word() {
    socket.emit('request_word', mode);
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
      const hideCrackGif = setTimeout(() => {
        setSeeStart(false);
        request_word();
        request_word();
      }, 1100); // Hide after 1.1 seconds
      return () => clearTimeout(hideCrackGif);
    }, 3500);

    return () => {
      clearTimeout(timer3on, timer3off, timer2on, timer2off, timer1on, timer1off, timer0on);
    }; // Clean up the timer on component unmount
  }, []);

  return (
    <div className="bigNumber">
      {seeThree && <span className="three">3</span>}
      {seeTwo && <span className="two">2</span>}
      {seeOne && <span className="one">1</span>}
      {seeStart && <img src={crackImage} alt="Crack!" className="start-image" />}
    </div>
  );
}
