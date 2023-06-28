import React, { useState } from 'react';
import bcrypt from 'bcryptjs';
import { createUser, checkEmailExists, checkUsernameExists } from '../../services/api_database';
import { v4 as uuidv4 } from 'uuid';

const SignUp = (f) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const userId = uuidv4();

  const [error, setError] = useState('');

  const isValidEmail = (email) => {
    // Expression régulière pour vérifier le format de l'adresse e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    return emailRegex.test(email);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {

        if (!isValidEmail(email)) {
            setError('Adresse e-mail invalide');
        return;
        }
        
        // Vérifier si le nom d'utilisateur ou l'email existe déjà dans la base de données
        const isUsernameTaken = await checkUsernameExists(username);
        const isEmailTaken = await checkEmailExists(email);
    
        if (isUsernameTaken.length !== 0) {
            setError('Nom d\'utilisateur déjà pris');
        return;
        }
    
        if (isEmailTaken.length !== 0) {
            setError('Email déjà utilisé');
        return;
        }

        // Générer un salt pour le hachage
        const salt = await bcrypt.genSalt(10);
    
        // Hacher le mot de passe saisi par l'utilisateur
        const hashedPassword = await bcrypt.hash(password, salt);

        const userData = await createUser(userId, username, hashedPassword, email);

        sessionStorage.setItem('userData', JSON.stringify(userData));
        f.onLogin();
        window.location.href ='/';
    } catch (error) {
        console.error('Erreur lors de l\'inscription ', error);
    }
  };

  return (
    <div className='userForm'>
      <h2>Créer un compte</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input placeholder="Nom d'utilisateur" type="text" id="username" value={username} onChange={handleUsernameChange} />
        </div>
        <div>
          <input placeholder="Mot de passe" type="password" id="password" value={password} onChange={handlePasswordChange} />
        </div>
        <div>
          <input placeholder="Email" type="email" id="email" value={email} onChange={handleEmailChange} />
        </div>
        <div>
            <p className='error_signup'>{error}</p>
        </div>
        <button type="submit">Créer</button>
      </form>
    </div>
  );
};

export default SignUp;
