import Employees from "./views/Employees.jsx";
import Supplies from "./views/Supplies.jsx";
import Orders from "./views/Order";
import Menu from "./views/Menu";
import PreparingOrders from "./views/preparingOrders";
import ordersReport from "./views/ordersReport";

const dashboardRoutes = [
  {
    path: "/Employees",
    name: "Employees",
    icon: "fas fa-users",
    component: Employees,
    layout: "/admin"
  },
  {
    path: "/Supplies",
    name: "Supplies Stock",
    icon: "fas fa-box-open",
    component: Supplies,
    layout: "/admin"
  },
  {
    path: "/Menu",
    name: "Menu",
    icon: "fa fa-coffee",
    component: Menu,
    layout: "/admin"
  },
  {
    path: "/Orders",
    name: "Orders",
    icon: "fa fa-marker",
    component: Orders,
    layout: "/admin"
  },
  {
    path: "/preparingOrders",
    name: "Preparing Orders",
    icon: "fa fa-hourglass-start",
    component: PreparingOrders,
    layout: "/admin"
  },
  {
    path: "/ordersReport",
    name: "Orders Report",
    icon: "fa fa-clipboard-list",
    component: ordersReport,
    layout: "/admin"
  }
];

export default dashboardRoutes;
