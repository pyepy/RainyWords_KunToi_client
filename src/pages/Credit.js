import { NavItem } from 'reactstrap';
import { Link } from 'react-router-dom';

const Credit = () => {
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