import React from "react";
import Loadable from "react-loadable";

import Loader from "../components/loader/Loader";

function Loading() {
  return (
    <div className="container">
      <div className="row">
        <div
          className="col"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
          }}
        >
          <Loader />
        </div>
      </div>
    </div>
  );
}
// const Dashboard = Loadable({
//   loader: () => import("./views/starter/starter.jsx"),
//   loading: Loading,
// });

// const Store = Loadable({
//   loader: () => import("./components/main Components/Store/Store"),
//   loading: Loading,
// });

// const PizzaCorner = Loadable({
//   loader: () => import("./components/PizzaCorner/PizzaCorner.js"),
//   loading: Loading,
// });

// const Slots = Loadable({
//   loader: () => import("./components/main Components/Slots/Slots"),
//   loading: Loading,
// });

// const Agreement = Loadable({
//   loader: () => import("./components/main Components/Agreement/Agreement"),
//   loading: Loading,
// });

// const TermCondition = Loadable({
//   loader: () =>
//     import("./components/main Components/Term&Condition/TermCondition"),
//   loading: Loading,
// });

// const Enquiries = Loadable({
//   loader: () => import("./components/main Components/Enquiries/Enquiries"),
//   loading: Loading,
// });

// const Customer = Loadable({
//   loader: () => import("./components/main Components/Customer/Customer"),
//   loading: Loading,
// });

const CustomerRoutes = [
  //   { path: "/dashboard", name: "Dashboard", component: Dashboard },
  //   { path: "/store", name: "Store", component: Store },
  //   { path: "/slots", name: "Slots", component: Slots },
  //   { path: "/pizza", name: "Pizza", component: PizzaCorner },
  //   { path: "/agreement", name: "Agreement", component: Agreement },
  //   { path: "/term&conditions", name: "TermCondition", component: TermCondition },
  //   { path: "/enquiry", name: "Enquiries", component: Enquiries },
  //   { path: "/customer", name: "Customer", component: Customer },
];

export default CustomerRoutes;
