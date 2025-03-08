import React from "react";

const OfflinePage = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-800 text-white">
      <div className="text-center">
        <h1 className="text-3xl font-bold">You are offline</h1>
        <p>Please check your internet connection.</p>
      </div>
    </div>
  );
};

export default OfflinePage;
