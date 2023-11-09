import React, { useState, useEffect } from 'react';
import { socket } from '../utils/socket'
import { NavItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import MasterOfPuppets from '../images/songs/EggMenuMastered.wav';

export function Menu(props) {
  const Create_room = 'Create room';
  const Join_room = 'Join room';

  const navigate = useNavigate();
  const [roomToJoin, setRoomToJoin] = useState('')


  const [audio] = useState(new Audio(MasterOfPuppets));
  const playSong = () => {
    audio.play().catch(error => console.error("Failed to play audio:", error));
  };
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

  //enter Practice
  useEffect(() => {
    const handlePracticeRoomCreated = (data) => {
      const wordDifficultyLevel = 2;
      const timeInSec = 300;
      const speedMultiplier = 1;
      socket.emit("request_start_game",{wordDifficultyLevel, timeInSec, speedMultiplier}); 
    };

    socket.on("practiceRoomCreated", handlePracticeRoomCreated);
    
    return () => {
      socket.off("practiceRoomCreated", handlePracticeRoomCreated);
    };
  }, []);

  useEffect(() => {
    const handleGameStart = (data) => {
      navigate('../game');
    };

    socket.on("goToGame", handleGameStart);
  
    return () => {
      socket.off("goToGame", handleGameStart);
    };
  }, []);

  useEffect(() => {
    // Set audio to loop
    audio.loop = true;

    // Play the song when the component mounts
    playSong();

    return () => {
        // Stop the song when the component unmounts
        audio.pause();
    };
  },[audio])

  const goToCredits = () => {
    navigate('./credit');
  };

  return (
    <div className="Menu">
      <ul className="options">

        <li className="option" onClick={() => requestCreateRoom("Private")}>
          Create room
          {/* <div className="room" onClick={() => requestCreateRoom("Public")}>
            Public
          </div>
          <div className="room" onClick={() => requestCreateRoom("Private")}>
            Private
          </div> */}
        </li>

        <li className="option">
          Join room
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
        </li>

        <li className="option" onClick={() => requestCreateRoom("Practice")}>Practice</li>
        {/* <li className="option" onClick={goToCredits}>Credits</li> */}
          
      </ul>

    </div>
  );   
}