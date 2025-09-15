import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CSPMDashboardWidget from "../components/CspmDashboardWidget";
import CWPPDashboardWidget from "../components/CWPPDashboardWidget";
import RegistryScanWidget from "../components/RegistryScanWidget";
import AddWidgetPanel from "../components/AddWidgetPanel";
import { toggleWidgetVisibility } from "../redux/widgetSlice";
import { useOutletContext } from "react-router-dom";

const Dashboard = () => {
  const categories = useSelector((state) => state.widgets.categories);
  const searchQuery = useSelector((state) => state.search.query);
  const [activeCategory, setActiveCategory] = useState(null);

  const { showAddWidget, setShowAddWidget } = useOutletContext();
  const dispatch = useDispatch();

  // Filter widgets by search query (case-insensitive)
  const filterWidgets = (widgets) => {
    if (!searchQuery) return widgets;
    return widgets.filter((w) =>
      w.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold mb-4 ">CNAPP Dashboard</h1>
      {categories.map((category) => {
        const filteredWidgets = filterWidgets(
          category.widgets.filter((w) => w.visible !== false)
        );

        if (filteredWidgets.length === 0) return null; // skip empty categories

        return (
          <div key={category.id}>
            <h2 className="text-lg font-bold mb-4  text-blue-500">
              {category.name}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {filteredWidgets.map((widget) => {
                if (widget.type === "donut") {
                  return (
                    <CSPMDashboardWidget
                      key={widget.id}
                      title={widget.title}
                      data={widget.data}
                      colors={widget.colors}
                      onRemove={() =>
                        dispatch(
                          toggleWidgetVisibility({
                            categoryId: category.id,
                            widgetId: widget.id,
                          })
                        )
                      }
                    />
                  );
                }
                if (widget.type === "line") {
                  return (
                    <CWPPDashboardWidget
                      key={widget.id}
                      title={widget.title}
                      data={widget.data}
                      onRemove={() =>
                        dispatch(
                          toggleWidgetVisibility({
                            categoryId: category.id,
                            widgetId: widget.id,
                          })
                        )
                      }
                    />
                  );
                }
                if (widget.type === "registry") {
                  return (
                    <RegistryScanWidget
                      key={widget.id}
                      title={widget.title}
                      totalLabel={widget.totalLabel}
                      totalValue={widget.totalValue}
                      states={widget.states}
                      onRemove={() =>
                        dispatch(
                          toggleWidgetVisibility({
                            categoryId: category.id,
                            widgetId: widget.id,
                          })
                        )
                      }
                    />
                  );
                }

                // fallback widget
                return (
                  <div
                    key={widget.id}
                    className="relative p-4 border rounded shadow bg-white"
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold">{widget.title}</h3>
                      <button
                        onClick={() =>
                          dispatch(
                            toggleWidgetVisibility({
                              categoryId: category.id,
                              widgetId: widget.id,
                            })
                          )
                        }
                        className="text-gray-400 hover:text-red-500 text-lg"
                      >
                        ×
                      </button>
                    </div>
                    <p className="text-gray-600 text-sm mt-2">{widget.text}</p>
                  </div>
                );
              })}

              {/* Add Widget Card */}
              <div
                className="flex items-center justify-center p-4 border-2 border-dashed rounded bg-gray-50 cursor-pointer hover:bg-gray-100"
                onClick={() => setActiveCategory(category.id)}
              >
                + Add Widget
              </div>
            </div>
          </div>
        );
      })}

      {/* Global AddWidget Panel */}
      {showAddWidget && (
        <AddWidgetPanel
          categoryId="CSPM"
          searchQuery={searchQuery}
          onClose={() => setShowAddWidget(false)}
        />
      )}

      {/* Per-category AddWidget Panel */}
      {activeCategory && (
        <AddWidgetPanel
          categoryId={activeCategory}
          searchQuery={searchQuery}
          onClose={() => setActiveCategory(null)}
        />
      )}
    </div>
  );
};

export default Dashboard;
