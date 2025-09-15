import { createSlice } from "@reduxjs/toolkit";
import initialData from "../dashboard.json";

const initialState = {
  categories: initialData.categories.map((cat) => ({
    ...cat,
    widgets: cat.widgets.map((w) => ({ ...w, visible: true })),
  })),
};

const widgetSlice = createSlice({
  name: "widgets",
  initialState,
  reducers: {
    toggleWidgetVisibility: (state, action) => {
      const { categoryId, widgetId } = action.payload;
      const category = state.categories.find((c) => c.id === categoryId);
      if (category) {
        const widget = category.widgets.find((w) => w.id === widgetId);
        if (widget) widget.visible = !widget.visible;
      }
    },
    addWidget: (state, action) => {
      const { categoryId, title, text } = action.payload;
      const category = state.categories.find((c) => c.id === categoryId);
      if (category) {
        category.widgets.push({
          id: Date.now().toString(),
          title,
          text,
          visible: true,
        });
      }
    },
    removeWidgetPermanently: (state, action) => {
      const { categoryId, widgetId } = action.payload;
      const category = state.categories.find((c) => c.id === categoryId);
      if (category) {
        category.widgets = category.widgets.filter((w) => w.id !== widgetId);
      }
    },
  },
});

export const { toggleWidgetVisibility, addWidget, removeWidgetPermanently } =
  widgetSlice.actions;
export default widgetSlice.reducer;
