import React, { useState, useEffect } from 'react';
import { socket } from "../utils/socket";

export function RandomWord() {
  const [word, setWord] = useState('');
  const [len, setLen] = useState(0);
  const [mode, setMode] = useState('');

  const reqWord = () => {
    socket.emit('request_len', mode);
  };

  useEffect(() => {
    const fetchWord = () => {
      reqWord();

      socket.once('send_len', (receivedLen) => {
        setLen(receivedLen);
        socket.emit('request_word', receivedLen);
      });

      socket.once('send_word', (data) => {
        setWord(data.word);
      });
    };

    // Check if we haven't received a word yet, then fetch one
    if (!word) {
      fetchWord();
    }
  }, [word]);

  return word;
}
