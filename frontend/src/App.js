//App.js
import React from 'react';
import './Styles/App.css'
import { BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import HomePage from '../src/Components/HomePage';
import Login from '../src/Actions/Login';
import Register from '../src/Actions/Register';
import Dashboard from './Components/Dashboard';
import RestaurantByFood from './Components/RestaurantByFood';
import FoodItemsByRestaurant from './Components/FoodItemsByRestaurant';
import SearchResults from './Components/SearchResults';
import Cart from './Components/Cart'
import RestaurantDetails from './Components/RestaurantDetails'
import { CartProvider } from './context/CartContext';
import Order from './Components/Order';
// import AdminDashboard from './Components/AdminDashboard';

const App = () => {
  
return (
  <CartProvider>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/login" element={<Login  />} />
        <Route path="/register" element={<Register  />}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/food/:foodItemId/restaurants" element={<RestaurantByFood/>} />
        <Route path="/restaurants/:restaurantId/food-items" element={<FoodItemsByRestaurant />}/>
        <Route path="/search" element={<SearchResults/>} />
        <Route path="/cart" element={<Cart/>}/>
        <Route path='/restaurant/:restaurantId' element={<RestaurantDetails/>}/>
        <Route path='/order' element={<Order/>}/>
        {/* <Route path='/order/place-order' element={<Order/>}/> */}
        {/* <Route path='/admin/dashboard' element={<AdminDashboard/>}/> */}
        {/* Add other routes here/ */}
      </Routes>
    </Router>
  </CartProvider>
  );
};

export default App;

