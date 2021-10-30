import axios from "axios";
import { PREPARINGORDERS, ERROR } from "./config";

export const preparingOrdersList = () => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  await axios
    .get("/preparingOrders/", config)
    .then(function(response) {
      dispatch({
        type: PREPARINGORDERS,
        payload: response.data
      });
    })
    .catch(err =>
      dispatch({
        type: ERROR,
        payload: err.response.status
      })
    );
};

export const modify_order_waiting = ({ OrderID }) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  OrderID = parseFloat(OrderID);
  const body = JSON.stringify({
    OrderID
  });
  await axios
    .post("/preparingOrders/modify_waiting_order", body, config)
    .catch(err =>
      dispatch({
        type: ERROR,
        payload: err.response.status
      })
    );
};
