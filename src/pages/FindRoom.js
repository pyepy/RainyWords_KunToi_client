import '../App.css';
import { PlayerScore } from "../components/PlayerScore";
import { GroundBoarder } from '../components/GroundBoarder';
import { Timer } from '../components/Timer';

const FindRoom = () => {  
    return (
      <div className="App">
        <div className='topOverlay'>
        <PlayerScore playerName="one"/>
        <Timer/>
        <PlayerScore playerName="two"/>
        </div>


        

        <GroundBoarder/>

      </div>
    )
  }
  
  export default FindRoom;