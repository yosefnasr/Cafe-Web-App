import axios from "axios";
import { EMPLOYEES, ERROR } from "./config";

export const employees = () => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  await axios
    .get("/employees/", config)
    .then(function(response) {
      dispatch({
        type: EMPLOYEES,
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

export const modify_employees = ({
  username,
  password,
  name,
  Birthdate,
  NationalID,
  Phone_1,
  Phone_2,
  Adress,
  Job,
  Salary,
  EndedDate,
  admin,
  About
}) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const body = JSON.stringify({
    username,
    password,
    name,
    Birthdate,
    NationalID,
    Phone_1,
    Phone_2,
    Adress,
    Job,
    Salary,
    EndedDate,
    admin,
    About
  });
  await axios.post("/employees/modify_employees", body, config).catch(err =>
    dispatch({
      type: ERROR,
      payload: err.response.status
    })
  );
};
