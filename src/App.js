import './App.css';

import { SendMessage } from './components/SendMessage';
import { PlayerCount } from './components/PlayerCount';
import { AddUsername } from './components/AddUsername';
import { RandomWord } from './components/RandomWord';
import { GroundBoarder } from './components/GroundBoarder';


function App() {

  return (        //display
    <div className="App">
      <PlayerCount/>
      <AddUsername/>
      <SendMessage/>
      <RandomWord/>
      <GroundBoarder/>
    </div>
  );
}

export default App;
