import React from "react";
import Loadable from "react-loadable";
import Loader from "./components/loader/Loader";
import Fulllayout from "./layouts/fulllayout.jsx";
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
const Dashboard = Loadable({
  loader: () => import("./views/starter/starter.jsx"),
  loading: Loading,
});

const Store = Loadable({
  loader: () => import("./components/main Components/Vendor/Vendor"),
  loading: Loading,
});

const Transaction = Loadable({
  loader: () => import("./components/main Components/Transactions/Transaction"),
  loading: Loading,
});

const VendorType = Loadable({
  loader: () => import("./components/main Components/VendorType/VendorType"),
  loading: Loading,
});

const Enquiries = Loadable({
  loader: () => import("./components/main Components/Enquiries/Enquiries"),
  loading: Loading,
});

const Customer = Loadable({
  loader: () => import("./components/main Components/Customer/Customer"),
  loading: Loading,
});

const Venue = Loadable({
  loader: () => import("./components/main Components/Venue/Venue"),
  loading: Loading,
});

const routes = [
  { path: "/", exact: true, name: "Home", component: Fulllayout },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/vendor", name: "Vendor", component: Store },
  { path: "/transaction", name: "Transaction", component: Transaction },

  { path: "/enquiries", name: "Enquiries", component: Enquiries },
  { path: "/type", name: "VendorCategory", component: VendorType },

  { path: "/hall", name: "Venue", component: Venue },
  { path: "/customer", name: "Customer", component: Customer },
];

export default routes;
