import { combineReducers } from "redux";
import authoritarian from "./authoritarian";
import employees from "./employees";
import supplies from "./supplies";
import menu from "./Menu";
import orders from "./orders";
import preparingOrders from "./preparingOrders";
import ordersReport from "./ordersReport";

export default combineReducers({
  authoritarian: authoritarian,
  employees: employees,
  supplies: supplies,
  menu: menu,
  orders: orders,
  preparingOrders: preparingOrders,
  ordersReport: ordersReport
});
