import axios from "axios";
import { SUPPLIES, ERROR } from "./config";

export const suppliesList = () => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  await axios
    .get("/supplies/", config)
    .then(function(response) {
      dispatch({
        type: SUPPLIES,
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

export const modify_supplies = ({
  ProductID,
  ProductName,
  QuantityType,
  Quantity,
  MinimumQuantity
}) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  Quantity = parseFloat(Quantity);
  MinimumQuantity = parseFloat(MinimumQuantity);
  const body = JSON.stringify({
    ProductID,
    ProductName,
    QuantityType,
    Quantity,
    MinimumQuantity
  });
  await axios.post("/supplies/modify_supplies", body, config).catch(err =>
    dispatch({
      type: ERROR,
      payload: err.response.status
    })
  );
};

export const add_supplies = ({
  ID,
  ProductName,
  QuantityType,
  Quantity,
  MinimumQuantity
}) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const ProductID = ID;
  Quantity = parseFloat(Quantity);
  MinimumQuantity = parseFloat(MinimumQuantity);
  const body = JSON.stringify({
    ProductID,
    ProductName,
    QuantityType,
    Quantity,
    MinimumQuantity
  });
  await axios.post("/supplies/modify_supplies", body, config).catch(err =>
    dispatch({
      type: ERROR,
      payload: err.response.status
    })
  );
};

export const increase_stock = ({
  ProductID,
  Quantity,
  Cost
}) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  console.log("Cost: ", Cost);
  Quantity = parseFloat(Quantity);
  const body = JSON.stringify({
    ProductID,
    Quantity
  });
  await axios.post("/supplies/increase_stock", body, config).catch(err =>
    dispatch({
      type: ERROR,
      payload: err.response.status
    })
  );
};

export const decrease_stock = ({ ProductID, Quantity }) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  Quantity = parseFloat(Quantity);
  const body = JSON.stringify({
    ProductID,
    Quantity
  });
  await axios.post("/supplies/decrease_stock", body, config).catch(err =>
    dispatch({
      type: ERROR,
      payload: err.response.status
    })
  );
};
