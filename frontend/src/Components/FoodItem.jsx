// src/components/FoodItem.js
import React from 'react';
import '../Styles/FoodItem.css';

const FoodItem = ({ name, image }) => {
  return (
    <div className="food-item">
      <img src={image} alt={name} className="food-item-image" />
      <p className="food-item-name">{name}</p>
    </div>
  );
};

export default FoodItem;
