import React, { useState, useEffect, useRef } from 'react';
import 'whatwg-fetch';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faArrowRightFromBracket, faPlus } from '@fortawesome/free-solid-svg-icons'

import Main from './pages/Main';
import { fetchCollectionsUserFromWankulDatabase } from './services/api_database';

import './App.css';

function App() {
  const userData = sessionStorage.userData ? JSON.parse(sessionStorage.userData) : ''
  const [user, setUser] = useState(userData);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const [collections, setCollections] = useState();

  const handleLogin = () => {
    // Logique de connexion
    setUser(true);
  };

  const handleLogout = () => {
    // Logique de déconnexion
    sessionStorage.clear();
    setUser(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSubMenu = () => {
    setIsSubMenuOpen(!isSubMenuOpen);
  };

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        // Logique pour récupérer les collections de l'utilisateur depuis la base de données (à adapter selon votre implémentation)
        const collectionsData = await fetchCollectionsUserFromWankulDatabase(user.user_id);
        setCollections(collectionsData);
      } catch (error) {
        console.error(error);
      }
    };

    if (user) {
      fetchCollections();
    }
  }, [user]);

  const subMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (subMenuRef.current && !subMenuRef.current.contains(event.target)) {
        setIsSubMenuOpen(false);
      }
    };

    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div>
      <header>
        <div>
          <div className="menu-toggle" onClick={toggleMenu}>
            <div className="hamburger"></div>
          </div>
          <img className="headerImage" src={process.env.PUBLIC_URL + "/fondNoir.png"} alt="Header" />
          {user ? (
            <a href="/" className="userBtn" onClick={handleLogout}>
              <FontAwesomeIcon icon={faArrowRightFromBracket} />
            </a>
          ) : (
            <a href="/Login" className="userBtn">
              <FontAwesomeIcon icon={faUser} />
            </a>
          )}
        </div>
        <nav className={`navbar ${isMenuOpen ? 'open' : ''}`}>
          <ul id="menu-main-navigation" className={`menu ${isMenuOpen ? 'open' : ''}`}>
            <li className='menu-item'><Link to="/">Accueil</Link></li>
            <li className='menu-item'><Link to="https://wankul.fr/">Wankul</Link></li>
            {user && (
              <li className="menu-item menu-parent" ref={subMenuRef}>
                <span onClick={toggleSubMenu}>Mes Collections</span>
                {isSubMenuOpen && (
                  <ul className="sub-menu">
                    <li className="sub-menu-item">
                      <Link to="/CreateCollection">
                        <FontAwesomeIcon icon={faPlus} /> Créer une Collection
                      </Link>
                    </li>
                    {collections && Object.keys(collections).map((elt) => (
                      <li key={'coll-' + elt} className="sub-menu-item">
                        <a href={`/Collection/${collections[elt].collection_id}`}>{collections[elt].collection_name}</a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            )}
          </ul>
        </nav>
      </header>
      <div className="App">
        <Main user={user} onLogin={handleLogin} />
      </div>
    </div>
  );
}

export default App;
