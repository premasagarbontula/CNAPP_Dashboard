import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Home Page</h1>
      <Link
        to="/dashboard-v2"
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Go to Dashboard V2
      </Link>
    </div>
  );
};

export default Home;
