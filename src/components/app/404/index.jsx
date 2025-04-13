import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";

export default function NotFound() {
  const router = useNavigate();
  const [animationState, setAnimationState] = useState(0);
  const [isSearching, setIsSearching] = useState(false);
  const [showMagnifier, setShowMagnifier] = useState(false);

  useEffect(() => {
    const sequence = [0, 1, 2, 3, 0];
    let currentIndex = 0;

    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % sequence.length;
      setAnimationState(sequence[currentIndex]);

      if (currentIndex === 1) {
        setIsSearching(true);
        setTimeout(() => setShowMagnifier(true), 300);
      } else {
        setIsSearching(false);
        setShowMagnifier(false);
      }
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  const stars = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 0.5 + 0.2,
    delay: Math.random() * 2,
  }));

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-indigo-950 to-purple-900 p-4 overflow-hidden'>
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className='absolute bg-white rounded-full z-0'
          style={{
            top: star.top,
            left: star.left,
            width: `${star.size}rem`,
            height: `${star.size}rem`,
          }}
          animate={{
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 3,
            delay: star.delay,
          }}
        />
      ))}

      <div className='absolute inset-0 z-0 overflow-hidden'>
        {[1, 2, 3, 4].map((cloud) => (
          <motion.div
            key={cloud}
            className='absolute bg-white/10 rounded-full'
            style={{
              width: `${cloud * 100 + 50}px`,
              height: `${cloud * 30 + 20}px`,
              top: `${cloud * 15}%`,
              left: `-${cloud * 50}px`,
            }}
            animate={{
              x: ["0vw", "100vw"],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 15 + cloud * 5,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className='max-w-2xl w-full text-center space-y-4 relative z-10'>
        <motion.h1
          className='text-8xl font-extrabold tracking-tight text-white'
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}>
          <motion.span
            className='text-3xl'
            animate={{
              color: ["#ffffff", "#60a5fa", "#ffffff"],
              textShadow: [
                "0 0 7px rgba(255,255,255,0.5)",
                "0 0 20px rgba(96,165,250,0.8)",
                "0 0 7px rgba(255,255,255,0.5)",
              ],
            }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}>
            4
          </motion.span>
          <motion.span
            className='text-3xl'
            animate={{
              rotateY: [0, 360],
              color: ["#ffffff", "#f472b6", "#ffffff"],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              delay: 1,
            }}>
            0
          </motion.span>
          <motion.span
            className='text-3xl'
            animate={{
              color: ["#ffffff", "#60a5fa", "#ffffff"],
              textShadow: [
                "0 0 7px rgba(255,255,255,0.5)",
                "0 0 20px rgba(96,165,250,0.8)",
                "0 0 7px rgba(255,255,255,0.5)",
              ],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              delay: 2,
            }}>
            4
          </motion.span>
        </motion.h1>

        <div className='relative h-72 w-full'>
          <motion.div
            className='absolute bottom-0 left-0 right-0 h-20 bg-purple-800 rounded-t-full'
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          />

          <motion.div
            className='absolute bottom-8 left-1/4 w-12 h-4 bg-purple-900 rounded-full'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 1 }}
          />
          <motion.div
            className='absolute bottom-12 right-1/3 w-8 h-3 bg-purple-900 rounded-full'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 1.2 }}
          />

          <motion.div
            className='absolute left-1/2 bottom-16'
            style={{ x: "-50%" }}
            animate={{
              y: animationState === 3 ? [0, -10, 0] : 0,
              x: ["-50%", "-48%", "-52%", "-50%"],
            }}
            transition={{
              y: { duration: 0.5, repeat: animationState === 3 ? 2 : 0 },
              x: { duration: 2, repeat: Number.POSITIVE_INFINITY },
            }}>
            <motion.div
              className='relative'
              animate={{
                rotate: isSearching ? [-5, 5, -5] : 0,
              }}
              transition={{
                duration: 1.5,
                repeat: isSearching ? Number.POSITIVE_INFINITY : 0,
              }}>
              <motion.div
                className='relative w-32 h-28 bg-gradient-to-b from-slate-300 to-slate-400 rounded-t-2xl border-2 border-slate-500'
                animate={{
                  y: [0, -3, 0],
                }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}>
                <div className='absolute inset-3 bg-slate-800 rounded-lg overflow-hidden'>
                  <AnimatePresence>
                    {animationState === 0 && (
                      <motion.div
                        className='flex justify-center space-x-4 mt-4'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}>
                        <motion.div
                          className='w-4 h-4 bg-blue-400 rounded-full'
                          animate={{
                            scale: [1, 1.2, 1],
                            backgroundColor: ["#60a5fa", "#93c5fd", "#60a5fa"],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                          }}
                        />
                        <motion.div
                          className='w-4 h-4 bg-blue-400 rounded-full'
                          animate={{
                            scale: [1, 1.2, 1],
                            backgroundColor: ["#60a5fa", "#93c5fd", "#60a5fa"],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                            delay: 0.3,
                          }}
                        />
                      </motion.div>
                    )}

                    {animationState === 1 && (
                      <motion.div
                        className='flex flex-col items-center justify-center h-full'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}>
                        <motion.div
                          className='w-12 h-1 bg-yellow-400 mb-1'
                          animate={{ width: ["1rem", "3rem", "1rem"] }}
                          transition={{
                            duration: 1,
                            repeat: Number.POSITIVE_INFINITY,
                          }}
                        />
                        <motion.div
                          className='w-8 h-1 bg-yellow-400'
                          animate={{ width: ["0.5rem", "2rem", "0.5rem"] }}
                          transition={{
                            duration: 1,
                            repeat: Number.POSITIVE_INFINITY,
                            delay: 0.2,
                          }}
                        />
                      </motion.div>
                    )}

                    {animationState === 2 && (
                      <motion.div
                        className='flex flex-col items-center justify-center h-full'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}>
                        <div className='flex justify-center space-x-4 mb-2'>
                          <motion.div
                            className='w-4 h-4 bg-orange-400 rounded-full'
                            animate={{ y: [0, -2, 0] }}
                            transition={{
                              duration: 0.5,
                              repeat: Number.POSITIVE_INFINITY,
                            }}
                          />
                          <motion.div
                            className='w-4 h-4 bg-orange-400 rounded-full'
                            animate={{ y: [0, -2, 0] }}
                            transition={{
                              duration: 0.5,
                              repeat: Number.POSITIVE_INFINITY,
                              delay: 0.25,
                            }}
                          />
                        </div>
                        <motion.div
                          className='w-8 h-1 bg-orange-400 rounded-full'
                          animate={{ rotate: [0, 10, -10, 0] }}
                          transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                          }}
                        />
                      </motion.div>
                    )}

                    {animationState === 3 && (
                      <motion.div
                        className='flex flex-col items-center justify-center h-full'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}>
                        <div className='flex justify-center space-x-4 mb-3'>
                          <motion.div className='w-4 h-1 bg-blue-400 rounded-full rotate-45 translate-y-1' />
                          <motion.div className='w-4 h-1 bg-blue-400 rounded-full -rotate-45 translate-y-1' />
                        </div>
                        <motion.div
                          className='w-8 h-8 border-t-0 border-r-0 border-l-0 border-b-4 border-blue-400 rounded-full'
                          style={{ borderRadius: "0 0 10px 10px" }}
                        />
                        <motion.div
                          className='absolute w-2 h-8 bg-blue-400/30 rounded-full bottom-1 left-6'
                          animate={{
                            height: [0, 8, 0],
                            opacity: [0, 0.7, 0],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                            delay: 1,
                          }}
                        />
                        <motion.div
                          className='absolute w-2 h-8 bg-blue-400/30 rounded-full bottom-1 right-6'
                          animate={{
                            height: [0, 8, 0],
                            opacity: [0, 0.7, 0],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                            delay: 1.5,
                          }}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <motion.div
                  className='absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full'
                  animate={{ rotateZ: [-5, 5, -5] }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                  }}>
                  <div className='w-1 h-6 bg-slate-500' />
                  <motion.div
                    className='w-3 h-3 rounded-full bg-red-500 absolute -top-1 left-1/2 -translate-x-1/2'
                    animate={{
                      backgroundColor: ["#ef4444", "#f87171", "#ef4444"],
                      boxShadow: [
                        "0 0 5px rgba(239,68,68,0.5)",
                        "0 0 15px rgba(239,68,68,0.8)",
                        "0 0 5px rgba(239,68,68,0.5)",
                      ],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  />
                </motion.div>
              </motion.div>

              <div className='w-40 h-24 bg-gradient-to-b from-slate-400 to-slate-500 rounded-b-lg border-2 border-t-0 border-slate-600 relative'>
                <div className='absolute top-2 left-1/2 -translate-x-1/2 w-32 h-8 bg-slate-700 rounded-md flex items-center justify-around'>
                  <motion.div
                    className='w-3 h-3 rounded-full bg-green-500'
                    animate={{
                      backgroundColor: ["#22c55e", "#4ade80", "#22c55e"],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  />
                  <motion.div
                    className='w-3 h-3 rounded-full bg-yellow-500'
                    animate={{
                      backgroundColor: ["#eab308", "#facc15", "#eab308"],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: 0.5,
                    }}
                  />
                  <motion.div
                    className='w-3 h-3 rounded-full bg-red-500'
                    animate={{
                      backgroundColor: ["#ef4444", "#f87171", "#ef4444"],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: 1,
                    }}
                  />
                </div>

                <motion.div
                  className='absolute -left-6 top-6 w-6 h-3 bg-slate-500 rounded-l-full'
                  animate={{
                    rotate: isSearching ? [0, -20, 0] : 0,
                  }}
                  transition={{
                    duration: 1,
                    repeat: isSearching ? Number.POSITIVE_INFINITY : 0,
                  }}
                />
                <motion.div
                  className='absolute -right-6 top-6 w-6 h-3 bg-slate-500 rounded-r-full'
                  animate={{
                    rotate: isSearching ? [0, 20, 0] : 0,
                  }}
                  transition={{
                    duration: 1,
                    repeat: isSearching ? Number.POSITIVE_INFINITY : 0,
                  }}
                />

                <div className='absolute -bottom-8 left-8 w-4 h-8 bg-slate-600 rounded-b-md' />
                <div className='absolute -bottom-8 right-8 w-4 h-8 bg-slate-600 rounded-b-md' />

                <div className='absolute -bottom-10 left-7 w-6 h-2 bg-slate-800 rounded-full' />
                <div className='absolute -bottom-10 right-7 w-6 h-2 bg-slate-800 rounded-full' />
              </div>
            </motion.div>

            {showMagnifier && (
              <motion.div
                className='absolute -right-16 top-0'
                initial={{ opacity: 0, rotate: -45, x: -20 }}
                animate={{ opacity: 1, rotate: 0, x: 0 }}
                exit={{ opacity: 0 }}>
                <div className='w-5 h-20 bg-slate-300 rotate-45 absolute right-0 top-8' />
                <div className='w-16 h-16 rounded-full border-4 border-slate-300 relative'>
                  <div className='absolute inset-1 rounded-full bg-blue-400/20' />
                  <motion.div
                    className='absolute inset-0 rounded-full border-4 border-transparent'
                    animate={{
                      borderColor: [
                        "rgba(96,165,250,0)",
                        "rgba(96,165,250,0.5)",
                        "rgba(96,165,250,0)",
                      ],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  />
                </div>
              </motion.div>
            )}
          </motion.div>

          <motion.div
            className='absolute top-10 w-32'
            initial={{ x: "-100%" }}
            animate={{
              x: ["100%", "-100%"],
              y: [0, 10, -10, 0],
            }}
            transition={{
              x: {
                duration: 15,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              },
              y: { duration: 3, repeat: Number.POSITIVE_INFINITY },
            }}>
            <motion.div
              className='w-32 h-10 bg-gradient-to-r from-slate-400 to-slate-300 rounded-full relative'
              animate={{
                boxShadow: [
                  "0 0 10px rgba(148,163,184,0.5)",
                  "0 0 20px rgba(148,163,184,0.7)",
                  "0 0 10px rgba(148,163,184,0.5)",
                ],
              }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}>
              <div className='absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-6 bg-slate-700 rounded-full' />
              <div className='absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-2 bg-slate-600 rounded-full' />
              <motion.div
                className='absolute -bottom-4 left-1/2 -translate-x-1/2 w-16 h-4 bg-blue-400/30 rounded-full blur-sm'
                animate={{
                  opacity: [0.3, 0.7, 0.3],
                  width: ["4rem", "4.5rem", "4rem"],
                }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
              />

              {[1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  className='absolute bottom-2 w-2 h-2 bg-yellow-300 rounded-full'
                  style={{ left: `${i * 6 + 4}px` }}
                  animate={{
                    opacity: [0.7, 1, 0.7],
                    boxShadow: [
                      "0 0 3px rgba(253,224,71,0.5)",
                      "0 0 6px rgba(253,224,71,0.8)",
                      "0 0 3px rgba(253,224,71,0.5)",
                    ],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        </div>

        <div className='space-y-2 text-white'>
          <motion.h2
            className='text-md font-bold'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}>
            Opps, we have a problem!
          </motion.h2>

          <motion.p
            className=' text-blue-200'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}>
            {`The page you're looking for has been lost in space.`}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className='pt-4'>
            <Button
              onClick={() => router.push("/")}
              size='lg'
              className='bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-none'>
              <motion.span
                animate={{
                  textShadow: [
                    "0 0 5px rgba(255,255,255,0.5)",
                    "0 0 10px rgba(255,255,255,0.8)",
                    "0 0 5px rgba(255,255,255,0.5)",
                  ],
                }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}>
                <Link to='/'>Go Back to Home</Link>
              </motion.span>
            </Button>
          </motion.div>
        </div>
      </div>

      {[1, 2, 3, 4, 5].map((asteroid) => (
        <motion.div
          key={`asteroid-${asteroid}`}
          className='absolute rounded-full bg-gray-700'
          style={{
            width: `${asteroid * 6 + 10}px`,
            height: `${asteroid * 6 + 10}px`,
            boxShadow:
              "inset 2px 2px 5px rgba(255,255,255,0.2), inset -2px -2px 5px rgba(0,0,0,0.8)",
          }}
          initial={{
            x: `${Math.random() * 100 - 50}vw`,
            y: `${Math.random() * 100 - 50}vh`,
            rotate: 0,
          }}
          animate={{
            x: `${Math.random() * 100 - 50}vw`,
            y: `${Math.random() * 100 - 50}vh`,
            rotate: 360,
          }}
          transition={{
            duration: 15 + asteroid * 5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
          }}>
          <div
            className='absolute w-2 h-1 bg-gray-600 rounded-full'
            style={{ top: "20%", left: "30%" }}
          />
          <div
            className='absolute w-3 h-1 bg-gray-600 rounded-full'
            style={{ top: "60%", left: "70%" }}
          />
        </motion.div>
      ))}
    </div>
  );
}
