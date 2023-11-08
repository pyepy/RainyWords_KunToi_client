import React, { useState, useEffect, useRef } from 'react';
import { socket } from "../utils/socket";

export function InitialRandomWord() {
  const [wordList, setWordList] = useState([]);
  const [mode, setMode] = useState('');
  let numberOfInitialWords = 10;

  useEffect(() => {
    const reqLen = () => {
      socket.emit('request_len', mode);
    };

    const reqWord = (receivedLen, words) => {
      socket.emit('request_word', mode);
      socket.once('send_word', (data) => {
        if (!words.includes(data.word)) {
          words.push(data.word);
          if (words.length === numberOfInitialWords) {
            setWordList(words);
          }
        } else {
          reqWord(receivedLen, words); // Request a new word if it's a duplicate
        }
      });
    };

    const fetchData = async () => {
      reqLen();
      const receivedLen = await new Promise((resolve) => {
        socket.once('send_len', (len) => {
          resolve(len);
        });
      });

      const words = [];
      for (let i = 0; i < numberOfInitialWords; i++) {
        reqWord(receivedLen, words);
      }
    };

    fetchData();
  }, [mode]); // Only run this effect when mode changes

  return [...new Set(wordList)];
}
