import { ORDERS } from "../actions/config";

const initialState = {
  loading: true,
  orders: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ORDERS:
      return {
        ...state,
        categories: payload.categories,
        products: payload.products,
        supplies: payload.supplies,
        orders: payload.orders,
        PaidOrders: payload.PaidOrders.length,
        loading: false
      };
    default:
      return { ...state, loading: true };
  }
}
