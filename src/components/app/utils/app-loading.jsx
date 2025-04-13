import React from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";

const TableLoading = ({ cols = 1 }) => {
  return (
    <TableBody>
      <TableRow>
        <TableCell colSpan={cols} className='w-full p-10'>
          <div className='flex flex-col items-center justify-center'>
            <div className='relative w-48 h-48'>
              {["D", "A", "T", "A"].map((char, index) => (
                <motion.div
                  key={index}
                  className='absolute text-3xl font-bold'
                  style={{
                    left: `${index * 25}%`,
                    top: "40%",
                    color: ["#FF6B6B", "#4ECDC4", "#FFD166", "#06D6A0"][
                      index % 4
                    ],
                  }}
                  animate={{
                    y: [0, -30, 0],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: index * 0.2,
                    ease: "easeInOut",
                  }}>
                  {char}
                </motion.div>
              ))}

              <motion.div
                className='absolute inset-0 border-4 border-dashed rounded-full'
                style={{ borderColor: "#FFD166" }}
                animate={{ rotate: 360 }}
                transition={{
                  duration: 8,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              />

              <motion.div
                className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-blue-100 rounded-full'
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 0.9, 0.7],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />

              {[...Array(5)].map((_, index) => (
                <motion.div
                  key={`dot-${index}`}
                  className='absolute w-3 h-3 rounded-full'
                  style={{
                    backgroundColor: [
                      "#FF6B6B",
                      "#4ECDC4",
                      "#FFD166",
                      "#06D6A0",
                      "#845EC2",
                    ][index % 5],
                    left: "calc(50% - 6px)",
                    top: "calc(50% - 6px)",
                  }}
                  animate={{
                    x: Math.cos((index * 2 * Math.PI) / 5) * 60,
                    y: Math.sin((index * 2 * Math.PI) / 5) * 60,
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: index * 0.2,
                    ease: "linear",
                  }}
                />
              ))}
            </div>
            <motion.p
              className='mt-4 text-lg font-medium text-gray-500'
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}>
              Loading your data...
            </motion.p>
          </div>
        </TableCell>
      </TableRow>
    </TableBody>
  );
};

TableLoading.propTypes = {
  cols: PropTypes.number,
};

export default TableLoading;
