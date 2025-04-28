import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from '../components/CartContext';
import styles from './Cart.module.css';

function Cart() {
  const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);
  const [quantityInputs, setQuantityInputs] = useState({});

  // Update quantityInputs state when cartItems change
  useEffect(() => {
    const inputs = {};
    cartItems.forEach((item) => {
      inputs[item.id] = item.quantity.toString();
    });
    setQuantityInputs(inputs);
  }, [cartItems]);

  const handleQuantityUpdate = (cartItemId, value) => {
    let newVal = value;
    if (!newVal || parseInt(newVal, 10) < 1) {
      newVal = "1";
    }
    setQuantityInputs({
      ...quantityInputs,
      [cartItemId]: newVal,
    });
    updateQuantity(cartItemId, parseInt(newVal, 10));
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.product.current_price * item.quantity,
    0
  );

  return (
    <div className={styles.cartContainer}>
      <h1 className={styles.cartHeading}>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p className={styles.emptyMessage}>Your cart is empty.</p>
      ) : (
        <div className={styles.cartItems}>
          {cartItems.map((item) => {
            const inputValue =
              quantityInputs[item.id] !== undefined
                ? quantityInputs[item.id]
                : item.quantity.toString();

            return (
              <div key={item.id} className={styles.cartItem}>
                <img
                  src="https://via.placeholder.com/150"
                  alt={item.product.name}
                  className={styles.itemImage}
                />
                <div className={styles.itemInfo}>
                  <h3 className={styles.itemTitle}>{item.product.name}</h3>
                  <div className={styles.quantityContainer}>
                    <label htmlFor={`quantity-${item.id}`}>Quantity: </label>
                    <input
                      id={`quantity-${item.id}`}
                      type="number"
                      min="1"
                      value={inputValue}
                      onChange={(e) =>
                        setQuantityInputs({
                          ...quantityInputs,
                          [item.id]: e.target.value,
                        })
                      }
                      onBlur={(e) =>
                        handleQuantityUpdate(item.id, e.target.value)
                      }
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleQuantityUpdate(item.id, e.target.value);
                          e.target.blur();
                        }
                      }}
                      className={styles.quantityInput}
                    />
                  </div>
                  <p className={styles.itemPrice}>
                    ${item.product.current_price} x {item.quantity}
                  </p>
                  <p className={styles.itemSubtotal}>
                    Subtotal: ${(item.product.current_price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    className={styles.removeButton}
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove from Cart
                  </button>
                </div>
              </div>
            );
          })}
          <div className={styles.cartTotal}>
            <h3>Total: ${totalPrice.toFixed(2)}</h3>
            <button className={styles.checkoutButton}>Proceed to Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;