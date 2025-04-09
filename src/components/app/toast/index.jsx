import React from "react";
import { toast } from "sonner";
import {
  CheckCircle,
  Clock,
  XCircle,
  AlertTriangle,
  InfoIcon,
} from "lucide-react";

export const showToast = (
  message,
  type = "success",
  loading = false,
  options = {}
) => {
  const date = new Date();
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }).format(date);

  const icons = {
    success: <CheckCircle className='w-5 h-5 text-emerald-500' />,
    error: <XCircle className='w-5 h-5 text-rose-500' />,
    warning: <AlertTriangle className='w-5 h-5 text-amber-500' />,
    info: <InfoIcon className='w-5 h-5 text-sky-500' />,
  };

  const toastFunction =
    type === "success"
      ? toast.success
      : type === "error"
      ? toast.error
      : type === "warning"
      ? toast.warning
      : type === "info"
      ? toast.info
      : toast;

  const content = <div className='text-muted-foreground'>{message}</div>;

  const description = options?.description ? (
    <div className='text-muted-foreground text-wrap h-56'>
      {options.description}
    </div>
  ) : (
    <div className='flex items-center text-muted-foreground text-sm'>
      <Clock className='mr-1 h-3 w-3' />
      <span>{formattedDate}</span>
    </div>
  );

  const config = {
    description,
    duration: loading ? Infinity : options?.duration || 5000,
    icon: loading ? (
      <div className='animate-spin h-5 w-5 border-4 border-dashed rounded-full border-sky-500' />
    ) : (
      icons[type]
    ),
    className: "group",
    action: options?.action && {
      label: options.action.label,
      onClick: options.action.onClick,
    },
    // style: {
    //   maxHeight: "30vh",
    // },
  };

  if (loading) {
    return toast(content, config);
  }

  toastFunction(content, config);
};
