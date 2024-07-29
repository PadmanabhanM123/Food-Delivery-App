// src/components/SearchResults.js
import React, { useEffect, useState,useContext} from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import '../Styles/SearchResults.css';

const SearchResults = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query');
  const [results, setResults] = useState({ foodItems: [], restaurants: [] });
  const { addToCart } = useContext(CartContext)
  
  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/search?query=${query}`);
        setResults(response.data);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <div className="search-results-container">
    <h1>Search Results for "{query}"</h1>
    {results.foodItems.length > 0 && (
      <div className="section">
        <h2>Food Items</h2>
        <div className="results-grid">
          {results.foodItems.map(foodItem => (
            <div key={foodItem.id} className="result-card">
              <h3>{foodItem.name}</h3>
              <img src={foodItem.image} alt={foodItem.name} className="result-image" />
              <p>Price: ${foodItem.price}</p>
                <button onClick={() => addToCart(foodItem)}>Add to Cart</button>
              {foodItem.Restaurants?.length > 0 && (
                <div className="related-list">
                  <h4>Available in:</h4>
                  <ul>
                    {foodItem.Restaurants.map(restaurant => (
                      <li key={restaurant.id}>{restaurant.name}</li>
                      ))}
                    
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    )}
    {results.restaurants.length > 0 && (
      <div className="section">
        <h2>Restaurants</h2>
        <div className="results-grid">
        {/* {message && <div className="message">{message}</div>} */}
          {results.restaurants.map(restaurant => (
            <div key={restaurant.id} className="result-card">
              <img src={restaurant.image} alt={restaurant.name} className="result-image" />
              {/* <h3>{restaurant.name}</h3> */}
              <div className="restaurant-details">
              <div className="result-content">
              <h3>{restaurant.name}</h3>
              {/* <img src={restaurant.image} alt={restaurant.name} className="result-image" /> */}
              {restaurant.FoodItems?.length > 0 && (
                <div className="related-list">
                  <h4>Serving:</h4>
                  <ul>
                    {restaurant.FoodItems.map(foodItem => (
                      <li key={foodItem.id}>                  
                        <div className="price-button-container">
                                <span className="price">{foodItem.name} - ${foodItem.price}</span>
                                <button onClick={() => addToCart(foodItem)}>Add to Cart</button>
                              </div>

                      </li>
                    ))}
                  </ul>
                </div>
              )}
              </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )}
    {results.foodItems?.length === 0 && results.restaurants?.length === 0 && (
      <p>No results found.</p>
    )}
  </div>
);
};


export default SearchResults;
