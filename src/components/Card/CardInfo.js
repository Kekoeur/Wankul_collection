import React from "react";
import artists from '../../data/artists.json';

function CardInfo({ card_info, id }) {
    const link_artist = card_info.artist === '' ? '' : artists[card_info.artist];
    const a = card_info.action;
    let actions = [];
  
    if (a === "") {
      return;
    }
    if(card_info.drop === "T") {
      if(a.gagnant) {
        actions.push(
          <p className="action continu-act" key="continu-act">
            <span>Le gagnant </span>{a.gagnant}
          </p>
        );
      }
      if(a.perdant) {
        actions.push(
          <p className="action continu-act" key="continu-act">
            <span>Le perdant </span>{a.perdant}
          </p>
        );
      }
      if(a.special) {
        actions.push(
          <p className="action continu-act" key="continu-act">
            <span>Spécial : </span>{a.special}
          </p>
        );
      }
      if(a.continu) {
        actions.push(
          <p className="action continu-act" key="continu-act">
            <span>Spécial : ∞ </span>{a.continu}
          </p>
        );
      }
    } else {
      if (a.basic) {
        const basicActions = Object.values(a.basic).map((value, index) => (
          <p className="action basic-act" key={index}>{value}</p>
        ));
        actions = actions.concat(basicActions);
      }
      if (a.continu) {
        actions.push(
          <p className="action continu-act" key="continu-act">
            <span>∞ : </span>{a.continu}
          </p>
        );
      }
      if (a.combo) {
        actions.push(
          <p className="action combo-act" key="combo-act">
            <span>Combo : </span>{a.combo}
          </p>
        );
      }
      if (a.combo_continu) {
        actions.push(
          <p className="action combo-act" key="combo-act">
            <span>Combo ∞ : </span>{a.combo_continu}
          </p>
        );
      }
    }
  
    return (
      <div className="card_info">
        <h1 className="name">{card_info.name}</h1>
        <p className="desc">{card_info.desc}</p>
        <div className="actions">{actions}</div>
        <p className="power">{card_info.power}</p>
        <p className="cost">{card_info.cost}</p>
        <a href={link_artist} className="artist">Artiste : {card_info.artist}</a>
        <p className="set">{card_info.set}</p>
        <p className="cat">{card_info.cat}</p>
        <p className="drop">{card_info.drop}</p>
        <p className="id">#{id}</p>
      </div>
    );
  }
  
  
export default CardInfo;