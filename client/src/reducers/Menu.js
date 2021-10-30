import { MENU } from "../actions/config";

const initialState = {
  loading: true,
  supplies: {},
  products: {},
  categories: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case MENU:
      return {
        ...state,
        supplies: payload.supplies,
        products: payload.products,
        categories: payload.categories,
        loading: false
      };
    default:
      return { ...state, loading: true };
  }
}
