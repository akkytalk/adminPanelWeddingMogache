var ThemeRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "fas fa-desktop",
  },
  {
    path: "/vendor",
    name: "Vendor",
    icon: "fas fa-street-view",
  },
  {
    path: "/hall",
    name: "Venues",
    icon: "fas fa-box",
  },
  {
    path: "/type",
    name: "Vendor Type",
    icon: "fas fa-archive",
  },
  {
    path: "/transaction",
    name: "Transaction",
    icon: "fas fa-rupee-sign",
  },

  {
    path: "/enquiries",
    name: "Enquiries",
    icon: "fas fa-book",
  },

  {
    path: "/customer",
    name: "Customer",
    icon: "fas fa-address-card",
  },
  // {
  //   path: "/user",
  //   name: "Users",
  //   icon: "fas fa-users",
  // },

  { path: "/", pathTo: "/dashboard", name: "Dashboard", redirect: true },
];
export default ThemeRoutes;
