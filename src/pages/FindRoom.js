import '../App.css';
import { PlayerScore } from "../components/PlayerScore";
import { GroundBoarder } from '../components/GroundBoarder';
import { Timer } from '../components/Timer';
import { useEffect } from "react"; 
import { Link, useNavigate } from 'react-router-dom';
import { userLogin } from '../utils/userdata';

const FindRoom = () => {  
  const navigate = useNavigate();

  useEffect(() => {
    if (userLogin == 0) {
      console.log(userLogin)
      navigate("../");
    }
  },[])

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