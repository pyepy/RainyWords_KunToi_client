import { LobbyPanel } from '../components/LobbyPanel.js';
import { socket } from '../utils/socket.js';
import { useEffect } from "react"; 
import { useNavigate } from 'react-router-dom';
import { userLogin } from '../utils/userdata';
import { LobbySetting } from '../components/LobbySetting.js';

const Play = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (userLogin == 0) {
      console.log(userLogin)
      navigate("../");
    }

    socket.on("nuke_incoming", (data) => {
      alert("Restarting Server...")
      console.log("hi")
      const reset = setTimeout(navigate("../"),10000)
    })
  },[])

  const leaveRoom = () => {       
    socket.emit("leave_room");  
    navigate('../');
  }

  return(
    <div className="App">
      <div className='playContainer'>
        {/* <LobbySetting/> */}
        <LobbyPanel/>
      </div>

      <div className='notPlayContainer'>
        <div className='leaveRoom' onClick={leaveRoom}>
          {/* <img src="" alt='leave icon'/> */}
            &lt; leave room
        </div>
        {/* <SelectLobby/> */}
      </div>
        

        
    </div>
    
  )
}

export default Play;