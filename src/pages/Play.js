import { SelectLobby } from '../components/SelectLobby.js'
import { LobbyPanel } from '../components/LobbyPanel.js';
import { socket } from '../socket'
import { useNavigate } from 'react-router-dom';

const Play = () => {
  const navigate = useNavigate();

  const leaveRoom = () => {       
    socket.emit("leave_room");  
    navigate('../');
  }

  return(
    <div className="App">
      <div className='playContainer'>
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