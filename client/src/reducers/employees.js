import { EMPLOYEES } from "../actions/config";

const initialState = {
  loading: true,
  users: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case EMPLOYEES:
      return {
        ...state,
        users: payload.users,
        loading: false
      };
    default:
      return { ...state, loading: true };
  }
}
