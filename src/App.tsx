import React from "react";
import "./App.css";
import Game from "components/Game";

function App() {
  return (
    (document.title = "Robots (React App Ver.)"), (<Game robotList={[]} />)
  );
}

export default App;
