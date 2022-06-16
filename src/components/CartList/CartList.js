import React, { Fragment } from "react";
import classes from "./CartList.module.css";
import { createPortal } from "react-dom";
import BooksAddedToCart from "./BooksAddedToCart";

import { useSelector, useDispatch } from "react-redux";
import { actions } from "../../Store/currentCartSlice";
import { actions as bookActions } from "../../Store/bookCartslice";
import { AiFillCloseCircle } from "react-icons/ai";

const SelectedBooksList = () => {
  const booksList = useSelector((state) => state.books.currentBooks);
  const totalPrice = useSelector((state) => state.books.totalPrice);
  const sendDataFailInfo = useSelector((state) => state.books.sendDataFailed);
  const sendDataApprovedInfo = useSelector((state) => state.books.dataSended);
  const dispatch = useDispatch();

  const clickHandler = () => {
    dispatch(actions.hideCart());
  };

  const confirmClickHandler = () => {
    dispatch(bookActions.confirm());
  };

  return (
    <div className={classes.SelectedBooksList}>
      <AiFillCloseCircle
        className={classes.closeCircle}
        onClick={clickHandler}
      />
      <h1>Your Cart</h1>
      {booksList.length === 0 ? (
        <p>No book added!</p>
      ) : (
        <ul className={classes.CartBookList}>
          {booksList.map((book) => (
            <BooksAddedToCart key={book.id} info={book} />
          ))}
        </ul>
      )}
      {sendDataFailInfo && <p>Sendin data Failed!</p>}
      {sendDataApprovedInfo && (
        <h1 style={{ fontSize: "2rem", marginTop: "5rem" }}>
          Data sended successfully :D
        </h1>
      )}
      <div className={classes.empty}></div>
      <div className={classes.totalPrice}>
        <p>
          Total Price: <span>${totalPrice}</span>
        </p>
        <button className={classes.confirmButton} onClick={confirmClickHandler}>
          Confirm
        </button>
      </div>
    </div>
  );
};

const BackDrop = () => {
  const dispatch = useDispatch();

  const clickHandler = () => {
    dispatch(actions.hideCart());
  };
  return <div className={classes.backDrop} onClick={clickHandler}></div>;
};

const CartList = () => {
  return (
    <Fragment>
      {createPortal(<BackDrop />, document.getElementById("cart"))}
      {createPortal(<SelectedBooksList />, document.getElementById("cart"))}
    </Fragment>
  );
};

export default CartList;
