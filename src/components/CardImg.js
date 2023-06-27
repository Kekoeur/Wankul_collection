import React from "react";

function CardImg({card_info}, {id}) {
    const alt = "Carte "+card_info.name+" du set "+card_info.set+" illustré par "+card_info.artist;

    return (
        <div className="card_img">
            <img src={"/card_img/"+ card_info.image.src} alt={alt} />
        </div>
    );
}

export default CardImg;