import { NavItem } from 'reactstrap';
import { Link } from 'react-router-dom';

const Options = () => {
  return(
    <div className="App">
      <h1>Options</h1>
      <NavItem tag={Link} to="/">back</NavItem>
    </div>
    
  )
}

export default Options;