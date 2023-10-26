import { NavItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { EndScreen } from '../components/EndScreen.js'

const Credit = () => {
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