// src/components/RestaurantByFood.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../Styles/RestaurantByFood.css';

const RestaurantByFood = () => {
  const { foodItemId } = useParams();
  const [restaurants, setRestaurants] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRestaurantsByFood = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/restaurants/food/${foodItemId}/restaurants`);
        setRestaurants(response.data);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      }
    };

    fetchRestaurantsByFood();
  }, [foodItemId]);

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>{error}</p>;

  return (
    <div className="restaurant-by-food-container">
        <h1>Restaurants Serving this food item :</h1>
      <div className="restaurant-lists">
      {restaurants.length > 0 ? (
        restaurants.map(restaurant => (
          <div key={restaurant.id} className="restaurant-items">
            <img src={restaurant.image} alt={restaurant.name} />
            <div className="restaurant-information">
            <Link to={`/restaurant/${restaurant.id}`}>
              <h3>{restaurant.name}</h3>
              <p>Rating: {restaurant.rating}</p>
              <p>Open: {restaurant.openingHours}</p>
              <p>Close: {restaurant.closingHours}</p>
              </Link>
            </div>
          </div>
        ))
    ) : (
        <p>No restaurants found for this food item.</p>
    )}
      </div>
    </div>
  );
};

export default RestaurantByFood;
