import { NavItem } from 'reactstrap';
import { useEffect } from "react"; 
import { Link, useNavigate } from 'react-router-dom';
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
        <h1>Credit Jaaaa</h1>
        <NavItem tag={Link} to="/">back</NavItem>
      </div>
    </div>
    
  )
}

export default Credit;