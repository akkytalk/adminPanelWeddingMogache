import Login2 from "../Auth/Login2.js";
import Fulllayout from "../layouts/fulllayout.jsx";
import Login from "../views/auth/Login";

var indexRoutes = [
  { path: "/", name: "Starter", component: Fulllayout },
  { path: "/login", name: "Starter", component: Login2 },
];

export default indexRoutes;
