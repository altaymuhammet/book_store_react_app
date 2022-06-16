import React from 'react';
import { BsCartCheckFill } from 'react-icons/bs';
import classes from './Header.module.css';
import { useSelector, useDispatch } from "react-redux";
import { actions } from '../../Store/currentCartSlice';

const Header = () => {
  const totalQuantity = useSelector((state) => state.books.totalQuantity);
  const dispatch = useDispatch();

  const clickHandler = () => dispatch(actions.showCart());
   
  return (
    <header className={classes.header}>
        <h1>BookStore</h1>
        <button onClick={clickHandler}>
            <BsCartCheckFill />
            <p>Cart</p>
            <p>{totalQuantity}</p>
        </button>
    </header>
  )
}

export default Header