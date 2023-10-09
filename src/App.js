import './App.css';

import { SendMessage } from './components/SendMessage';
import { PlayerCount } from './components/PlayerCount';
import { AddUsername } from './components/AddUsername';
import { RandomWord } from './components/RandomWord';

function App() {

  return (
    <div className="App">
      <PlayerCount/>
      <AddUsername/>
      <SendMessage/>
      <RandomWord/>
    </div>
  );
}

export default App;
