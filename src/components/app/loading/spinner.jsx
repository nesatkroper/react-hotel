import React, {useState, useEffect} from "react";
import {cn} from "@/lib/utils";
import PropTypes from "prop-types";

export default function LoadingSpinner({
  size = "md",
  variant = "circle",
  color = "gray",
  text,
  className,
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const sizeMap = {
    sm: "h-6 w-6",
    md: "h-10 w-10",
    lg: "h-16 w-16",
    xl: "h-24 w-24",
  };

  const textSizeMap = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-xl",
  };

  const colorMap = {
    gray: "border-gray-300 border-t-gray-600",
    blue: "border-blue-200 border-t-blue-500",
    purple: "border-purple-200 border-t-purple-500",
    green: "border-green-200 border-t-green-500",
  };

  const bgColorMap = {
    gray: "bg-gray-600",
    blue: "bg-blue-500",
    purple: "bg-purple-500",
    green: "bg-green-500",
  };

  const spinnerColor = colorMap[color] || colorMap.gray;
  const spinnerBgColor = bgColorMap[color] || bgColorMap.gray;

  if (!mounted) return null;

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4",
        className
      )}
    >
      {variant === "circle" && (
        <div
          className={cn(
            "relative animate-spin rounded-full border-4 border-solid border-t-transparent",
            sizeMap[size],
            spinnerColor,
            "shadow-lg shadow-[inset_0_0_10px_rgba(0,0,0,0.1)]"
          )}
          role="status"
          aria-label="Loading"
        >
          <div
            className={cn(
              "absolute inset-0 rounded-full animate-pulse opacity-20",
              spinnerBgColor
            )}
          />
          <span className="sr-only">Loading...</span>
        </div>
      )}

      {variant === "dots" && (
        <div
          className="flex space-x-3 items-end"
          role="status"
          aria-label="Loading"
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={cn(
                "rounded-full animate-[bounce_0.8s_ease-in-out_infinite]",
                spinnerBgColor,
                "shadow-md shadow-[0_2px_4px_rgba(0,0,0,0.2)]",
                {
                  "h-2 w-2": size === "sm",
                  "h-3 w-3": size === "md",
                  "h-4 w-4": size === "lg",
                  "h-6 w-6": size === "xl",
                }
              )}
              style={{animationDelay: `${i * 150}ms`}}
            />
          ))}
          <span className="sr-only">Loading...</span>
        </div>
      )}

      {variant === "pulse" && (
        <div
          className={cn(
            "relative flex items-center justify-center",
            sizeMap[size]
          )}
          role="status"
          aria-label="Loading"
        >
          <div
            className={cn(
              "absolute animate-[ping_1.5s_cubic-bezier(0,0,0.2,1)_infinite] rounded-full opacity-50",
              spinnerBgColor,
              sizeMap[size]
            )}
          />
          <div
            className={cn(
              "rounded-full animate-pulse",
              spinnerBgColor,
              "shadow-lg shadow-[0_0_15px_rgba(0,0,0,0.2)]",
              {
                "h-3 w-3": size === "sm",
                "h-5 w-5": size === "md",
                "h-8 w-8": size === "lg",
                "h-12 w-12": size === "xl",
              }
            )}
          />
          <span className="sr-only">Loading...</span>
        </div>
      )}

      {text && (
        <p
          className={cn(
            "text-gray-600 font-semibold tracking-wide animate-[fadeIn_0.5s_ease-in]",
            textSizeMap[size]
          )}
        >
          {text}
        </p>
      )}
    </div>
  );
}

LoadingSpinner.propTypes = {
  size: PropTypes.oneOf(["sm", "md", "lg", "xl"]),
  variant: PropTypes.oneOf(["circle", "dots", "pulse"]),
  color: PropTypes.oneOf(["gray", "blue", "purple", "green"]),
  text: PropTypes.string,
  className: PropTypes.string,
};
