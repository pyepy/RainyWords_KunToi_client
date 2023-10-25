import { NavItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { EndScreen } from '../components/EndScreen.js'

const Credit = () => {
  return(
    <div className="App">
      <h1>Credit</h1>
      <EndScreen/>
      <NavItem tag={Link} to="/">back</NavItem>
    </div>
    
  )
}

export default Credit;