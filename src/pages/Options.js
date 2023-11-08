import { NavItem } from 'reactstrap';
import { useEffect } from "react"; 
import { Link, useNavigate } from 'react-router-dom';
import { userLogin } from '../utils/userdata';
import { socket } from '../utils/socket';

const Options = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (userLogin == 0) {
      console.log(userLogin)
      navigate("../");
    }

    socket.on("nuke_incoming", (data) => {
      navigate("../")
    })
  },[])

  return(
    <div className="App">
      <h1>Options</h1>
      <NavItem tag={Link} to="/">back</NavItem>
    </div>
    
  )
}

export default Options;