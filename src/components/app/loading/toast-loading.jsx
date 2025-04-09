import React from "react";
import { toast } from "sonner";

export const showLoadingToast = ({
  title = "Loading",
  desc = "Please wait",
  actionLabel = "Cancel",
}) => {
  const toastId = toast(<div className='ml-4'>Waiting {title}</div>, {
    description: <div className='text-muted-foreground ml-4'>{desc}</div>,
    duration: Infinity,
    position: "top-right",
    icon: (
      <div className='animate-spin h-8 w-8 border-4 border-dashed rounded-full border-sky-500' />
    ),
    className: "group bg-gray-800 p-4",
    action: {
      label: <span>{actionLabel}</span>,
      onClick: () => {
        toast.dismiss(toastId);
      },
    },
    style: {
      width: "300px",
      maxWidth: "90vw",
      display: "flex",
    },
  });

  return toastId;
};
