import axios from 'axios';

const API_URL = 'http://localhost:8000'; // URL de l'API backend

// Fonction pour récupérer les informations des utilisateurs depuis la base de données "Wankul"
export const fetchUsersFromWankulDatabase = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/users`);
    return response.data;
  } catch (error) {
    // Gérer les erreurs de requête
    console.error('Erreur lors de la récupération des utilisateurs depuis la base de données Wankul', error);
    throw error;
  }
};

// Fonction pour récupérer les informations des decks depuis la base de données "Wankul"
export const fetchDecksFromWankulDatabase = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/decks`);
    return response.data;
  } catch (error) {
    // Gérer les erreurs de requête
    console.error('Erreur lors de la récupération des decks depuis la base de données Wankul', error);
    throw error;
  }
};

// Fonction pour récupérer les informations des collections depuis la base de données "Wankul"
export const fetchCollectionsFromWankulDatabase = async (id = null) => {
  console.log(id)
  try {
    let response
    if(id != null) {
      response = await axios.get(`${API_URL}/api/collections/${id}`);
    } else{
      console.log('ici')
      response = await axios.get(`${API_URL}/api/collections`);
    }
    return response.data;
  } catch (error) {
    // Gérer les erreurs de requête
    console.error('Erreur lors de la récupération des collections depuis la base de données Wankul', error);
    throw error;
  }
};

export const updateCollectionComposition = async (collectionId, newComposition) => {
  try {
    const response = await axios.put(`${API_URL}/api/collections/${collectionId}`, {
      newComposition,
    });
    return response.data;
  } catch (error) {
    // Gérer les erreurs de requête
    console.error('Erreur lors de la mise à jour de la composition de la collection', error);
    throw error;
  }
};
