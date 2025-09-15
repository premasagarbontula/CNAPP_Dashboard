import { createSlice } from "@reduxjs/toolkit";
import dashboardData from "../dashboard.json";

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    categories: dashboardData.categories,
    showAddPanel: false,
    activeTab: "CSPM",
  },
  reducers: {
    toggleWidget: (state, action) => {
      const { categoryId, widgetId } = action.payload;
      const category = state.categories.find((c) => c.id === categoryId);
      if (category) {
        const exists = category.widgets.some((w) => w.id === widgetId);
        if (exists) {
          category.widgets = category.widgets.filter((w) => w.id !== widgetId);
        } else {
          const widget = dashboardData.categories
            .find((c) => c.id === categoryId)
            .widgets.find((w) => w.id === widgetId);
          if (widget) category.widgets.push(widget);
        }
      }
    },
    setShowAddPanel: (state, action) => {
      state.showAddPanel = action.payload;
    },
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
  },
});

export const { toggleWidget, setShowAddPanel, setActiveTab } =
  dashboardSlice.actions;

export default dashboardSlice.reducer;
