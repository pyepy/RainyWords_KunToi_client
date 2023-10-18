import React, { useState, useEffect } from 'react';
import { socket } from '../socket'
import { NavItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export function Menu(props) {
  const Create_room = 'Create room';
  const Join_room = 'Join room';

  const navigate = useNavigate();

  const requestCreateRoom = (gameMode) => {   
    socket.emit("request_create_room", {gameMode});          //assign server-side
  }

  useEffect(() => {
    const handleRoomCreated = (data) => {
      console.log(data.myRoom);
      // Use the history object for navigation, assuming you're using React Router
      //window.location.href = '/play';
      navigate('/play');
    };
  
    // Add the event listener when the component mounts
    socket.on("roomCreated", handleRoomCreated);
  
    // Remove the event listener when the component unmounts to avoid duplicates
    return () => {
      socket.off("roomCreated", handleRoomCreated);
    };
  }, []);

  // window.addEventListener("beforeunload", () => {
  //   socket.disconnect();
  // });

  return (
    <div className="Menu">
      <ul className="options">
        {props.items.map((item, index) => (
          <li className="option" key={index}>
            {item[0] === Create_room ? (
              <>
                {item[0]}
                {/* <NavItem tag={Link} to={item[1]}> */}
                  <div className="room" onClick={() => requestCreateRoom("Classic")}>
                    Classic
                  </div>
                {/* </NavItem> */}
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

                  <input className="roomNumberInput" placeholder='00000' maxLength={5}/>
                  {/* <NavItem tag={Link} to={item[1]}> */}
                    <button className="submitRoom">Join</button>
                  {/* </NavItem> */}
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