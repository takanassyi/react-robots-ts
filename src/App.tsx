import React from 'react';
import './App.css';
import Game from 'components/Game';
import { init_robots } from 'components/Robots';

function App() {
  return (
    (document.title = 'Robots (React App Ver.)'),
    (<Game robotList={init_robots([], 1)} level={1} score={0} />)
  );
}

export default App;
