import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleWidgetVisibility,
  addWidget,
  removeWidgetPermanently,
} from "../redux/widgetSlice";

const AddWidgetPanel = ({ categoryId, onClose, searchQuery }) => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.widgets.categories || []);

  const [activeTab, setActiveTab] = useState(
    categoryId || categories[0]?.id || ""
  );
  const [showForm, setShowForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newText, setNewText] = useState("");
  const [pending, setPending] = useState([]);

  useEffect(() => {
    if (categoryId && categoryId !== activeTab) setActiveTab(categoryId);
    else if (!activeTab && categories.length) setActiveTab(categories[0].id);
  }, [categoryId]);

  const activeCategory = categories.find((c) => c.id === activeTab);

  const allWidgets = useMemo(() => {
    if (searchQuery?.trim()) {
      const q = searchQuery.toLowerCase();
      return categories
        .flatMap((cat) =>
          cat.widgets.map((w) => ({ ...w, categoryId: cat.id }))
        )
        .filter((w) => w.title.toLowerCase().includes(q));
    }
    return (
      activeCategory?.widgets.map((w) => ({
        ...w,
        categoryId: activeCategory.id,
      })) || []
    );
  }, [categories, activeCategory, searchQuery]);

  const handleAddToPending = () => {
    if (!newTitle.trim()) return;
    setPending((p) => [
      {
        id: `pending-${Date.now()}`,
        title: newTitle.trim(),
        text: newText.trim(),
        visible: true,
      },
      ...p,
    ]);
    setNewTitle("");
    setNewText("");
    setShowForm(false);
  };

  const handleConfirm = () => {
    pending.forEach((w) => {
      dispatch(
        addWidget({
          categoryId: activeCategory?.id || "CSPM",
          title: w.title,
          text: w.text,
        })
      );
    });
    setPending([]);
    onClose?.();
  };

  if (!categories.length) return null;

  return (
    <div className="absolute right-0 top-0 w-96 h-full bg-white shadow-lg p-4 border-l overflow-y-auto z-50">
      <div className="bg-blue-500 text-white px-3 py-2 rounded">Add Widget</div>
      <p className="text-sm text-gray-600 mt-2">
        Personalize your dashboard by adding widgets
      </p>

      {!searchQuery && (
        <div className="flex space-x-4 mt-3 border-b pb-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`pb-2 font-medium ${
                activeTab === cat.id
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-600 hover:text-blue-500"
              }`}
            >
              {cat.id}
            </button>
          ))}
        </div>
      )}

      {pending.length > 0 && (
        <div className="mt-4">
          <div className="text-sm font-medium mb-2">New widget(s) to add</div>
          {pending.map((w) => (
            <div
              key={w.id}
              className="border rounded p-2 flex justify-between items-start"
            >
              <div>
                <div className="font-semibold text-sm">{w.title}</div>
                {w.text && (
                  <div className="text-xs text-gray-500 mt-1">{w.text}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 space-y-2">
        <div className="text-sm font-medium mb-2">Available widgets</div>
        {allWidgets.length ? (
          allWidgets.map((widget) => {
            const parentCategory = categories.find(
              (c) => c.id === widget.categoryId
            );
            const isVisible = widget.visible ?? true;

            return (
              <div
                key={widget.id}
                className="flex justify-between items-center border rounded p-2"
              >
                <label className="flex items-center space-x-2 w-full cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isVisible}
                    onChange={() =>
                      dispatch(
                        toggleWidgetVisibility({
                          categoryId: parentCategory.id,
                          widgetId: widget.id,
                        })
                      )
                    }
                  />
                  <span className="text-sm">{widget.title}</span>
                </label>
                <button
                  className="text-red-500"
                  onClick={() =>
                    dispatch(
                      removeWidgetPermanently({
                        categoryId: parentCategory.id,
                        widgetId: widget.id,
                      })
                    )
                  }
                >
                  x
                </button>
              </div>
            );
          })
        ) : searchQuery ? (
          <div className="text-sm text-red-500 py-4">
            No widgets found for "{searchQuery}"
          </div>
        ) : (
          <div className="text-sm text-gray-500 py-4">
            No available widgets in this category.
          </div>
        )}
      </div>

      {showForm ? (
        <div className="mt-4 border p-3 rounded">
          <div className="text-sm font-medium mb-2">Add New Widget</div>
          <input
            type="text"
            placeholder="Widget Title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="w-full border rounded px-2 py-1 mb-2"
          />
          <textarea
            placeholder="Widget Text (optional)"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            className="w-full border rounded px-2 py-1 mb-2"
            rows={3}
          />
          <div className="flex justify-between">
            <button
              className="px-3 py-1 border rounded text-sm"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
            <button
              className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
              onClick={handleAddToPending}
            >
              Add to list
            </button>
          </div>
        </div>
      ) : (
        <button
          className="mt-4 px-3 py-2 w-full border rounded bg-gray-100 hover:bg-gray-200 text-sm"
          onClick={() => setShowForm(true)}
        >
          + Add Widget
        </button>
      )}

      <div className="mt-6 flex justify-end space-x-2">
        <button onClick={onClose} className="px-3 py-1 border rounded">
          Cancel
        </button>
        <button
          onClick={handleConfirm}
          className="px-3 py-1 bg-blue-500 text-white rounded"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default AddWidgetPanel;
