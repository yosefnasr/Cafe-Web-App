import axios from "axios";
import { ORDERS, ERROR } from "./config";

export const ordersList = () => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  await axios
    .get("/orders/", config)
    .then(function(response) {
      dispatch({
        type: ORDERS,
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

export const modify_orders = ({
  OrderID,
  EmployeeName,
  TableNumber,
  Items,
  TotalCost,
  Paid
}) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  OrderID = parseFloat(OrderID);
  TableNumber = parseFloat(TableNumber);
  TotalCost = parseFloat(TotalCost);
  const body = JSON.stringify({
    OrderID,
    EmployeeName,
    TableNumber,
    Items,
    TotalCost,
    Paid
  });
  await axios.post("/orders/modify_orders", body, config).catch(err =>
    dispatch({
      type: ERROR,
      payload: err.response.status
    })
  );
};
