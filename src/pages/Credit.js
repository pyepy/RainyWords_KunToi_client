import { NavItem } from 'reactstrap';
import { useEffect } from "react"; 
import { Link, useNavigate } from 'react-router-dom';
import { userLogin } from '../utils/userdata';

const Credit = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (userLogin == 0) {
      console.log(userLogin)
      navigate("../");
    }
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