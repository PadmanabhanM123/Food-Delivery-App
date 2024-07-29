// src/components/RestaurantDetails.jsx
import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import '../Styles/RestaurantDetails.css';

const RestaurantDetails = () => {
  const { restaurantId } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/restaurants/${restaurantId}`);
        setRestaurant(response.data);
      } catch (error) {
        console.error('Error fetching restaurant details:', error);
      }
    };

    fetchRestaurantDetails();
  }, [restaurantId]);

  if (!restaurant) return <div>Loading...</div>;

  return (
    <div className="restaurant-details-container">
      <div className="restaurant-header">
        <img src={restaurant.image} alt={restaurant.name} />
        <div className="restaurant-info">
          <h1 className="restaurant-name">{restaurant.name}</h1>
          <p className="restaurant-description">{restaurant.description}</p>
        </div>
      </div>
      <div className="food-items-list">
        {restaurant.FoodItems.map(foodItem => (
          <div key={foodItem.id} className="food-item-card">
            <img src={foodItem.image} alt={foodItem.name} />
            <h3 className="food-item-name">{foodItem.name}</h3>
            <p className="food-item-price">${foodItem.price.toFixed(2)}</p>
            <div className="food-item-add-to-cart">
              <button onClick={() => addToCart(foodItem)} >Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )}
export default RestaurantDetails;
