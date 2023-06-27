import React from "react";
import {useParams} from 'react-router-dom';
import CardImg from './CardImg';
import CardInfo from './CardInfo';

//card_info={card_info}
function Card({data}) {
    const {id} = useParams();
    const card_info = data[id];
    return (
    <div className="card">
        <CardImg card_info={card_info} id={id}/>
        <CardInfo card_info={card_info} id={id}/>
    </div>
    );
}

export default Card;