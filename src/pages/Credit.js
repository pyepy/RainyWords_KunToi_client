import { NavItem } from 'reactstrap';
import { Link } from 'react-router-dom';

const Credit = () => {
  return(
    <div className="App">
      <h1>Credit</h1>
      <NavItem tag={Link} to="/">back</NavItem>
    </div>
    
  )
}

export default Credit;