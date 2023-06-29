import React, { useState } from 'react';
import { createCollection, checkCollNameExists } from '../../services/api_database';
import { v4 as uuidv4 } from 'uuid';

const CreateCollection = ({user}) => {
  const [collection_name, setName] = useState('');
  const collectionId = uuidv4();
  const userId = user.user_id;

  const [error, setError] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
        
        // Vérifier si le nom de collection existe déjà dans la base de données
        const isNameTaken = await checkCollNameExists(collection_name);
    
        if (isNameTaken.length !== 0) {
            setError('Nom de collection déjà pris');
        return;
        }

        await createCollection(collectionId, collection_name, userId);

        window.location.href ='/Collection/'+collectionId;
    } catch (error) {
        console.error('Erreur lors de la création ', error);
    }
  };

  return (
    <div className='userForm'>
      <h2>Créer une collection</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input placeholder="Nom de la collection" type="text" id="collection_name" value={collection_name} onChange={handleNameChange} />
        </div>
        <div>
            <p className='error_signup'>{error}</p>
        </div>
        <button type="submit">Créer</button>
      </form>
    </div>
  );
};

export default CreateCollection;
