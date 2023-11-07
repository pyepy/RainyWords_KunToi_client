import React, { useState, useEffect , useRef} from 'react';
import { socket } from '../utils/socket'
import { useNavigate } from 'react-router-dom';
import { userLogin } from '../utils/userdata';
import goodEgg from '../images/Emu1.png';
import badEgg from '../images/Goose1.png';
import { userName } from '../utils/userdata';


export function LobbyChat() {

    const [messages,setMessages] = useState([['','']]);
    const [inputMessage, setInputMessage] = useState('');
    const chatHistoryRef = useRef(null);

    const handleInputKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent the Enter key from adding a new line
            if (inputMessage.trim() !== '') {
                const myMessage = inputMessage
                socket.emit("send_lobby_message",{userName, myMessage} ); 
    
            }
        }
    };

    useEffect(() => {
        socket.on("send_Lobby_message", (data) => {  
            setMessages([...messages, [data.name, data.message]]);
            setInputMessage('');
        })
    }, [messages]);

    useEffect(() => {
        if (chatHistoryRef.current) {
            chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div className='lobbyChat'>
            <div className='chatHistory' ref={chatHistoryRef}>                
                <br/>
                <br/>
                <br/>
                <div className='chatWelcome'>Welcome to the kichen!</div>
                {messages.map(([name, message],index) => (
                    name === '' ? null:
                    name === userName ? (
                        <div key={index} className='myChatContainer'>
                            {console.log(userName)}
                            {console.log(name)}
                            <div className='chat'>
                                <div className='myChatPlayerName'>{name}</div>
                                <div className='myChatMessage'>{message}</div>
                            </div>
                        </div>
                    ) : (
                        <div key={index} className='chatContainer'>
                            <div className='chat'>
                                <div className='chatPlayerName'>{name}</div>
                                <div className='chatMessage'>{message}</div>
                            </div>
                        </div>
                    )
                ))}
            </div> 
            <input
                className="chatInput"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleInputKeyDown}
                placeholder="Type a message here"
            />
        </div>
    )

}