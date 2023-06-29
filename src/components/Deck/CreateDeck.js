import React, { useState } from 'react';
import { CreateDeck, checkDeckNameExists } from '../../services/api_database';
import { v4 as uuidv4 } from 'uuid';

const CreateDeck = ({user}) => {
  const [deck_name, setName] = useState('');
  const [size, setSize] = useState('');
  const deckId = uuidv4();
  const userId = user.user_id;

  const [error, setError] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
        
        // Vérifier si le nom de deck existe déjà dans la base de données
        const isNameTaken = await checkDeckNameExists(deck_name);
    
        if (isNameTaken.length !== 0) {
            setError('Nom de deck déjà pris');
        return;
        }

        await CreateDeck(deckId, deck_name, userId, size);

        window.location.href ='/Deck/'+deckId;
    } catch (error) {
        console.error('Erreur lors de la création ', error);
    }
  };

  return (
    <div className='userForm'>
      <h2>Créer un deck</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input placeholder="Nom du deck" type="text" id="deck_name" value={collection_name} onChange={handleNameChange} />
        </div>
        <div>
          <select placeholder="Taille du deck" name="size" id="size" value={size} onChange={handleSizeChange} />
        </div>
        <div>
            <p className='error_signup'>{error}</p>
        </div>
        <button type="submit">Créer</button>
      </form>
    </div>
  );
};

export default CreateDeck;
