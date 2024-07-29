// src/components/Cart.js
import React ,{useContext}from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import '../Styles/Cart.css';

const Cart = () => {
    const { cart,removeFromCart } = useContext(CartContext)

    // Calculate the number of items in the cart
  const itemCount = cart.length;

  // Calculate the total amount
  const totalAmount = cart.reduce((total, item) => total + item.price, 0);

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>
      {itemCount === 0 ? (
        <p>Your cart is empty.</p>
    ) : (
      <>
          <div className="cart-items">
            {cart.map((item, index) => (
              <div key={index} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p>Price: ${item.price}</p>
                  <button className="remove-button" onClick={() => removeFromCart(item)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <p>Total Items: {itemCount}</p>
            <p>Total Amount: ${totalAmount.toFixed(2)}</p>
            <Link to="/order">
            <button className="order-button">Proceed to Order</button>
          </Link>
          </div>
          </>
      )}
    </div>
  );
};

export default Cart;













