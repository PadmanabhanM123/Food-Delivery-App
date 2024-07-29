// src/components/RestaurantList.js
import React from 'react';
import '../Styles/RestaurantList.css';
import {Link} from 'react-router-dom'

const RestaurantList = ({restaurants}) => {
  return (
    <div className="restaurant-list">
      {restaurants.length > 0 ? (
      restaurants.map((restaurant) => (
        <Link
        key={restaurant.id}
        to={`/restaurants/${restaurant.id}/food-items`}
        className="restaurant-link"
      >
        <div className="restaurant-item">
          <img src={restaurant.image} alt={restaurant.name} />
          <div className="restaurant-info">
            <h3>{restaurant.name}</h3>
            <p>Rating: {restaurant.rating}</p>
            <p>Open: {restaurant.openingHours}</p>
            <p>Close: {restaurant.closingHours}</p>
            
          </div>
        </div>
        </Link>
      ))
    ) : (
      <p>No restaurants available</p>
    )}
    </div>
  );
};

export default RestaurantList;
