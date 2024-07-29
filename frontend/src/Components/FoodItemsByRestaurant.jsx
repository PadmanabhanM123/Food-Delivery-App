// src/components/FoodItemsByRestaurant.js
import React, { useEffect, useState,useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../Styles/FoodItemsByRestaurant.css';
import { CartContext } from '../context/CartContext';

const FoodItemsByRestaurant = () => {
  const { restaurantId } = useParams();
  const [foodItems, setFoodItems] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/restaurants/${restaurantId}/food-items`);
        console.log('api response:', response.data);
        setFoodItems(response.data);
      } catch (error) {
        console.error('Error fetching food items:', error);
      }
    };

    fetchFoodItems();
  }, [restaurantId]);

  return (
    <div className="restaurant-food-list-container">
      <div className="restaurant-food-list-header">
        <h1>Food Item at this Restaurant: </h1>
      </div>
      <div className="food-items-display">

        {Array.isArray(foodItems) && foodItems.length > 0 ? (
        foodItems.map(foodItem => (
          <div key={foodItem.id} className="food-item-card">
            <img src={foodItem.image} alt={foodItem.name} className="food-item-image"/>
            <div className="food-item-info">
              <h3 className="food-item-name">{foodItem.name}</h3>
              <p className="food-item-price">Price: ${foodItem.price.toFixed(2)}</p>
              <button onClick={() => {addToCart(foodItem) }}>Add to Cart</button>
            </div>
          </div>
        ))
      ) : (
        <p>No food items available.</p>
      )}
      </div>
    </div>
  );
};

export default FoodItemsByRestaurant;
