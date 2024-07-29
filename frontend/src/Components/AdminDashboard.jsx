// src/components/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/AdminDashboard.css';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const usersResponse = await axios.get('/api/admin/users');
      setUsers(usersResponse.data);

      const foodItemsResponse = await axios.get('/api/admin/food-items');
      setFoodItems(foodItemsResponse.data);

      const restaurantsResponse = await axios.get('/api/admin/restaurants');
      setRestaurants(restaurantsResponse.data);

      const ordersResponse = await axios.get('/api/admin/orders');
      setOrders(ordersResponse.data);
    };

    fetchData();
  }, []);

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <section>
        <h2>Users</h2>
        <ul>
          {users.map(user => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      </section>
      <section>
        <h2>Food Items</h2>
        <ul>
          {foodItems.map(item => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      </section>
      <section>
        <h2>Restaurants</h2>
        <ul>
          {restaurants.map(restaurant => (
            <li key={restaurant.id}>{restaurant.name}</li>
          ))}
        </ul>
      </section>
      <section>
        <h2>Orders</h2>
        <ul>
          {orders.map(order => (
            <li key={order.id}>Order #{order.id}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default AdminDashboard;
