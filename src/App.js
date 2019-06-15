import React from 'react';
import logo from './logo.svg';
import Piano from './components/Piano';
import './App.css';

function App() {
  const pianoNotes = ['C1', 'D1', 'E1', 'F1', 'G1', 'A1', 'B1'];
  return (
    <div className="App">
      <Piano pianoNotes={pianoNotes} />
    </div>
  );
}

export default App;
