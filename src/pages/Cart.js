// Cart.js
import React, { useState } from 'react';
import Products from '../components/Products';
function Cart() {
  const [cartItems, setCartItems] = useState([]);
  
  // Function to add an item to the cart
  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  // Function to remove an item from the cart
  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter((item) => item.id !== productId));
  };

  const totalPrice = cartItems.reduce((total, product) => total + product.Price, 0);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((product) => (
            <div key={product.id} style={{ display: 'flex', marginBottom: '15px' }}>
              <img src={product.img} alt={product.Title} style={{ width: '80px', height: '80px', objectFit: 'cover' }} />
              <div style={{ marginLeft: '15px' }}>
                <h3>{product.Title}</h3>
                <p>${product.Price}</p>
                <button onClick={() => removeFromCart(product.id)}>Remove from Cart</button>
              </div>
            </div>
          ))}
          <div>
            <h3>Total: ${totalPrice}</h3>
            <button>Proceed to Checkout</button>
          </div>
        </div>
      )}
      <div className="container">
        {Products.map((product) => (
          <div className="box" key={product.id}>
            <div className="content">
              <div className="img-box">
                <img src={product.img} alt={product.Title} />
              </div>
              <div className="detail">
                <div className="info">
                  <h3>{product.Title}</h3>
                  <p>${product.Price}</p>
                </div>
                <button onClick={() => addToCart(product)}>Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cart;
