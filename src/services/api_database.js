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
  try {
    let response
    if(id != null) {
      response = await axios.get(`${API_URL}/api/collections/${id}`);
    } else{
      response = await axios.get(`${API_URL}/api/collections`);
    }
    return response.data;
  } catch (error) {
    // Gérer les erreurs de requête
    console.error('Erreur lors de la récupération des collections depuis la base de données Wankul', error);
    throw error;
  }
};

// Fonction pour récupérer les informations des collections depuis la base de données "Wankul"
export const fetchCollectionsUserFromWankulDatabase = async (user_id) => {
  try {
    const response = await axios.get(`${API_URL}/api/collections/users/${user_id}`);
    console.log(response.data)
    return response.data;
  } catch (error) {
    // Gérer les erreurs de requête
    console.error('Erreur lors de la récupération des collections de l\'utilisateur depuis la base de données Wankul', error);
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

export const createUser = async (userId, username, password, email) => {
  try {
    const response = await axios.post(`${API_URL}/api/users`, {
      userId,
      username,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    // Gérer les erreurs de requête
    console.error('Erreur lors de la création de l\'utilisateur', error);
    throw error;
  }
};

export const createCollection = async (collectionId, collection_name, user) => {
  try {
    const response = await axios.post(`${API_URL}/api/collection`, {
      collectionId,
      collection_name,
      user,
    });
    return response.data;
  } catch (error) {
    // Gérer les erreurs de requête
    console.error('Erreur lors de la création de la collection', error);
    throw error;
  }
};

export const checkUsernameExists = async (username) => {
  try {
    const response = await axios.get(`${API_URL}/api/users/name/${username}`);
    return response.data;
  } catch (error) {
    // Gérer les erreurs de requête
    console.error('Erreur lors de la récupération de l\'utilisateur depuis la base de données users Wankul', error);
    throw error;
  }
};

export const checkEmailExists = async (email) => {
  try {
    const response = await axios.get(`${API_URL}/api/users/email/${email}`);
    return response.data;
  } catch (error) {
    // Gérer les erreurs de requête
    console.error('Erreur lors de la récupération de l\'email depuis la base de données users Wankul', error);
    throw error;
  }
};

export const checkCollNameExists = async (collection_name, user_id) => {
  try {
    console.log(user_id)
    const response = await axios.get(`${API_URL}/api/collection/name/${collection_name}`, {
      params: {
        user_id: user_id,
      },
    });
    return response.data;
  } catch (error) {
    // Gérer les erreurs de requête
    console.error('Erreur lors de la récupération de la collection depuis la base de données users Wankul', error);
    throw error;
  }
};

export const checkDeckNameExists = async (deck_name, user_id) => {
  try {
    const response = await axios.get(`${API_URL}/api/deck/name/${deck_name}`, {
      params: {
        user_id: user_id,
      },
    });
    return response.data;
  } catch (error) {
    // Gérer les erreurs de requête
    console.error('Erreur lors de la récupération du deck depuis la base de données users Wankul', error);
    throw error;
  }
};