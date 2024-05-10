import { combineReducers } from "redux";
import Categories from "./category";
import auth from "./auth";
import Alert from "./alert";

export default combineReducers({
  Categories,
  auth,
  Alert,
});
