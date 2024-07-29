// src/components/Dashboard.js
import React,{useState,useEffect,useContext} from 'react';
import { Link,useNavigate} from'react-router-dom';
import '../Styles/Dashboard.css'; 
import logo from '../Image/logopic-removebg-preview.png';
import FoodList from '../Components/FoodList';
import RestaurantList from '../Components/RestaurantList';
import { CartContext } from '../context/CartContext';


const Dashboard = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [foodItems,setFoodItems]=useState([])
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const { cart, addToCart } = useContext(CartContext);
    


    useEffect(() => {
      fetch('http://localhost:5000/api/restaurants')
        .then(response => response.json())
        .then(data => {
          console.log('Fetched restaurants data:', data); // Add logging
          if (Array.isArray(data)) {
            setRestaurants(data);
          } else {
            console.error('Invalid data format:', data);
          }
        })
        .catch(error => console.error('Error fetching restaurants:', error));
    
    fetch('http://localhost:5000/api/food-items')
            .then(response => response.json())
            .then(data => {
                console.log('Fetched food items data:', data); // Add logging
                if (Array.isArray(data)) {
                    setFoodItems(data);
                } else {
                    console.error('Invalid data format:', data);
                }
            })
            .catch(error => console.error('Error fetching food items:', error));
    }, []);

    const handleSearch =(e) => {
      
    navigate(`/search?query=${searchQuery}`);
    };

  return (
    <div className="dashboard-container">
      <nav className="navbar">
        <div className="nav-logo">
          <img src={logo} alt="logoimg" className="logo" />
          <span className="app-name">Foodyy~Buddyy</span>
        </div>
        <div className="nav-search">
          <input type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for food or restaurants..." />
          <button onClick={handleSearch}>Search</button>
        </div>
        <div className="nav-links">
          <Link to="/cart" className="nav-link">Cart({cart ? cart.length : 0})</Link>
          <Link to="/" className="nav-link">Logout</Link>
        </div>
      </nav>


      <h1>Welcome to Foodyy~Buddyy</h1>
      <p>“Good food is the foundation of genuine happiness.”</p>
      
      <div className="food-list-container">
         <FoodList foodItems={foodItems} addToCart={addToCart}/>
      </div>
      <div className="restaurant-list-container">
        <RestaurantList restaurants={restaurants} />
    
      </div>

      <main className="dashboard-main">
        {/* Add your main content here */}
        {/* <h1>Welcome to Foodyy~Buddyy</h1> */}
        {/* Add more content as needed */}
      </main>
    </div>
  );
};

export default Dashboard;
