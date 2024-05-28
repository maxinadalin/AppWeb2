
import { PAYMENT_START, PAYMENT_SUCCESS, PAYMENT_FAILURE,GET_PAYPAL_CLIENT_ID_REQUEST,
  GET_PAYPAL_CLIENT_ID_SUCCESS,
  GET_PAYPAL_CLIENT_ID_FAIL, } from '../actions/types';

const initialState = {
  loading: false,
  transactionId: null,
  error: null,
  loading: false,
  clientId: '',
  error: '',
};

const Payments = (state = initialState, action) => {
  switch (action.type) {
    case PAYMENT_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case PAYMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        transactionId: action.payload,
        error: null,
      };
    case PAYMENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
      case GET_PAYPAL_CLIENT_ID_REQUEST:
        return { ...state, loading: true };
      case GET_PAYPAL_CLIENT_ID_SUCCESS:
        return { ...state, loading: false, clientId: action.payload, error: '' };
      case GET_PAYPAL_CLIENT_ID_FAIL:
        return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default Payments;    