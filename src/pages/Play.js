import { SelectLobby } from '../components/SelectLobby.js'
import { LobbyPanel } from '../components/LobbyPanel.js';

const Play = () => {
  return(
    <div className="App">
      <div className='playContainer'>
        <LobbyPanel/>
      </div>

      <div className='notPlayContainer'>
        <SelectLobby/>
      </div>
        

        
    </div>
    
  )
}

export default Play;