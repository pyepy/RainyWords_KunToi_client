import React, { useState, useEffect } from 'react';
import './Keyboard.css';

export default function Keyboard() {
  const [inputText, setInputText] = useState('');
  const [isCaps, setIsCaps] = useState(false);
  const [isShift, setIsShift] = useState(false);
  const [currentKey, setCurrentKey] = useState(null);

  const [shiftHeld, setShiftHeld] = useState(false);

  function downHandler({ key }) {
    if (key === 'Shift') {
      setShiftHeld(true);
    }
  }

  function upHandler({ key }) {
    if (key === 'Shift') {
      setShiftHeld(false);
    }
  }

  useEffect(() => {
    const handleKeyboardInput = (e) => {
      if (e.key === 'Enter') {
        handleEnterKey();
      } else if (e.key === ' ') {
        handleSpaceKey();
      } else if (e.key === 'CapsLock') {
        handleCapsLock();
      } else if (e.key === 'Tab') {
        handleTabKey();
      } else if (e.key === 'Backspace') {
        handleDeleteKey();
      } else if (e.key === 'Shift') {
        handleShiftKey();
      } else if (e.key.length === 1) {
        handleRegularKey(e.key);
      }
      setCurrentKey(e.key);
    };

    const handleKeyUp = (e) => {
      setCurrentKey(null);
    };

    window.addEventListener('keydown', handleKeyboardInput);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);

    return () => {
      window.removeEventListener('keydown', handleKeyboardInput);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, []);

  const handleKeyClick = (key) => {
    setCurrentKey(key);

    if (key === 'Enter') {
      handleEnterKey();
    } else if (key === ' ') {
      handleSpaceKey();
    } else if (key === 'CapsLock') {
      handleCapsLock();
    } else if (key === 'Tab') {
      handleTabKey();
    } else if (key === '<i className="fa-solid fa-delete-left"></i') {
      handleDeleteKey();
    } else {
      handleRegularKey(key);
    }
  };

  const handleSpaceKey = () => {
    const newContent = inputText + ' ';
    setInputText(newContent);
  };

  const handleEnterKey = () => {
    const newContent = inputText + '\n';
    setInputText(newContent);
  };

  const handleCapsLock = () => {
    const updatedCaps = !isCaps;
    setIsCaps(updatedCaps);
    updateKeyTextCase(updatedCaps, isShift);
  };

  const handleTabKey = () => {
    const newContent = inputText + '\t';
    setInputText(newContent);
  };

  const handleDeleteKey = () => {
    if (inputText.length === 0) {
      return;
    }
    const newContent = inputText.slice(0, inputText.length - 1);
    setInputText(newContent);
  };

const handleShiftKey = () => {
  const updatedShift = !isShift;
  setIsShift(updatedShift);
  setShiftHeld(updatedShift); // Update the Shift key state

  const keys = document.querySelectorAll('.key');
  keys.forEach((key) => {
    if (updatedShift) {
      key.classList.add('shift-held'); // Add the class when Shift is held
    } else {
      key.classList.remove('shift-held'); // Remove the class when Shift is released
    }
  });

  updateKeyTextCase(isCaps, updatedShift);
};


  const handleRegularKey = (key) => {
    const character = (shiftHeld && !isCaps) || (!shiftHeld && isCaps)
      ? key.toUpperCase()
      : key.toLowerCase();

    // Append the new character to the existing input text
    const newContent = inputText + character;
    setInputText(newContent);
  };

  const updateKeyTextCase = (caps, shift) => {
    const keys = document.querySelectorAll('.key');
    keys.forEach((key) => {
      const firstSpanElement = key.querySelector('span:first-child');
      if (firstSpanElement) {
        const keyText = firstSpanElement.innerText.toLowerCase();
        if (!['shift', 'alt', 'ctrl', 'enter', 'caps lock', 'tab'].includes(keyText)) {
          firstSpanElement.innerText =
            (caps && shift) || (!caps && !shift)
              ? keyText.toLowerCase()
              : keyText.toUpperCase();
        }
        if (keyText === 'caps lock') {
          firstSpanElement.parentElement.style.backgroundColor = caps ? 'blue' : '#445760';
        }
        if (keyText === 'shift') {
          firstSpanElement.parentElement.style.backgroundColor = shift ? 'blue' : '#445760';
        }
      }
    });
  };

  return (
    <div className="keyboard">
      <div className="textcontainer">
        <pre>{inputText}</pre>
      </div>
      <div className="keyboardcontainer">
        <div className="container">
          <div className="row">
            {['~.`', '!.1', '@.2', '#.3', '$.4', '%.5', '^.6', '&.7', '*.8', '(.9', ').0', '_.-', '+.=', '<i className="fa-solid fa-delete-left"></i>'].map((keyvalue) => (
              <div key={keyvalue} className={`key ${keyvalue === currentKey || (keyvalue === 'CapsLock' && isCaps) || (keyvalue === 'Shift' && isShift) ? 'active' : ''}`} onClick={() => handleKeyClick(keyvalue)}>
                {keyvalue.includes('.') ? (
                  keyvalue.split('.').map((part, index) => (
                    <span key={index}>{part}</span>
                  ))
                ) : (
                  keyvalue === '<i className="fa-solid fa-delete-left"></i' ? (
                    <i className="fa-solid fa-delete-left"></i>
                  ) : (
                    <span>{keyvalue}</span>
                  )
                )}
              </div>
            ))}
          </div>
          <div className="row">
            {['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '{_[', '}_]', '|_\\'].map((keyvalue) => (
              <div key={keyvalue} className={`key ${keyvalue === currentKey || (keyvalue === 'CapsLock' && isCaps) || (keyvalue === 'Shift' && isShift) ? 'active' : ''}`} onClick={() => handleKeyClick(keyvalue)}>
                {keyvalue.includes('_') ? (
                  keyvalue.split('_').map((part, index) => (
                    <span key={index}>{part}</span>
                  ))
                ) : (
                  <span>{keyvalue}</span>
                )}
              </div>
            ))}
          </div>
          <div className="row">
            {['CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ':_;', `"_'`, 'Enter'].map((keyvalue) => (
              <div key={keyvalue} className={`key ${keyvalue === currentKey || (keyvalue === 'CapsLock' && isCaps) || (keyvalue === 'Shift' && isShift) ? 'active' : ''}`} onClick={() => handleKeyClick(keyvalue)}>
                {keyvalue.includes('_') ? (
                  keyvalue.split('_').map((part, index) => (
                    <span key={index}>{part}</span>
                  ))
                ) : (
                  <span>{keyvalue}</span>
                )}
              </div>
            ))}
          </div>
          <div className="row">
            {['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '<_,', '>_.', '?_/', 'Shift'].map((keyvalue, index) => (
              <div key={keyvalue} className={`key ${keyvalue === currentKey || (keyvalue === 'CapsLock' && isCaps) || (keyvalue === 'Shift' && isShift) ? 'active' : ''}`} onClick={() => handleKeyClick(keyvalue)}>
                {keyvalue.includes('_') ? (
                  keyvalue.split('_').map((part, index) => (
                    <span key={index}>{part}</span>
                  ))
                ) : (
                  <span>{keyvalue}</span>
                )}
              </div>
            ))}
          </div>
          <div className="row">
            {['Ctrl', 'Alt', ' ', 'Ctrl', 'Alt', '<', '>'].map((keyvalue, index) => (
              <div key={keyvalue} className={`key ${keyvalue === currentKey || (keyvalue === 'CapsLock' && isCaps) || (keyvalue === 'Shift' && isShift) ? 'active' : ''}`} onClick={() => handleKeyClick(keyvalue)}>
                <span>{keyvalue}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
