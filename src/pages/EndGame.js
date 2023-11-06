import { NavItem } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from "react"; 
import { EndScreen } from '../components/EndScreen.js'
import { userLogin } from '../utils/userdata';
import { socket } from '../utils/socket';

const Credit = () => {
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

  return(
    <div className="App">
      <div className='playContainer'>
        <EndScreen/>
      </div>
      
      {/* <NavItem tag={Link} to="/">back</NavItem> */}
    </div>
    
  )
}

export default Credit;