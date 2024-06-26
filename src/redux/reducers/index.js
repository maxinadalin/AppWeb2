import { combineReducers } from "redux";
import Categories from "./category";
import auth from "./auth";
import Alert from "./alert";
import Products from "./products";
import Cart from "./cart";

export default combineReducers({
  Categories,
  auth,
  Alert,
  Products,
  Cart,
});
