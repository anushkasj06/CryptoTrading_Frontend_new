/* eslint-disable no-unused-vars */
import api from "@/Api/api";
import {
  CHAT_BOT_FAILURE,
  CHAT_BOT_REQUEST,
  CHAT_BOT_SUCCESS,
} from "./ActionTypes";

export const sendMessage = ({ prompt, jwt }) => async (dispatch) => {
  dispatch({
    type: CHAT_BOT_REQUEST,
    payload: { prompt, role: "user" }
  });

  try { 
    // Ensure this matches your Controller endpoint
    const { data } = await api.post("/api/chat", { prompt }, {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    });

    console.log("Raw API response:", data);

    // FIX: Check if data is an object with a 'message' field, or just the string data itself
    const responseMessage = data.message ? data.message : data;

    dispatch({
      type: CHAT_BOT_SUCCESS,
      payload: { ans: responseMessage, role: "model" },
    });
    
    console.log("Message dispatched to reducer:", responseMessage);

  } catch (error) {
    dispatch({ type: CHAT_BOT_FAILURE, payload: error });
    console.log(error);
  }
};