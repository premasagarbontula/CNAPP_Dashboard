import { configureStore } from "@reduxjs/toolkit";
import dashboardReducer from "./dashboardSlice";
import widgetReducer from "./widgetSlice";
import searchReducer from "./searchSlice";

const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    widgets: widgetReducer,
    search: searchReducer,
  },
});

export default store;
