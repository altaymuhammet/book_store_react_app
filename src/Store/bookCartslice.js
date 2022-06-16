import { createSlice } from "@reduxjs/toolkit";

const bookCartSlice = createSlice({
  name: "bookSlice",
  initialState: {
    currentBooks: [],
    totalPrice: 0,
    totalQuantity: 0,
    confirmButtonClicked: false,
    sendDataFailed: false,
    dataSended: false,
  },
  reducers: {
    sended(state) {
      state.dataSended = true;
      state.currentBooks = [];
      state.totalPrice = 0;
      state.totalQuantity = 0;
    },
    confirm(state) {
      console.log("function worked")
      state.confirmButtonClicked = true;
    },
    fail(state) {
      state.sendDataFailed = true;
    },
    addCurrentBook(state, action) {
      const existingBook = state.currentBooks.find(
        (book) => book.id === action.payload.id
      );
      const existingBookIndex = state.currentBooks.findIndex(
        (book) => book.id === existingBook.id
      );
      state.currentBooks[existingBookIndex].quantity += 1;
      state.totalPrice += action.payload.price;
      state.totalQuantity += 1;
    },
    deleteCurrentBook(state, action) {
      const existingBook = state.currentBooks.find(
        (book) => book.id === action.payload.id
      );
      const existingBookIndex = state.currentBooks.findIndex(
        (book) => book.id === existingBook.id
      );
      if (state.currentBooks[existingBookIndex].quantity > 1) {
        state.currentBooks[existingBookIndex].quantity -= 1;
        state.totalPrice -= action.payload.price;
        state.totalQuantity -= 1;
      } else {
        const newCurrentBookList = state.currentBooks.filter(
          (book) => book.id !== state.currentBooks[existingBookIndex].id
        );
        state.currentBooks = [...newCurrentBookList];
        state.totalPrice -= action.payload.price;
        state.totalQuantity -= 1;
      }
    },
    addNewBook(state, action) {
      const existingBook = state.currentBooks.find(
        (book) => book.id === action.payload.id
      );

      if (existingBook) {
        const existingBookIndex = state.currentBooks.findIndex(
          (book) => book.id === existingBook.id
        );
        state.currentBooks[existingBookIndex].quantity += 1;

        state.totalPrice += action.payload.price;
        state.totalQuantity += 1;
      } else {
        state.currentBooks = [
          ...state.currentBooks,
          {
            id: action.payload.id,
            url: action.payload.imgUrl,
            author: action.payload.author,
            price: action.payload.price,
            quantity: 1,
          },
        ];
        state.totalPrice += action.payload.price;
        state.totalQuantity += 1;
      }
    }
  }
});

export const sendData = (data) => {
    return async (dispatch) => {
      const sendPost = async () => {
          const sendingData = await fetch("https://book-store-project-59d34-default-rtdb.europe-west1.firebasedatabase.app/bookList.json", {
            method: "POST",
            body: JSON.stringify(data)
           });
          const response = await sendingData.json();
      };

      try{
        sendPost();
        dispatch(bookCartSlice.actions.sended());
      } catch{
        dispatch(bookCartSlice.actions.fail());
      }
    };
};

export const actions = bookCartSlice.actions;
export default bookCartSlice.reducer;
