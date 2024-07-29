import React from 'react';
// import axios from 'axios';
import { Link } from 'react-router-dom';
import FoodItem from './FoodItem';
import '../Styles/FoodItem.css';

const FoodList = ({foodItems}) => {

  return (
    <div className="food-list">
      {foodItems.length > 0 ? (
      foodItems.map((foodItem) => (
        <Link key={foodItem.id} to={`/food/${foodItem.id}/restaurants`} className="food-item-link">
          <FoodItem name={foodItem.name} image={foodItem.image} />
        </Link>
      ))
    ) : (
      <p>No food items available</p>
    )}
    </div>
  );
}

export default FoodList;
