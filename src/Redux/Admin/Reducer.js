import {
  ADMIN_GET_USERS_REQUEST,
  ADMIN_GET_USERS_SUCCESS,
  ADMIN_GET_USERS_FAILURE,
  ADMIN_GET_USER_ASSETS_REQUEST,
  ADMIN_GET_USER_ASSETS_SUCCESS,
  ADMIN_GET_USER_ASSETS_FAILURE,
  ADMIN_GET_USER_WALLET_REQUEST,
  ADMIN_GET_USER_WALLET_SUCCESS,
  ADMIN_GET_USER_WALLET_FAILURE,
  ADMIN_GET_ORDERS_REQUEST,
  ADMIN_GET_ORDERS_SUCCESS,
  ADMIN_GET_ORDERS_FAILURE,
} from "./ActionTypes";

const initialState = {
  users: [],
  usersLoading: false,
  usersError: null,

  userAssets: [],
  userWallet: null,
  userDetailLoading: false,
  userDetailError: null,

  orders: [],
  ordersLoading: false,
  ordersError: null,
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADMIN_GET_USERS_REQUEST:
      return { ...state, usersLoading: true, usersError: null };
    case ADMIN_GET_USERS_SUCCESS:
      return { ...state, usersLoading: false, users: action.payload };
    case ADMIN_GET_USERS_FAILURE:
      return { ...state, usersLoading: false, usersError: action.payload };

    case ADMIN_GET_USER_ASSETS_REQUEST:
    case ADMIN_GET_USER_WALLET_REQUEST:
      return {
        ...state,
        userDetailLoading: true,
        userDetailError: null,
      };
    case ADMIN_GET_USER_ASSETS_SUCCESS:
      return {
        ...state,
        userDetailLoading: false,
        userAssets: action.payload,
      };
    case ADMIN_GET_USER_WALLET_SUCCESS:
      return {
        ...state,
        userDetailLoading: false,
        userWallet: action.payload,
      };
    case ADMIN_GET_USER_ASSETS_FAILURE:
    case ADMIN_GET_USER_WALLET_FAILURE:
      return {
        ...state,
        userDetailLoading: false,
        userDetailError: action.payload,
      };

    case ADMIN_GET_ORDERS_REQUEST:
      return { ...state, ordersLoading: true, ordersError: null };
    case ADMIN_GET_ORDERS_SUCCESS:
      return { ...state, ordersLoading: false, orders: action.payload };
    case ADMIN_GET_ORDERS_FAILURE:
      return { ...state, ordersLoading: false, ordersError: action.payload };

    default:
      return state;
  }
};

export default adminReducer;


