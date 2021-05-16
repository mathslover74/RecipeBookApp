// import logo from './logo.svg';
import React from 'react';
import './App.css';
import { BrowserRouter as Router} from 'react-router-dom'
import Routes from './routes/routes'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes />
      </Router>
    </div>
  );
}

export default App;
