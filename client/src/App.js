// import logo from './logo.svg';
import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./routes/routes";
import AuthApi from "./utils/AuthAPI";
import { hasSignned } from "./components/auth-api";

function App() {
  const [auth, setAuth] = useState(false);

  const readSession = async () => {
    const result = await hasSignned();
    if (result.data.auth) {
      setAuth(true);
    }
  };
  useEffect(() => {
    readSession();
  }, []);
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
