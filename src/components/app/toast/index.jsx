import React from "react";
import { toast } from "sonner";
import {
  CheckCircle,
  Clock,
  XCircle,
  AlertTriangle,
  InfoIcon,
  MessageCircle,
} from "lucide-react";

/**
 * Displays a toast notification with the given message and type.
 * @param {string} message - The message to display in the toast notification.
 * @param {string} [type='success'] - The type of the toast notification (e.g., success, error, warning).
 * @param {boolean} [loading=false] - Indicates if the toast is being displayed during a loading state.
 * @param {object} [options={}] - Additional options for the toast notification, such as action label and onClick function.
 * @returns None
 */

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
    msg: <MessageCircle className='w-5 h-5 text-sky-500' />,
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
      : type === "msg"
      ? toast.message
      : toast;

  const content = <div className='text-muted-foreground'>{message}</div>;

  const description = options?.description ? (
    <div className='max-w-sm w-full break-words overflow-hidden'>
      <p className='text-muted-foreground max-h-56 overflow-y-auto break-words text-sm whitespace-pre-wrap'>
        {options.description}
      </p>
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
  };

  if (loading) {
    return toast(content, config);
  }

  toastFunction(content, config);
};
