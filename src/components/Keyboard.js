import React, { useState, useEffect } from 'react';
import './Keyboard.css'; 

export default function Keyboard() { 
	const [inputText, setInputText] = useState(''); 
	const [isCaps, setIsCaps] = useState(false); 
	const [isShift, setIsShift] = useState(false); 
    const [currentKey, setCurrentKey] = useState(null);
    const [shiftHeld, setShiftHeld] = useState(false);
  
    function upHandler({key}) {
      if (key === 'Shift') {
        setShiftHeld(false);
      }
    }

    useEffect(() => {
        const handleKeyDown = (e) => {
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
            setShiftHeld(true);
            handleShiftKey();
          } else if (e.key.length === 1) {
            handleRegularKey(e.key);
          }
          setCurrentKey(e.key);
        };

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', upHandler);

        // Cleanup the event listener when the component unmounts
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', upHandler);
        };
    }, [inputText, isCaps, isShift, shiftHeld]
    );

	const handleKeyClick = (key) => { 
        setCurrentKey(key);
		if (key === 'Enter') { 
			handleEnterKey(); 
		} 
		else if(key === "Ctrl" || key === "Alt" || key === '<' || key === '>') { 
		}else if (key === ' ') { 
			handleSpaceKey(); 
		} else if (key === 'Caps Lock') { 
			handleCapsLock(); 
		} else if (key === '<i className="fa-solid fa-delete-left"></i>') { 
			handleDeleteKey(); 
		} else if (key === 'Shift') { 
			handleShiftKey(); 
		} else if (key === 'Tab') { 
			handleTabKey(); 
		} else { 
			handleRegularKey(key); 
		} 
	}; 

	const handleSpaceKey = () => { 
		const newContent = inputText + '\u00A0'; 
		setInputText(newContent); 
	}; 

	const handleEnterKey = () => { 
		const newContent = ''; 
		setInputText(newContent); 
	}; 

	const handleCapsLock = () => { 
		const updatedCaps = !isCaps; 
		setIsCaps(updatedCaps); 
		const keys = document.querySelectorAll('.key'); 
		keys.forEach((key) => { 
			const firstSpanElement = key.querySelector('span:first-child'); 
			if (firstSpanElement) { 
				const keyText = firstSpanElement.innerText.toLowerCase(); 
				if (!['shift', 'alt', 'ctrl', 'enter', 'caps lock', 'tab'] 
					.includes(keyText)) { 
					firstSpanElement.innerText = 
					((updatedCaps && isShift) || (!updatedCaps && !isShift)) 
					? keyText.toLowerCase() : keyText.toUpperCase(); 
				} 
				if (keyText === 'caps lock') { 
					firstSpanElement.parentElement.style.backgroundColor = 
					(updatedCaps) ? '#E1C78F' : '#FAE7C9'; 
				} 
			} 
		}); 
	}; 
    
	const handleTabKey = () => { 
		const newContent = inputText + ' '; 
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
        // Toggle the isShift state and shiftHeld state
        setIsShift(!isShift);
        setShiftHeld(!isShift);
    
        // Update key labels to display uppercase or lowercase characters
        const keys = document.querySelectorAll('.key');
        keys.forEach((key) => {
          const firstSpanElement = key.querySelector('span:first-child');
          if (firstSpanElement) {
            const keyText = firstSpanElement.innerText.toLowerCase();
            if (!['shift', 'alt', 'ctrl', 'enter', 'caps lock', 'tab'].includes(keyText)) {
              firstSpanElement.innerText = isShift ? keyText.toUpperCase() : keyText.toLowerCase();
            }
            if (keyText === 'shift') {
              firstSpanElement.parentElement.style.backgroundColor = isShift ? '#E1C78F' : '#FAE7C9';
            }
          }
        });
      };
    
    const handleRegularKey = (key) => {
        const keys = key.split(/[._]/);
        let newContent;
    
        if (keys.length > 1) {
            if (shiftHeld) {
                if (keys.length === 3) {
                    if (keys[0] === '>') newContent = inputText + '>';
                    else newContent = inputText + '_';
                } else newContent = inputText + keys[0];
            } else {
                if (keys.length === 3) {
                    if (keys[0] === '>') newContent = inputText + '.';
                    else newContent = inputText + '-';
                } else newContent = inputText + keys[1];
            }
        } else {
            let character = ((shiftHeld && isCaps) || (!shiftHeld && !isCaps))
                ? key.toLowerCase()
                : key.toUpperCase();
            newContent = inputText + character;
        }
    
        setInputText(newContent);
    };
    

    return (
        <div className="keyboard">
          {/* <div className="textcontainer">
            <pre>{inputText}</pre>
          </div> */}
          <div className="keyboardcontainer">
            <div className="containerK">
              <div className="row">
                {['~.`', '!.1', '@.2', '#.3', '$.4', '%.5', '^.6', '&.7', '*.8', '(.9', ').0', '_.-', '+.=', 'del'].map((keyvalue) => (
                  <div key={keyvalue} className={`key ${keyvalue === currentKey ? 'active' : ''}`} onClick={() => handleKeyClick(keyvalue)}>
                    {keyvalue.includes('.') ? (
                      keyvalue.split('.').map((part, index) => (
                        <span key={index}>{part}</span>
                      ))
                    ) : (
                      keyvalue === '<i className="fa-solid fa-delete-left"></i>' ? (
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
                  <div key={keyvalue} className={`key ${keyvalue === currentKey ? 'active' : ''}`} onClick={() => handleKeyClick(keyvalue)}>
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
                {['Caps Lock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ':_;', `"_'`, 'Enter'].map((keyvalue) => (
                  <div key={keyvalue} className={`key ${keyvalue === currentKey ? 'active' : ''}`} onClick={() => handleKeyClick(keyvalue)}>
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
                  <div key={index} className={`key ${keyvalue === currentKey ? 'active' : ''}`} onClick={() => handleKeyClick(keyvalue)}>
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
                  <div key={index} className={`key ${keyvalue === currentKey ? 'active key' : 'key'}`} onClick={() => handleKeyClick(keyvalue)}>
                    <span>{keyvalue}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
	) 
} 