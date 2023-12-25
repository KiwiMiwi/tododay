import React from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import BoxSlider from './components/BoxSlider';
import './css/App.css';

function App() {
  return (
    <div className="App">
      <BoxSlider></BoxSlider>
    </div>
  );
}

export default App;
