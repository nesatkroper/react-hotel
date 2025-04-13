import React from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

const LazyLoading = ({
  className = "",
  text = "Loading",
  color = "primary",
  size = "medium",
}) => {
  const colors = {
    default: {
      primary: "#e2e8f0",
      secondary: "#94a3b8",
      accent: "#64748b",
    },
    primary: {
      primary: "#818cf8",
      secondary: "#4f46e5",
      accent: "#3730a3",
    },
    secondary: {
      primary: "#67e8f9",
      secondary: "#06b6d4",
      accent: "#0e7490",
    },
    dark: {
      primary: "#334155",
      secondary: "#1e293b",
      accent: "#0f172a",
    },
  };

  const sizes = {
    small: {
      container: "w-32 h-32",
      text: "text-xs",
      circle: 3,
      circleSize: 6,
    },
    medium: {
      container: "w-48 h-48",
      text: "text-sm",
      circle: 4,
      circleSize: 8,
    },
    large: {
      container: "w-64 h-64",
      text: "text-base",
      circle: 5,
      circleSize: 10,
    },
  };

  const selectedColor = colors[color];
  const selectedSize = sizes[size];

  const circles = Array.from({ length: selectedSize.circle });

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className={`relative ${selectedSize.container}`}>
        <motion.div
          className='absolute inset-0 rounded-full'
          style={{
            border: `2px dashed ${selectedColor.secondary}`,
            opacity: 0.5,
          }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />

        <motion.div
          className='absolute inset-4 rounded-full'
          style={{
            border: `2px dashed ${selectedColor.accent}`,
            opacity: 0.7,
          }}
          animate={{ rotate: -360 }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />

        <motion.div
          className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full'
          style={{ backgroundColor: selectedColor.primary }}
          initial={{ width: 20, height: 20, opacity: 0.5 }}
          animate={{
            width: [20, 40, 20],
            height: [20, 40, 20],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        {circles.map((_, index) => {
          const angle = (index * 2 * Math.PI) / circles.length;
          const delay = index * 0.2;
          const distance =
            selectedSize.container === "w-32 h-32"
              ? 40
              : selectedSize.container === "w-48 h-48"
              ? 60
              : 80;

          return (
            <motion.div
              key={index}
              className='absolute rounded-full'
              style={{
                width: selectedSize.circleSize,
                height: selectedSize.circleSize,
                backgroundColor: selectedColor.secondary,
                left: "50%",
                top: "50%",
                x: "-50%",
                y: "-50%",
              }}
              animate={{
                x: [
                  Math.cos(angle) * distance - selectedSize.circleSize / 2,
                  Math.cos(angle + Math.PI) * distance -
                    selectedSize.circleSize / 2,
                  Math.cos(angle + 2 * Math.PI) * distance -
                    selectedSize.circleSize / 2,
                ],
                y: [
                  Math.sin(angle) * distance - selectedSize.circleSize / 2,
                  Math.sin(angle + Math.PI) * distance -
                    selectedSize.circleSize / 2,
                  Math.sin(angle + 2 * Math.PI) * distance -
                    selectedSize.circleSize / 2,
                ],
                scale: [1, 1.5, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                delay,
                ease: "easeInOut",
              }}
            />
          );
        })}

        {[...Array(12)].map((_, index) => {
          const size = Math.random() * 4 + 2;
          const startX = (Math.random() - 0.5) * 100;
          const startY = (Math.random() - 0.5) * 100;
          const duration = Math.random() * 3 + 2;

          return (
            <motion.div
              key={`particle-${index}`}
              className='absolute rounded-full'
              style={{
                width: size,
                height: size,
                backgroundColor: selectedColor.primary,
                opacity: 0.6,
                left: "50%",
                top: "50%",
              }}
              initial={{ x: startX, y: startY, opacity: 0 }}
              animate={{
                x: startX + (Math.random() - 0.5) * 60,
                y: startY + (Math.random() - 0.5) * 60,
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 2,
                ease: "easeInOut",
              }}
            />
          );
        })}
      </div>

      <motion.div
        className={`mt-6 ${selectedSize.text} font-medium text-center`}
        style={{ color: selectedColor.secondary }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}>
        <motion.span
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}>
          {text}
        </motion.span>
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}>
          ...
        </motion.span>
      </motion.div>
    </div>
  );
};

LazyLoading.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
  text: PropTypes.string,
  className: PropTypes.string,
};

export default LazyLoading;
