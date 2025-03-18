import React, {useState, useEffect} from "react";
import {cn} from "@/lib/utils";
import PropTypes from "prop-types";

export default function LoadingSpinner({
  size = "md",
  variant = "circle",
  color,
  text,
  className,
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Size mappings
  const sizeMap = {
    sm: "h-6 w-6",
    md: "h-10 w-10",
    lg: "h-16 w-16",
    xl: "h-24 w-24",
  };

  // Text size mappings
  const textSizeMap = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
    xl: "text-lg",
  };

  // Default color handling
  const spinnerColor = color || "border-primary";
  const spinnerTrackColor = "border-muted";

  if (!mounted) return null;

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3",
        className
      )}
    >
      {variant === "circle" && (
        <div
          className={cn(
            "relative animate-spin rounded-full border-2 border-solid border-t-transparent",
            sizeMap[size],
            spinnerTrackColor,
            spinnerColor
          )}
          role="status"
          aria-label="Loading"
        >
          <span className="sr-only">Loading...</span>
        </div>
      )}

      {variant === "dots" && (
        <div className="flex space-x-2" role="status" aria-label="Loading">
          <div
            className={cn(
              "h-2 w-2 rounded-full animate-bounce",
              spinnerColor.replace("border-", "bg-"),
              {
                "h-1 w-1": size === "sm",
                "h-2 w-2": size === "md",
                "h-3 w-3": size === "lg",
                "h-4 w-4": size === "xl",
              }
            )}
            style={{animationDelay: "0ms"}}
          />
          <div
            className={cn(
              "h-2 w-2 rounded-full animate-bounce",
              spinnerColor.replace("border-", "bg-"),
              {
                "h-1 w-1": size === "sm",
                "h-2 w-2": size === "md",
                "h-3 w-3": size === "lg",
                "h-4 w-4": size === "xl",
              }
            )}
            style={{animationDelay: "150ms"}}
          />
          <div
            className={cn(
              "h-2 w-2 rounded-full animate-bounce",
              spinnerColor.replace("border-", "bg-"),
              {
                "h-1 w-1": size === "sm",
                "h-2 w-2": size === "md",
                "h-3 w-3": size === "lg",
                "h-4 w-4": size === "xl",
              }
            )}
            style={{animationDelay: "300ms"}}
          />
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
              "absolute animate-ping rounded-full opacity-75",
              spinnerColor.replace("border-", "bg-"),
              sizeMap[size]
            )}
          />
          <div
            className={cn(
              "rounded-full",
              spinnerColor.replace("border-", "bg-"),
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
          className={cn("text-muted-foreground font-medium", textSizeMap[size])}
        >
          {text}
        </p>
      )}
    </div>
  );
}

LoadingSpinner.propTypes = {
  size: PropTypes.number,
  variant: PropTypes.string,
  color: PropTypes.string,
  text: PropTypes.string,
  className: PropTypes.string,
};
