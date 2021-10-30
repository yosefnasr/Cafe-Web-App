import { ORDERSREPORT } from "../actions/config";

const initialState = {
  loading: true,
  orders: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ORDERSREPORT:
      return {
        ...state,
        orders: payload.orders,
        loading: false
      };
    default:
      return { ...state, loading: true };
  }
}
