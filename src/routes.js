import Home from './pages/Home.js';
import Game from './pages/game.js';
import Options from './pages/Options.js';
import Credit from './pages/Credit.js';
import FindRoom from './pages/FindRoom.js';

export default [        //just for ref
  {path: "/", exact: true, element: Home},
  {path: "/game", element: Game},
  {path: "/options", element: Options},
  {path: "/credit", element: Credit},
  {path: "/findRoom", element: FindRoom},
];