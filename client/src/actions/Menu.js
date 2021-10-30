import axios from "axios";
import { MENU, ERROR } from "./config";

export const menuList = () => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  await axios
    .get("/menu/", config)
    .then(function(response) {
      dispatch({
        type: MENU,
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

export const modify_menu = ({
  ProductID,
  ProductName,
  Category,
  CategoryID,
  SuppliesConsumption,
  Cost
}) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  ProductID = parseFloat(ProductID);
  Cost = parseFloat(Cost);
  CategoryID = parseFloat(CategoryID);
  const body = JSON.stringify({
    ProductID,
    ProductName,
    Category,
    CategoryID,
    SuppliesConsumption,
    Cost
  });
  await axios.post("/menu/modify_menu", body, config).catch(err =>
    dispatch({
      type: ERROR,
      payload: err.response.status
    })
  );
};

export const modify_categories = ({
  CategoryID,
  Category
}) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  let CategoryName = Category;
  CategoryID = parseFloat(CategoryID);
  const body = JSON.stringify({
    CategoryID,
    CategoryName
  });
  await axios.post("/categories/modify_categories", body, config).catch(err =>
    dispatch({
      type: ERROR,
      payload: err.response.status
    })
  );
};
