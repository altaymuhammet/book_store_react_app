import React from "react";
import classes from "./Books.module.css";
import BookItem from "../BookItem/BookItem";

const Books = (props) => {
  return (
    <div className={classes.div}>
      <h1 className={classes.h1}>Available Books</h1>
      {
        <ul className={classes.list}>
          {props.bookList.map((book) => {
            return <BookItem key={book.id} bookInfo={book} />;
          })}
        </ul>
      }
    </div>
  );
};

export default Books;
