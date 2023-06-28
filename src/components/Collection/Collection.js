import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { fetchCollectionsFromWankulDatabase, updateCollectionComposition } from '../../services/api_database';
import CardImg from '../Card/CardImg';
import QuantityInput from '../QuantityInput/QuantityInput';

import '../QuantityInput/QuantityInput.css';
import './Collection.css';

const Collection = ({ data }) => {
  const { id } = useParams();

  const [collection, setCollection] = useState([]);
  const [composition, setComposition] = useState({});

  useEffect(() => {
    const fetchCollection = async () => {
      try {
        const dbColl = await fetchCollectionsFromWankulDatabase(id);
        console.log(dbColl)
        setCollection(dbColl);
        if(id) {
          setComposition(JSON.parse(dbColl.composition));
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des informations', error);
      }
    };

    fetchCollection();
  }, [id]);

  const handleCompositionChange = (cardId, newQuantity) => {
    console.log('ic')
    setComposition((prevComposition) => ({
      ...prevComposition,
      [cardId]: newQuantity,
    }));
    console.log(composition)
  };

  const handleSaveComposition = async () => {
    try {
      await updateCollectionComposition(collection.collection_id, JSON.stringify(composition));
      console.log('Composition mise à jour avec succès');
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la composition', error);
    }
  };

  if (id && collection.length === 0) {
    return <p>Chargement de la collection...</p>;
  }

  return (
    <div>
      { id && <h1>{collection.collection_name}</h1>}
      <div className="coll">
      {Object.keys(data).map((cardId) => {
        const cardInfo = data[cardId];
        const quantity = composition[cardId] || 0;
        return (
          <div className="coll_card" key={cardId}>
            <a href={"/Card/"+cardId}><CardImg card_info={cardInfo} id={cardId} /></a>
            { id && <fieldset data-quantity>
              <legend>Change quantity</legend>
              <QuantityInput
                onChange={(newQuantity) => handleCompositionChange(cardId, newQuantity)}
                decreaseText="-"
                increaseText="+"
                q={quantity}
              />
            </fieldset>}
          </div>
        );
      })}
      </div>
      { id && <button onClick={handleSaveComposition}>Enregistrer la composition</button>}
    </div>
  );
};

export default Collection;
