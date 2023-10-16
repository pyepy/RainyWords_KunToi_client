import React, { useState, useEffect } from 'react';

const Example = () => {
  const [keyboardStatus, setKeyboardStatus] = useState('');

  useEffect(() => {
    const handleKeyboardShow = () => {
      setKeyboardStatus('Keyboard Shown');
    };

    const handleKeyboardHide = () => {
      setKeyboardStatus('Keyboard Hidden');
    };

    window.addEventListener('keyboardDidShow', handleKeyboardShow);
    window.addEventListener('keyboardDidHide', handleKeyboardHide);

    return () => {
      window.removeEventListener('keyboardDidShow', handleKeyboardShow);
      window.removeEventListener('keyboardDidHide', handleKeyboardHide);
    };
  }, []);

  return (
    <div style={style.container}>
      <input
        style={style.input}
        placeholder="Click here…"
        onBlur={() => setKeyboardStatus('Keyboard Hidden')}
        onFocus={() => setKeyboardStatus('Keyboard Shown')}
      />
      <p style={style.status}>{keyboardStatus}</p>
    </div>
  );
};

const style = {
  container: {
    padding: 36,
  },
  input: {
    padding: '10px',
    borderWidth: '0.5px',
    borderRadius: '4px',
  },
  status: {
    padding: '10px',
    textAlign: 'center',
  },
};

export default Example;
