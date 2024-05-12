import {
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAIL,
  GET_CATEGORY_BY_ARRIVAL_SUCCESS,
  GET_CATEGORY_BY_ARRIVAL_FAIL,
} from "../actions/types";

const initialState = {
  categories: null,
  categories_arrival: null,
};

export default function Categories(state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case GET_CATEGORIES_SUCCESS:
        // console.log("Categories fetched successfully:", payload);
        return {
          ...state,
          categories: payload.categories,
        };
      case GET_CATEGORY_BY_ARRIVAL_SUCCESS:
          return {
              ...state,
              categories_arrival: payload.categories_arrival,
            };
      case GET_CATEGORIES_FAIL:
        return {
          ...state,
          categories: null,
        };
  
        case GET_CATEGORY_BY_ARRIVAL_FAIL:
          return {
              ...state,
              categories_arrival: null,
            };
      default:
        return state;
    }
  }
  