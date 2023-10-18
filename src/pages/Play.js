import { SelectLobby } from '../components/SelectLobby.js'
import { LobbyPanel } from '../components/LobbyPanel.js';

const Play = () => {
  return(
    <div className="App">
      <div className='playContainer'>
        <LobbyPanel/>
      </div>

      <div className='notPlayContainer'>
        <div className='leaveRoom'>
          {/* <img src="" alt='leave icon'/> */}
            &lt; leave room
        </div>
        {/* <SelectLobby/> */}
      </div>
        

        
    </div>
    
  )
}

export default Play;