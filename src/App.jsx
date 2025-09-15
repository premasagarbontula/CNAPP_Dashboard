import React, { useState } from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";

const Layout = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddWidget, setShowAddWidget] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);

  return (
    <>
      <Navbar
        onAddWidget={() => {
          setActiveCategory("csmp"); // ✅ open with CSMP by default
          setShowAddWidget(true);
        }}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      {/* Pass props down to child routes */}
      <Outlet
        context={{
          searchQuery,
          showAddWidget,
          setShowAddWidget,
          activeCategory,
          setActiveCategory,
        }}
      />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
        handle: { breadcrumb: "Home" },
      },
      {
        path: "dashboard-v2",
        element: <Dashboard />,
        handle: { breadcrumb: "Dashboard V2" },
      },
    ],
  },
]);

const App = () => <RouterProvider router={router} />;

export default App;
