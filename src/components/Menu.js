import React, { useState, useEffect } from 'react';
import { socket } from '../utils/socket'
import { NavItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export function Menu(props) {
  const Create_room = 'Create room';
  const Join_room = 'Join room';

  const navigate = useNavigate();
  const [roomToJoin, setRoomToJoin] = useState('')

  // create room
  const requestCreateRoom = (gameMode) => {   
    socket.emit("request_create_room", {gameMode});          //assign server-side
  }

  useEffect(() => {
    const handleRoomCreated = (data) => {
      navigate('/play');
    };

    socket.on("roomCreated", handleRoomCreated);
  
    // Remove the event listener when the component unmounts to avoid duplicates
    return () => {
      socket.off("roomCreated", handleRoomCreated);
    };
  }, []);

  //join room
  const joinRoom = () => {    
    socket.emit("request_join_room",{roomToJoin});  
  }

  useEffect(() => {
    const handleRoomNotFound = () => {
      console.log('what');
      alert("Room not found");
    };
    //Check room correct
    socket.on("canNotFindRoom", handleRoomNotFound)

    socket.on("roomFound", () => {
      navigate('./play');
    })

    return () => {
      socket.off("canNotFindRoom", handleRoomNotFound);
    };
  }, []);

  return (
    <div className="Menu">
      <ul className="options">
        {props.items.map((item, index) => (
          <li className="option" key={index}>
            {item[0] === Create_room ? (
              <>
                {item[0]}
                  <div className="room" onClick={() => requestCreateRoom("Classic")}>
                    Classic
                  </div>
                <div className="room" onClick={() => requestCreateRoom("Arcade")}>
                  Arcade
                </div>
              </>
            ) : null}

            {item[0] === Join_room ? (
              <>
                {item[0]}
                <div className="roomNumber">
                  Room No.

                  <input 
                    className="roomNumberInput" 
                    placeholder='00000' 
                    maxLength={5}
                    onChange={(event) => {
                      setRoomToJoin(event.target.value);
                    }}
                  />

                  <button className="submitRoom" onClick={joinRoom}>Join</button>
                </div>
              </>
            ) : null}

            {item[0] !== Create_room && item[0] !== Join_room ? (
              <>
                <NavItem tag={Link} to={item[1]}>
                  {item[0]}
                </NavItem>
              </>
            ) : null}

          </li> 
        
        ))}
      </ul>

    </div>
  );   
}