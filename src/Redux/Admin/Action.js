import api from "@/Api/api";
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

export const fetchAdminUsers = (jwt) => async (dispatch) => {
  dispatch({ type: ADMIN_GET_USERS_REQUEST });
  try {
    const response = await api.get("/api/admin/users", {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    dispatch({
      type: ADMIN_GET_USERS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_GET_USERS_FAILURE,
      payload: error.message,
    });
  }
};

export const fetchAdminUserAssets = ({ jwt, userId }) => async (dispatch) => {
  dispatch({ type: ADMIN_GET_USER_ASSETS_REQUEST });
  try {
    const response = await api.get(`/api/admin/users/${userId}/assets`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    dispatch({
      type: ADMIN_GET_USER_ASSETS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_GET_USER_ASSETS_FAILURE,
      payload: error.message,
    });
  }
};

export const fetchAdminUserWallet = ({ jwt, userId }) => async (dispatch) => {
  dispatch({ type: ADMIN_GET_USER_WALLET_REQUEST });
  try {
    const response = await api.get(`/api/admin/users/${userId}/wallet`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    dispatch({
      type: ADMIN_GET_USER_WALLET_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_GET_USER_WALLET_FAILURE,
      payload: error.message,
    });
  }
};

export const fetchAdminOrders = (jwt) => async (dispatch) => {
  dispatch({ type: ADMIN_GET_ORDERS_REQUEST });
  try {
    const response = await api.get("/api/admin/orders", {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    dispatch({
      type: ADMIN_GET_ORDERS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_GET_ORDERS_FAILURE,
      payload: error.message,
    });
  }
};


