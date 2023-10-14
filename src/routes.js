import Home from './pages/Home.js'
import Game from './pages/Game.js'

export default [
  {path: "/", exact: true, element: Home},
  {path: "/game", element: Game}
];