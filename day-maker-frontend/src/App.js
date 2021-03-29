import React from 'react';
import './App.css';
// import './style.css'
import { useState, useEffect } from 'react';
import Nav from "./Nav";
import DisplayContainer from "./DisplayContainer";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  

  // autologin
  useEffect(() => {
    // TODO: check if there'a token for the logged in user
    // GET /me
    const token = localStorage.getItem("token");
    if (token) {
      console.log(token)
      fetch(`${process.env.REACT_APP_RAILS_URL}/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((r) => r.json())
        .then((user) => {
          // set the user in state
          setCurrentUser(user)
        });
    }
  }, []);

  
  return (
    <div className="App">
      <header className="App-header">
        <Nav currentUser={currentUser} setCurrentUser={setCurrentUser}/>
        <DisplayContainer currentUser={currentUser} setCurrentUser={setCurrentUser}/>
      </header>
    </div>
  );
}

export default App;
