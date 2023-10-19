import React, { useState, useEffect, useRef } from 'react';
import { socket } from '../socket';

export function RandomWord() {
  const [word, setWord] = useState('');
  const [len, setLen] = useState(0);
  const [mode, setMode] = useState('');
  const [clickCount, setClickCount] = useState(0);
  const [wordList, setWordList] = useState([]); // State to store the list of words
  let delay = 7000;

  const buttonRef = useRef();

  const reqLen = () => {
    socket.emit('request_len', mode);
  };

  useEffect(() => {
    const button = buttonRef.current;

    socket.once('send_len', (receivedLen) => {
      setLen(receivedLen);
      socket.emit('request_word', receivedLen);
    });

    socket.once('send_word', (data) => {
      setWordList((prevWordList) => {
        // Remove the first word if the list length exceeds 5
        if (prevWordList.length >= 5) {
          prevWordList.shift();
        }
        return [...prevWordList, data.word];
      });
    });

    const autoClick = () => {
      if (clickCount < 2) {
        reqLen();
        setClickCount(clickCount + 1);
        setTimeout(autoClick, delay);  //delay
      }
    };

    autoClick();
  }, [wordList]); // Include wordList in the dependency array

  // return (
  //   <div>
  //     <input
  //       placeholder="1/2/3"
  //       onChange={(event) => {
  //         setMode(event.target.value);
  //       }}
  //     />
  //     <button ref={buttonRef} onClick={reqLen}>
  //       Request Word
  //     </button>
  //     <h1>Words:</h1>
  //     <p>{wordList.join(', ')}</p>
  //     <h1>Length: {len}</h1>
  //   </div>
  // );

  return [...new Set(wordList)];
}