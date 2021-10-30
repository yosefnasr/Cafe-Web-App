import axios from "axios";
import { ORDERSREPORT, ERROR } from "./config";

export const OrdersReportList = () => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  await axios
    .get("/ordersReport/", config)
    .then(function(response) {
      dispatch({
        type: ORDERSREPORT,
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
