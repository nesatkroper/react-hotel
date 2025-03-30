import React from "react";
import { toast } from "sonner";
import {
  CheckCircle,
  Clock,
  XCircle,
  AlertTriangle,
  InfoIcon,
} from "lucide-react";

export const showToast = (message, type = "success", options) => {
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

  const toastFunction = toast[type];

  toastFunction(message, {
    description: options?.description || (
      <div className='flex items-center text-muted-foreground text-sm'>
        <Clock className='mr-1 h-3 w-3' />
        <span>{formattedDate}</span>
      </div>
    ),
    duration: options?.duration || 5000,
    icon: icons[type],
    className: "group",
    action: options?.action && {
      label: options.action.label,
      onClick: options.action.onClick,
    },
  });
};

// import React from "react";
// import { FileWarningIcon } from "lucide-react";
// import { toast } from "sonner";

// export const showToast = () => {
//   const date = new Date();

//   toast.success("Status Update Successfully", {
//     description: `📅 ${date}`,
//     duration: 5000,
//     icon: <FileWarningIcon className='text-yellow-500 w-6 h-6' />,
//   });
// };
