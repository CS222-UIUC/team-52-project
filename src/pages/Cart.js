// src/pages/Cart.js
import React, { useContext, useState, useEffect  } from 'react';
import { CartContext } from '../components/CartContext';
import styles from './Cart.module.css';


function Cart() {
  const { cartItems, removeFromCart,updateQuantity } = useContext(CartContext);
 
  const [quantityInputs, setQuantityInputs] = useState({});
 
  // When cartItems change, initialize or update our quantityInputs
  useEffect(() => {
    const newInputs = {};
    cartItems.forEach((item) => {
      newInputs[item.id] = item.quantity.toString();
    });
    setQuantityInputs(newInputs);
  }, [cartItems]);


  // Multiply each product's price by its quantity
  const totalPrice = cartItems.reduce((total, product) =>
    total + product.Price * (product.quantity || 1), 0
  );


  //update quantity both locally and in the global context
  const handleQuantityUpdate = (productId, value) => {
    let newVal = value;
    if (!newVal || parseInt(newVal, 10) < 1) {
      newVal = "1";
    }
    setQuantityInputs({
      ...quantityInputs,
      [productId]: newVal,
    });
    updateQuantity(productId, parseInt(newVal, 10));
  };


  return (
    <div className={styles.cartContainer}>
      <h1 className={styles.cartHeading}>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p className={styles.emptyMessage}>Your cart is empty.</p>
      ) : (
        <div className={styles.cartItems}>
          {cartItems.map((product) => {
            const inputValue =
              quantityInputs[product.id] !== undefined
                ? quantityInputs[product.id]
                : product.quantity.toString();


            return (
              <div key={product.id} className={styles.cartItem}>
                <img
                  src={product.img}
                  alt={product.Title}
                  className={styles.itemImage}
                />
                <div className={styles.itemInfo}>
                  <h3 className={styles.itemTitle}>{product.Title}</h3>
                  <div className={styles.quantityContainer}>
                    <label htmlFor={`quantity-${product.id}`}>
                      Quantity:&nbsp;
                    </label>
                    <input
                      id={`quantity-${product.id}`}
                      type="number"
                      min="1"
                      value={inputValue}
                      onChange={(e) =>
                        setQuantityInputs({
                          ...quantityInputs,
                          [product.id]: e.target.value,
                        })
                      }
                      onBlur={(e) =>
                        handleQuantityUpdate(product.id, e.target.value)
                      }
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleQuantityUpdate(product.id, e.target.value);
                          // Remove focus so that onBlur is also triggered (if needed)
                          e.target.blur();
                        }
                      }}
                      className={styles.quantityInput}
                    />
                  </div>
                  <p className={styles.itemPrice}>
                    ${product.Price} x {product.quantity}
                  </p>
                  <p className={styles.itemSubtotal}>
                    Subtotal: ${(product.Price * product.quantity).toFixed(2)}
                  </p>
                  <button
                    className={styles.removeButton}
                    onClick={() => removeFromCart(product.id)}
                  >
                    Remove from Cart
                  </button>
                </div>
              </div>
            );
          })}
          <div className={styles.cartTotal}>
            <h3>Total: ${totalPrice.toFixed(2)}</h3>
            <button className={styles.checkoutButton}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
export default Cart;