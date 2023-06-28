import React, { useState } from 'react';
import bcrypt from 'bcryptjs';
import { checkUsernameExists } from '../../services/api_database';

import "./User.css";

const Login = (f) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const user = await checkUsernameExists(username);

    if (user.length === 0) {
        setError('Nom d\'utilisateur inconnu');
    return;
    }
    const userData = user[0]
    const userPassword = userData.password;

    let compare = await bcrypt.compare(password, userPassword)

    if(!compare) {
        setError('Mot de passe incorrect')
        return
    }

    sessionStorage.setItem('userData', JSON.stringify(userData));
    f.onLogin();
    window.location.href ='/';
  };

  return (
    <div className='userForm'>
      <h2>Connexion</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            id="username"
            placeholder="Nom d'utilisateur"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            id="password"
            placeholder='Mot de passe'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Connexion</button>
        <div>
            <p className='error_signup'>{error}</p>
        </div>
        <a href='/SignUp'>Créer un compte</a>
      </form>
    </div>
  );
};

export default Login;
