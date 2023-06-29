import React, { useState, useEffect } from 'react';
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
  console.log(user)
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
      console.log(collections)
    }
  }, [user]);

  return (
    <div>
      <header>
        <div>
          <img className="headerImage" src={process.env.PUBLIC_URL +"/fondNoir.png"} />
          {user ? (
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
            {user && <li className="menu-item menu-parent"> {/* Ajout de la classe "menu-parent" */}
              <span>Mes Collections</span> {/* Remplace le lien "Mes Collections" par un span */}
              <ul className="sub-menu"> {/* Ajout d'une liste ul pour le sous-menu */}
                <li className="sub-menu-item">
                  <Link to="/CreateCollection">
                    <FontAwesomeIcon icon={faPlus} /> Créer une Collection
                  </Link>
                </li>
                {collections && Object.keys(collections).map((elt) => (
                  <li key={'coll-'+elt} className="sub-menu-item">
                    <Link to={`/Collection/${collections[elt].collection_id}`}>{collections[elt].collection_name}</Link>
                  </li>
                ))}
              </ul>
            </li>}
          </ul>
        </nav>
      </header>
      <div className="App">
        <Main user={user} onLogin={handleLogin}/>
      </div>
    </div>
  );
}

export default App;
