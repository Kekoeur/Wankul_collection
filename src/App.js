import React, { useState } from 'react';
import 'whatwg-fetch';
import Main from './pages/Main';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogin = () => {
    // Logique de connexion
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    // Logique de déconnexion
    setIsLoggedIn(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <header>
        <img className="headerImage" src={process.env.PUBLIC_URL +"/card_img/fondNoir.png"} />
        {isLoggedIn ? (
          <nav>
            <button type="button" className={`hamburger ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
              <span className="line"></span>
              <span className="line"></span>
              <span className="line"></span>
            </button>
          </nav>
        ) : (
          <a href={"/Login"} className="userBtn" onClick={handleLogin}>
            <FontAwesomeIcon icon={faUser} />
          </a>
        )}
      </header>
      <div className="App">
        <Main />
      </div>
    </div>
  );
}

export default App;
