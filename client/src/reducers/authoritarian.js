import { AUTHORIZED, LOGOUT } from "../actions/config";

const initialState = {
  Authorized: false,
  admin: false,
  loading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case AUTHORIZED:
      localStorage.setItem("userID", payload.userID);
      localStorage.setItem("name", payload.name);
      return {
        ...state,
        Authorized: true,
        admin: payload.admin,
        loading: false
      };
    case LOGOUT:
      localStorage.removeItem("userID");
      localStorage.removeItem("name");
      return {
        ...state,
        Authorized: false,
        admin: false,
        loading: false
      };
    default:
      return { ...state, loading: true };
  }
}
