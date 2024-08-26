import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import Home from "./pages/Home";
import Books from "./pages/Books";
import BookInfo from "./pages/BookInfo";
import { books } from "./data";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Cart from "./pages/Cart";
import { counter } from "@fortawesome/fontawesome-svg-core";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
library.add(faShoppingCart);


function App() {
  const [cart, setCart] = useState([]);

  function addItemToCart(book) {
    setCart([...cart, { ...book, quantity: 1 }]);
  }

  function changeQuantity(book, quantity) {
    setCart(
      cart.map((item) => 
        item.id === book.id
          ? {
              ...item,
              quantity: +quantity,
            }
          : item
      )
    );
  }
  
  function removeItem(item) {
    setCart(cart.filter(book => book.id !== item.id))
  }

  function numberOfItems() {
    let counter = 0;
    cart.forEach((item) => {
      counter += item.quantity;
    })
    return counter;
  }

  function updateCart(item, newQuantity) {
    setCart((oldCart) =>
      oldCart.map((oldItem) => {
        if (oldItem.id === item.id) {
          return {
            ...oldItem,
            quantity: newQuantity,
          };
        } else {
          return oldItem;
        }
      })
    );
  }
  
  useEffect(() => {
    console.log(cart);
  }, [cart]);





  // function numberOfItems() {
  //   let counter = 0;
  //   cart.forEach((item) => {
  //     counter += +item.quantity;
  //   });
  //   return counter;
  // }

  // function calcPrices() {
  //   let total = 0;
  //   cart.forEach((item) => {
  //     total += (item.salePrice || item.originalPrice) * item.quantity;
  //   });
  //   return {
  //     subtotal: total * 0.9,
  //     tax: total * 0.1,
  //     total,
  //   };
  // }

  return (
    <Router>
      <div className="App">
        <Nav  numberOfItems={numberOfItems()}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Books books={books} />} />
          <Route path="/books/:id" element={<BookInfo books={books} addItemToCart={addItemToCart} cart={cart} changeQuantity={changeQuantity} />} />
          <Route path="/cart" 
          element={<Cart 
          books={books} 
          cart={cart}  
          changeQuantity={changeQuantity}
          removeItem={removeItem}
          updateCart={updateCart}
          /> 
          } 
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
