import {
  GET_PAYMENT_TOTAL_SUCCESS,
  GET_PAYMENT_TOTAL_FAIL,
  LOAD_BT_TOKEN_SUCCESS,
  LOAD_BT_TOKEN_FAIL,
  PAYMENT_SUCCESS,
  PAYMENT_FAIL,
  RESET_PAYMENT_INFO,
  SET_PAYMENT_LOADING,
  REMOVE_PAYMENT_LOADING,
  REMOVE_ITEM_SUCCESS
} from '../actions/types';


const initialState = {
  clientToken: null,
  made_payment: false,
  original_price: 0.0,
  total_amount: 0.0,
  total_compare_amount: 0.0,
  estimated_tax: 0.0,
  loading: false
};


export default function Payment(state = initialState, action) {
  const { type, payload } = action;

  switch(type) {
      case GET_PAYMENT_TOTAL_SUCCESS:
          return {
              ...state,
              original_price: payload.original_price,
              total_amount: payload.total_amount,
              total_compare_amount: payload.total_compare_amount,
              estimated_tax: payload.estimated_tax,
          }
      case GET_PAYMENT_TOTAL_FAIL:
          return {
              ...state,
              original_price: 0.00,
              total_amount: 0.00,
              total_compare_amount: 0.00,
              estimated_tax: 0.00,

          }
      case LOAD_BT_TOKEN_SUCCESS:
          return {
              ...state,
              clientToken: payload.access_token
          }
      case LOAD_BT_TOKEN_FAIL:
          return {
              ...state,
              clientToken: null
          }
          case REMOVE_ITEM_SUCCESS:
          // Realizar cálculos actualizados si es necesario
          const itemPrice = parseFloat(payload.itemPrice);
          const updatedTotalAmount = isNaN(itemPrice) ? state.total_amount : state.total_amount - itemPrice;
          // const updatedEstimatedTax = calculateEstimatedTax(updatedTotalAmount);

          return {
              ...state,
              total_amount: updatedTotalAmount,
              // estimated_tax: updatedEstimatedTax,
              // otros estados que puedas necesitar actualizar
          };
      case PAYMENT_SUCCESS:
          return {
              ...state,
              made_payment: true
          }
      case PAYMENT_FAIL:
          return {
              ...state,
              made_payment: false
          }
      case SET_PAYMENT_LOADING:
          return {
              ...state,
              loading: true
          }
      case REMOVE_PAYMENT_LOADING:
          return {
              ...state,
              loading: false
          }
      case RESET_PAYMENT_INFO:
          return {
              ...state,
              made_payment: false,
              clientToken: null
          }
      default:
          return state;
  }
}