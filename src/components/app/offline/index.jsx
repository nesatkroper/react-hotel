import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { CloudOff, RefreshCw, WifiOff } from "lucide-react";
import useOnlineStatus from "@/hooks/use-online-status";

export default function OfflinePage() {
  const isOnline = useOnlineStatus();
  const navigate = useNavigate();
  const location = useLocation();
  const [retryCount, setRetryCount] = useState(0);
  const [isRetrying, setIsRetrying] = useState(false);

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

  const handleRetry = () => {
    setIsRetrying(true);
    setRetryCount((prev) => prev + 1);

    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };

  if (isOnline) return null;

  return (
    <div className='min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex items-center justify-center p-4'>
      <div className='max-w-md w-full'>
        <motion.div
          className='bg-white dark:bg-slate-950 rounded-2xl shadow-xl overflow-hidden'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}>
          {/* Top wave decoration */}
          <div className='h-16 bg-gradient-to-r from-purple-500 to-indigo-600 relative overflow-hidden'>
            <svg
              className='absolute bottom-0 w-full'
              viewBox='0 0 1200 120'
              preserveAspectRatio='none'>
              <path
                d='M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z'
                className='fill-white dark:fill-slate-950'
                opacity='0.8'
              />
            </svg>

            <motion.div
              className='absolute inset-0 flex justify-center'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className='mt-6'>
                <CloudOff className='h-10 w-10 text-white' />
              </motion.div>
            </motion.div>
          </div>

          <div className='p-6'>
            <motion.div
              className='text-center space-y-6'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}>
              <motion.div
                className='relative mx-auto w-32 h-32 mb-8'
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5, type: "spring" }}>
                <motion.div
                  className='absolute inset-0 bg-indigo-100 dark:bg-indigo-950/30 rounded-full'
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 3,
                    ease: "easeInOut",
                  }}
                />

                <motion.div
                  className='absolute inset-0 flex items-center justify-center'
                  animate={{ rotate: 360 }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 8,
                    ease: "linear",
                  }}>
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      className='absolute w-full h-full'
                      style={{ rotate: `${i * 45}deg` }}>
                      <motion.div
                        className='absolute top-0 left-1/2 w-1 h-3 bg-indigo-300 dark:bg-indigo-700 rounded-full'
                        style={{ transform: "translateX(-50%)" }}
                        animate={{
                          opacity: [0.3, 1, 0.3],
                          height: ["12px", "16px", "12px"],
                        }}
                        transition={{
                          repeat: Number.POSITIVE_INFINITY,
                          duration: 1.5,
                          delay: i * 0.2,
                          ease: "easeInOut",
                        }}
                      />
                    </motion.div>
                  ))}
                </motion.div>

                <div className='absolute inset-0 flex items-center justify-center'>
                  <motion.div
                    animate={{
                      opacity: [1, 0.5, 1],
                      scale: [1, 0.95, 1],
                    }}
                    transition={{
                      repeat: Number.POSITIVE_INFINITY,
                      duration: 2,
                      ease: "easeInOut",
                    }}>
                    <WifiOff className='h-12 w-12 text-indigo-600 dark:text-indigo-400' />
                  </motion.div>
                </div>
              </motion.div>

              <motion.h1
                className='text-3xl font-bold text-slate-800 dark:text-white'
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}>
                {`You're Offline`}
              </motion.h1>

              <motion.p
                className='text-slate-600 dark:text-slate-300'
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}>
                {`Looks like your internet connection decided to take a break.
                Don't worry, we'll be here when you're back online.`}
              </motion.p>

              <motion.div
                className='pt-4'
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}>
                <button
                  onClick={handleRetry}
                  disabled={isRetrying}
                  className='relative inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg shadow-lg hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 transition-all duration-300 overflow-hidden group'>
                  <span className='relative flex items-center gap-2'>
                    {isRetrying ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            repeat: Number.POSITIVE_INFINITY,
                            duration: 1,
                            ease: "linear",
                          }}>
                          <RefreshCw className='h-4 w-4' />
                        </motion.div>
                        Checking...
                      </>
                    ) : (
                      <>
                        <RefreshCw className='h-4 w-4' />
                        Try Again
                      </>
                    )}
                  </span>

                  <motion.span
                    className='absolute inset-0 bg-white'
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                      scale: isRetrying ? [0, 1.5] : 0,
                      opacity: isRetrying ? [0.3, 0] : 0,
                    }}
                    transition={{ duration: 1 }}
                  />
                </button>
              </motion.div>

              {retryCount > 0 && (
                <motion.div
                  className='text-sm text-slate-500 dark:text-slate-400 mt-4'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}>
                  Retry attempts: {retryCount}
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* Connection status indicator */}
          <motion.div
            className='border-t border-slate-200 dark:border-slate-800 p-4 bg-slate-50 dark:bg-slate-900/50 flex items-center justify-between'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}>
            <div className='flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400'>
              <motion.div
                animate={{
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 2,
                  ease: "easeInOut",
                }}
                className='flex items-center gap-1.5'>
                <span className='relative flex h-2.5 w-2.5'>
                  <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75'></span>
                  <span className='relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500'></span>
                </span>
                <span>No connection</span>
              </motion.div>
            </div>

            <div className='flex items-center gap-1'>
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  className='h-4 w-1 rounded-full bg-slate-300 dark:bg-slate-700'
                  animate={{
                    height: i < 1 ? ["16px", "8px", "16px"] : "8px",
                    opacity: i < 1 ? 1 : 0.5,
                  }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 1.5,
                    delay: i * 0.1,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className='mt-6 text-center text-sm text-slate-400'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}>
          <p>
            {`Your data is saved locally and will sync when you're back online.`}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
