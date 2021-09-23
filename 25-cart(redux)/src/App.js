import React from "react";
// components
import Navbar from "./components/Navbar";
import CartContainer from "./components/CartContainer";
// redux stuff
import { createStore } from 'redux';
import reducer from "./reducer";
import { Provider } from "react-redux";

// store - stores data, think of state
const store = createStore(
  reducer,
  // Redux DevTools Extension: https://github.com/zalmoxisus/redux-devtools-extension
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

function App() {
  return (
    <Provider store={store}>
      <Navbar />
      <CartContainer />
    </Provider>
  );
}

export default App;