import { createStore, applyMiddleware, compose } from "redux";
import { persistStore, persistCombineReducers } from "redux-persist";
import thunk from "redux-thunk";
import storage from "redux-persist/es/storage";
import { Login } from "./reducers/login";
import logger from "redux-logger";
import RVendor from "./reducers/RVendor";
import RTransaction from "./reducers/RTransaction";

import RCustomer from "./reducers/RCustomer";
import RCategory from "./reducers/RCategory";
import RVendorType from "./reducers/RVendorType";

const config = {
  key: "Wedding-mogache-admin",
  storage,
  debug: true,
};
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const configureStore = () => {
  const store = createStore(
    persistCombineReducers(config, {
      login: Login,
      vendor: RVendor,
      transaction: RTransaction,

      customer: RCustomer,
      category: RCategory,
      vendortype: RVendorType,
    }),
    composeEnhancer(applyMiddleware(thunk, logger))
  );
  const persistor = persistStore(store);
  return { persistor, store };
};
