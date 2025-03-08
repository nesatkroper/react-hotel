import React from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { CheckCircle, Undo2 } from "lucide-react";

const AppToast = () => {
  const showToast = () => {
    toast.success("Event Created Successfully", {
      description: "📅 Sunday, December 03, 2023 at 9:00 AM",
      duration: 5000,
      icon: <CheckCircle className="text-green-500 w-6 h-6" />,
      action: {
        label: (
          <span className="flex items-center gap-1">
            <Undo2 className="w-4 h-4" /> Undo
          </span>
        ),
        onClick: () => console.log("Undo clicked!"),
      },
    });
  };

  return (
    <Button variant="outline" onClick={showToast} className="px-4 py-2 text-sm">
      Show Toast
    </Button>
  );
};

export default AppToast;
