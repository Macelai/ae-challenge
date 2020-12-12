import React, { useState } from 'react';
import './App.css';

function App() {
  const [state, setState] = useState({business: '', date: ''});

  const sendRequest = () =>{
    fetch(
      `http://127.0.0.1:8000/api/oldest_location/`
    )
    .then(res => res.json())
      .then(res => {
        setState(res);
      })
      .catch(error => console.log(error));
  };

  return (
    <div className="App">
      <header className="App-header">
        {state.business} <br></br>
        {state.date}

        <button onClick={sendRequest}>Click me</button>
      </header>
    </div>
  );
}

export default App;
