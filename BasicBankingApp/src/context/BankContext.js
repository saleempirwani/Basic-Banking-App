import createDataContext from './createDataContext';

// TYPES
const GET_CUSTOMERS = 'GET_CUSTOMERS';
const TRANSACTIONS = 'TRANSACTIONS';
const ADD_HISTORY_FROM_DB = 'ADD_HISTORY_FROM_DB';
const ADD_HISTORY = 'ADD_HISTORY';

// REDUCERS
const reducer = (state, action) => {
  switch (action.type) {
    case GET_CUSTOMERS:
      return {...state, users: action.payload};

    case TRANSACTIONS: {
      const {senderId, receiverId, amount} = action.payload;

      // Transactions Between Users
      state.users.map(user => {
        if (user.id === senderId) {
          user.balance -= amount;
          return user;
        } else if (user.id === receiverId) {
          user.balance += amount;
          return user;
        }
      });

      return {...state};
    }

    case ADD_HISTORY:
      return {...state, history: [...state.history, action.payload]};
    case ADD_HISTORY_FROM_DB: {
      return {
        ...state,
        history: [...action.payload],
      };
    }

    default:
      return state;
  }
};

// ACTIONS
export const getAllCustomers = dispatch => customers => {
  return dispatch({type: GET_CUSTOMERS, payload: customers});
};

const getTransactionDetail = dispatch => data => {
  const {receiver, sender, amount} = data;

  dispatch({
    type: TRANSACTIONS,
    payload: {receiverId: receiver.id, senderId: sender.id, amount},
  });
};

const addHistoryFromDB = dispatch => history => {
  return dispatch({
    type: ADD_HISTORY_FROM_DB,
    payload: history,
  });
};

const addHistory = dispatch => history => {
  return dispatch({type: ADD_HISTORY, payload: history});
};

//   INIT STATE
const INIT_STATE = {
  users: [],
  history: [],
};

export const {Context, Provider} = createDataContext(INIT_STATE, reducer, {
  getTransactionDetail,
  getAllCustomers,
  addHistoryFromDB,
  addHistory,
});
