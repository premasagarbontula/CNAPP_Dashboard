import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../redux/searchSlice";

const Navbar = ({ onAddWidget }) => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(Boolean);
  const dispatch = useDispatch();
  const searchQuery = useSelector((state) => state.search.query);

  return (
    <div className="flex justify-between items-center p-3 border-b bg-white">
      {/* Breadcrumbs */}
      <div className="text-sm">
        <Link to="/" className="text-gray-600 hover:underline">
          Home
        </Link>

        {pathnames.map((segment, index) => {
          const routeTo = "/" + pathnames.slice(0, index + 1).join("/");
          const isLast = index === pathnames.length - 1;

          return (
            <span key={routeTo}>
              {" > "}
              {!isLast ? (
                <Link to={routeTo} className="text-gray-600 hover:underline">
                  {segment.replace(/-/g, " ")}
                </Link>
              ) : (
                <span className="font-semibold">
                  {segment.replace(/-/g, " ")}
                </span>
              )}
            </span>
          );
        })}
      </div>

      {/* Search + Add Widget */}
      <div className="flex items-center space-x-3">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          placeholder="Search widgets..."
          className="border rounded-md px-3 py-1 w-64"
        />
        <button
          onClick={onAddWidget}
          className="flex items-center space-x-2 px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          <Plus size={18} />
          <span>Add Widget</span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
