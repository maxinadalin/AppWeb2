import {
PAYMENT_START,
PAYMENT_SUCCESS,
PAYMENT_FAILURE,
GET_PAYPAL_CLIENT_ID_REQUEST,
GET_PAYPAL_CLIENT_ID_SUCCESS,
GET_PAYPAL_CLIENT_ID_FAIL,
} from "./types"
import axios from "axios";


export const createPayment = (order_id, amount) => async dispatch => {
    dispatch({ type: PAYMENT_START });
  
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
  
    try {
      const res = await axios.post('/api/payment/create-payment/', { order_id, amount }, config);
  
      if (res.status === 201) {
        dispatch({
          type: PAYMENT_SUCCESS,
          payload: res.data.transaction_id
        });
      } else {
        dispatch({ type: PAYMENT_FAILURE });
      }
    } catch (error) {
      dispatch({ type: PAYMENT_FAILURE });
    }
  };

 
export const getPayPalClientId = () => async (dispatch) => {
  dispatch({ type: GET_PAYPAL_CLIENT_ID_REQUEST });

  try {
    const response = await axios.get('/api/paypal-client-id/');
    dispatch({
      type: GET_PAYPAL_CLIENT_ID_SUCCESS,
      payload: response.data.client_id,
    });
  } catch (error) {
    dispatch({
      type: GET_PAYPAL_CLIENT_ID_FAIL,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message,
    });
  }
};

