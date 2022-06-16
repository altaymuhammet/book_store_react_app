import React from "react";
import classes from "./BooksAddedToCart.module.css";

import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../Store/bookCartslice";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";

const BooksAddedToCart = (props) => {
  const booksList = useSelector((state) => state.books.currentBooks);
  const dispatch = useDispatch();

  const plusClickhandler = () => {
    const existingBook = booksList.find((book) => book.id === props.info.id);
    dispatch(
      actions.addCurrentBook({
        id: existingBook.id,
        url: existingBook.url,
        author: existingBook.author,
        price: existingBook.price,
        quantity: existingBook.quantity,
      })
    );
  };

  const minusClickhandler = () => {
    const existingBook = booksList.find((book) => book.id === props.info.id);
    dispatch(
      actions.deleteCurrentBook({
        id: existingBook.id,
        url: existingBook.url,
        author: existingBook.author,
        price: existingBook.price,
        quantity: existingBook.quantity,
      })
    );
  };

  return (
    <li className={classes.item}>
      <img src={props.info.url} />
      <p>{props.info.author}</p>
      <p>${props.info.price}</p>
      <p>x{props.info.quantity}</p>
      <div>
        <AiFillMinusCircle onClick={minusClickhandler} />
        <AiFillPlusCircle onClick={plusClickhandler} />
      </div>
    </li>
  );
};

export default BooksAddedToCart;
