import axios from "axios";
import { AUTHORIZED, ERROR, LOGOUT } from "./config";

export const login = ({ username, password }) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const body = JSON.stringify({ username, password });
  await axios
    .post("/employees/login", body, config)
    .then(function(response) {
      dispatch({
        type: AUTHORIZED,
        payload: response.data
      });
    })
    .catch(err =>
      dispatch({
        type: ERROR,
        payload: err.response.data
      })
    );
};

export const logout = () => async dispatch => {
  dispatch({
    type: LOGOUT
  });
};
