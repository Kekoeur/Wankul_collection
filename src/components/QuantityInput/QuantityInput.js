import React, { useState } from 'react';

const QuantityInput = ({ decreaseText, increaseText, q, onChange }) => {
  const [quantity, setQuantity] = useState(q || 0);

  const handleQuantityChange = (change) => {
    let newQuantity = Number(quantity);

    if (isNaN(newQuantity)) {
      newQuantity = 0;
    }

    newQuantity += change;
    newQuantity = Math.max(newQuantity, 0);

    setQuantity(newQuantity);
    onChange(newQuantity); // Appeler la fonction onChange avec la nouvelle quantité
  };

  return (
    <div>
      <button className="sub" type="button" onClick={() => handleQuantityChange(-1)}>
        {decreaseText || 'Decrease quantity'}
      </button>
      <input
        type="number"
        name="quantity"
        pattern="[0-9]+"
        value={quantity}
        onChange={(e) => {
            setQuantity(Number(e.target.value))
            onChange(Number(e.target.value))
          }
        }
      />
      <button className="add" type="button" onClick={() => handleQuantityChange(1)}>
        {increaseText || 'Increase quantity'}
      </button>
    </div>
  );
};

export default QuantityInput;
