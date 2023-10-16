import '../App.css';
import { PlayerScore } from "../components/PlayerScore";
import { GroundBoarder } from '../components/GroundBoarder';
import { Timer } from '../components/Timer';
import { FallingObject } from '../components/Rain';

const FindRoom = () => {  
    return (
      <div className="App">
        <div className='topOverlay'>
        <PlayerScore playerName="one"/>
        <Timer/>
        <PlayerScore playerName="two"/>
        </div>

        <FallingObject/>

        

        <GroundBoarder/>

      </div>
    )
  }
  
  export default FindRoom;