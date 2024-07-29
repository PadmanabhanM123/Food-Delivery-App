// src/components/Order.js
import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import generatePDF from '../utils/generatePdf';
import '../Styles/Order.css';

const Order = () => {
  const { cart,getTotalPrice, clearCart } = useContext(CartContext);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  const navigate = useNavigate();

  const handleOrder = async() => {
    if (!name || !phone || !address) {
        alert('Please fill in all fields');
        return;
      }
      const order = {
        id: new Date().getTime(), // Use a timestamp as a temporary order ID
        name,
        phoneNumber: phone,
        address,
        totalPrice: getTotalPrice(),
        items: cart,
      }
      
      generatePDF(order)
  

    // alert(`Order placed successfully!Payment method: ${paymentMethod}`);
    clearCart();
    navigate('/dashboard');
  };

  return (
    <div className="order-container">
      <h2>Order Details</h2>
      <div className="order-summary">
        <p>Total Amount: ${getTotalPrice().toFixed(2)}</p>
      </div>
      <form className="order-form">
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="text"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            placeholder="Enter your address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Payment Method</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}>
          
            <option value="creditCard">Credit Card</option>
            <option value="Gpay">Gpay</option>
            <option value="Phonepe">Phonepe</option>
            <option value="Paytm">Paytm</option>
            <option value="cashOnDelivery">Cash on Delivery</option>

          </select>
        </div>
        <button type="button" onClick={handleOrder}>
          Place Order
        </button>
      </form>
    </div>
  );
}

export default Order;
