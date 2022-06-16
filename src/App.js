import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Books from "./components/Books/Books";
import CartList from "./components/CartList/CartList";
import Spinner from "./components/Spinner/Spinner";
import { sendData } from './Store/bookCartslice';

import { useSelector, useDispatch } from "react-redux";

let providerVar = true;

function App() {
  const [ books, setBooks ] = useState([]);
  const [ spin, setSpin ] = useState(false);
  const showOrHideCart = useSelector( state => state.showCart.showCurrentcart);
  const currentBooks = useSelector( state => state.books.currentBooks);
  const confirmButton = useSelector( state => state.books.confirmButtonClicked);
  const dispatch = useDispatch();

  useEffect(() => {
    if(providerVar){
      providerVar = false;
      return;
    }
    dispatch(sendData(currentBooks));
  },[confirmButton]);

  useEffect(() => {
    setSpin(true)
    async function fetchData() {
      const response = await fetch(
        "https://bookshelves.p.rapidapi.com/books",
        {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': 'fa427c3ebfmshe8337e24acec9c2p1bc624jsn0a948b561ddd',
            'X-RapidAPI-Host': 'bookshelves.p.rapidapi.com'
          }
        }
      );
      const data = await response.json();
      setBooks(data.Books);
      setSpin(false)
    };
      fetchData()
  }, []);

  return (
    <div className="App">
      { showOrHideCart && <CartList />}
      <Header />
      { spin && <Spinner />}
      <Books bookList={books} />
    </div>
  );
}

export default App;
