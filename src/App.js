import React, { useState } from 'react';
import 'whatwg-fetch';
import Main from './pages/Main';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(sessionStorage.userData);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogin = () => {
    // Logique de connexion
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    // Logique de déconnexion
    sessionStorage.clear();
    setIsLoggedIn(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <header>
        <div>
          <img className="headerImage" src={process.env.PUBLIC_URL +"/fondNoir.png"} />
          {isLoggedIn ? (
            /*<nav>
              <button type="button" className={`hamburger ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
                <span className="line"></span>
                <span className="line"></span>
                <span className="line"></span>
              </button>
            </nav>*/
            <a href="/" className="userBtn" onClick={handleLogout}>
              <FontAwesomeIcon icon={faArrowRightFromBracket} />
              </a>
          ) : (
            <a href={"/Login"} className="userBtn">
              <FontAwesomeIcon icon={faUser} />
            </a>
          )}
        </div>
        <nav>
          <ul id="menu-main-navigation" >
            <li className='menu-item'><Link to="/">Accueil</Link></li>
            <li className='menu-item'><Link to="https://wankul.fr/">Wankul</Link></li>
            <li className='menu-item'><Link to="/">Mes Collections</Link></li>
          </ul>
        </nav>
      </header>
      <div className="App">
        <Main onLogin={handleLogin}/>
      </div>
    </div>
  );
}

export default App;
