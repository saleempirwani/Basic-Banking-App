import createDataContext from './createDataContext';

// TYPES
const GET_AMOUNT = 'GET_AMOUNT';
const GET_RECEIVER = 'GET_RECEIVER';
const GET_CURRENT_CUSTOMER = 'GET_CURRENT_CUSTOMER';

// REDUCERS

const reducer = (state, action) => {
  switch (action.type) {
    case GET_CURRENT_CUSTOMER: {
      const {id, name, balance} = action.payload;
      return {
        ...state,
        sender: {balance, id, name},
      };
    }
    case GET_AMOUNT:
      return {...state, amount: action.payload};
    case GET_RECEIVER:
      return {...state, receiver: action.payload};
    default:
      return state;
  }
};

// ACTIONS

const getCurrentCustomer = dispatch => sender => {
  return dispatch({type: GET_CURRENT_CUSTOMER, payload: sender});
};

const getAmount = dispatch => amount => {
  return dispatch({type: GET_AMOUNT, payload: Number(amount)});
};

const getReceiver = dispatch => async receiver => {
  return await dispatch({type: GET_RECEIVER, payload: receiver});
};

//   INIT STATE
const INIT_STATE = {
  sender: null,
  receiver: null,
  amount: 0,
};

export const {Context, Provider} = createDataContext(INIT_STATE, reducer, {
  getAmount,
  getCurrentCustomer,
  getReceiver,
});
