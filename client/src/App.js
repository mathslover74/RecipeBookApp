// import logo from './logo.svg';
import React ,{ useState }from 'react';
import './App.css';
import { BrowserRouter as Router} from 'react-router-dom'
import Routes from './routes/routes'
import AuthApi from './utils/AuthAPI'

function App() {
  const [auth,setAuth] = useState(false);
  return (
    <div className="App">
      <AuthApi.Provider value={{ auth, setAuth }}>
      <Router>
        <Routes />
      </Router>
      </AuthApi.Provider>
    </div>
  );
}

export default App;
