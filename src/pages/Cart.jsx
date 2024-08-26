import React, {useState, useEffect } from "react";
import { Link } from "react-router-dom";
import EmptyCart from "../assets/empty_cart.svg";

const Cart = ({ cart, changeQuantity, updateCart, removeItem }) => {
  const cartHasItems = cart.some(item => item.quantity > 0);
  const total = () => {
    let price = 0;
    cart.forEach((item) => {
      price += +(item.salePrice || item.originalPrice) * item.quantity;
    });   
    return price;
  };

  function removeItem(item) {
    updateCart(item, 0);
  }

  return (
    <div id="books__body">
      <main id="books__main">
        <div className="books__container">
          <div className="row">
            <div className="book__selected--top">
              <h2 className="cart__title">Cart</h2>
            </div>
            <div className="cart">
              <div className="cart__header">
                <span className="cart__book">Book</span>
                <span className="cart__quantity">Quantity</span>
                <span className="cart__total">Price</span>
              </div>
              {!cartHasItems ? (
                <div className="cart__empty">
                  <img className="cart__empty--img" src={EmptyCart} alt="" />
                  <h2>You don't have any books in your cart!</h2>
                  <Link to="/books">
                    <button className="btn">Browse books</button>
                  </Link>
                </div>
              ) : (
                <>
                  <div className="cart">
                    {cart.map((item) => (
                      item.quantity > 0 ? (
                        <div className="cart__item" key={item.id}>
                          <div className="cart__book">
                            <img
                              className="cart__book--img"
                              src={item.url}
                              alt=""
                            />
                            <div className="cart__book--info">
                              <span className="cart__book--title">
                                {item.title}
                              </span>
                              <span className="cart__book--price">
                                ${(item.salePrice || item.originalPrice).toFixed(2)}
                              </span>
                              <button
                                className="cart__book--remove"
                                onClick={() => removeItem(item)}
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                          <div className="cart__quantity">
                            <input
                              type="number"
                              className="cart__input"
                              min={0}
                              max={99}
                              value={item.quantity}
                              onChange={(event) =>
                                changeQuantity(item, event.target.value)
                              }
                            />
                          </div>
                          <div className="cart__total">
                            $
                            {((item.salePrice || item.originalPrice) * item.quantity).toFixed(2)}
                          </div>
                        </div>
                      ) : null
                    ))}
                  </div>
                  <div className="total">
                    <div className="total__item total__sub-total">
                      <span>Subtotal</span>
                      <span>${total().toFixed(2)}</span>
                    </div>
                    <div className="total__item total__tax">
                      <span>Tax</span>
                      <span>${(total() * 0.1).toFixed(2)}</span>
                    </div>
                    <div className="total__item total__price">
                      <span>Total</span>
                      <span>${(total() * 1.1).toFixed(2)}</span>
                    </div>
                    <button className="btn btn__checkout no-cursor" onClick={() => alert(`Functionality not available yet`)}>
                      Proceed to checkout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Cart;
    
    
    
    
    
    
    
    
    
    
    
 