import { SUPPLIES } from "../actions/config";

const initialState = {
  loading: true,
  supplies: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SUPPLIES:
      return {
        ...state,
        supplies: payload.supplies,
        loading: false
      };
    default:
      return { ...state, loading: true };
  }
}
