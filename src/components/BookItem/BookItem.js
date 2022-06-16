import React from "react";
import classes from "./BookItem.module.css";
import { useDispatch } from "react-redux";
import { actions } from "../../Store/bookCartslice";

const BookItem = ({ bookInfo }) => {
  const firstPrice = bookInfo.price.split("");
  firstPrice.shift();
  const lastPrice = Number(firstPrice.join(""));

  const dispatch = useDispatch();

  const clickHandler = () => {
    dispatch(
      actions.addNewBook({
        id: bookInfo.id,
        imgUrl: bookInfo.imgUrl,
        author: bookInfo.author,
        price: lastPrice,
      })
    );
  };

  return (
    <li className={classes.list_item}>
      <img src={bookInfo.imgUrl} />
      <div>
        <p>
          <span>Author:</span>
          {bookInfo.author}
        </p>
        <p>
          <span>Rate:</span>
          {bookInfo.review}
        </p>
        <p>
          <span>Price:</span>${lastPrice}
        </p>
      </div>
      <button onClick={clickHandler}>Add To Cart</button>
    </li>
  );
};

export default BookItem;
