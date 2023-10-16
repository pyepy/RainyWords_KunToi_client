import React, { useState, useEffect } from 'react';
import { socket } from '../socket'

export function Menu(props) {
    const [login, setLogin] = useState(0)
    const [name,setName] = useState("");

    useEffect(() => {
        socket.on("ack_name", (data) => {  //rcv name and namelist from server
            setLogin(1);
            setName(data.name);
            
        });
    
      });

    if (login == 1){
        return (
            <div className="Menu">
              {/* <div className="Username">Welcome, {name}</div> */}
              <ul className="options">
                <li className="notOption">Welcome, <span className='Username'>{name}</span></li>
                {props.items.map((item, index) => (
                    <li className="option" key={index}>
                      {item}

                      {index === 0? (
                        <>
                        <div className="room">
                          Classic
                        </div>
                        <div className="room">
                          Arcade
                        </div>
                        </>
                      ) : null}

                      {index === 1? (
                        <>
                        <div className="roomNumber">
                          Room No.

                          <input className="roomNumberInput" placeholder='00000' maxLength={5}/>
                          <button className="submitRoom">Join</button>
                        </div>
                        </>
                      ) : null}
                    
                    </li> 
                ))}
              </ul>
            </div>
          );
    }else {
        return (
            <div></div>
        )
    }
    
}