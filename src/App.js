import {useState} from 'react';
import Forecast from "./components/Forecast/Forecast";
import React from "react";
import './App.css'

function App() {
  const [gif, setGif] = useState();
  const [location, setLocation] = useState()

  return (
    <div className="App">
      <header className="App-header">
        <h1>Приложение React Weather <br/>для реагирования на погоду</h1>
        <h2>{location}</h2>
      </header>
      <div className='box'>
        <main>
          <Forecast setGif={setGif} setLocation={setLocation}/>
        </main>
      </div>
      <div className='footer'>
        <footer>
          Страница создана Салеховым Тимуром
        </footer>
      </div>
    </div>
  );
}

export default App;