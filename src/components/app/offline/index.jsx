import React, { useEffect } from "react";
import useOnlineStatus from "../../../hooks/use-online-status";
import { useNavigate, useLocation } from "react-router-dom";

const OfflinePage = () => {
  const isOnline = useOnlineStatus();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isOnline) {
      const savedRoute = localStorage.getItem("lastRoute") || "/";
      console.log("Going online - Saved route:", savedRoute);

      if (location.pathname === "/offline") {
        console.log("Navigating back to:", savedRoute);
        navigate(savedRoute, { replace: true });
      }
    }
  }, [isOnline, location.pathname, navigate]);

  if (isOnline) return null;

  return (
    <div className='h-screen flex items-center justify-center  transition-colors duration-300'>
      <div className='text-center p-6 max-w-md mx-auto'>
        <div className='mb-6'>
          <svg
            className='w-16 h-16 mx-auto text-gray-500 dark:text-gray-400 animate-pulse'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M12 8v4m0 4h.01M12 2a10 10 0 100 20 10 10 0 000-20z'
            />
          </svg>
        </div>

        <h1 className='text-4xl font-extrabold text-gray-800 dark:text-white mb-4'>
          You’re Offline, Bro!
        </h1>

        <p className='text-lg text-gray-600 dark:text-gray-300 mb-6'>
          Looks like your internet took a nap. Check your connection and we’ll
          get you back in no time.
        </p>

        <button
          onClick={() => window.location.reload()}
          className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500'>
          Try Reloading
        </button>
      </div>
    </div>
  );
};

export default OfflinePage;
