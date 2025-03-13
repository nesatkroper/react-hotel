import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  ArrowUpDown,
  FilePenLine,
  FileWarningIcon,
  Fullscreen,
  MoreHorizontal,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useDispatch } from "react-redux";
import { Check, X } from "lucide-react";
import { toast } from "sonner";
import { defimg } from "@/utils/resize-crop-image";
import { apiUrl } from "@/providers/api";
import { cDollar } from "@/utils/dec-format";
import axiosAuth from "@/providers/axios-auth";
import AppDetailViewer from "./app-detail-viewer";

export const generateColumns = (
  fields,
  editComponentCreator,
  model,
  clearCach,
  fetchFunc,
  params = {}
) => {
  const columns = fields.map((field) => ({
    accessorKey: field.key,
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="font-bold"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        {field.label} <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => {
      const value = row.original[field.key];
      if (field.key === "status") {
        return (
          <Checkbox checked={value === "active"} disabled={true}>
            {value === "active" ? <Check /> : <X />}{" "}
          </Checkbox>
        );
      }
      if (field.key === "full_name") {
        const firstName = row.original.first_name || "";
        const lastName = row.original.last_name || "";

        return (
          <div className="capitalize">
            {`${firstName} ${lastName}`.trim() || "N/A"}
          </div>
        );
      }
      if (field.key === "salary") {
        return <div>{cDollar(value)}</div>;
      }
      if (field.key === "dob" || field.key === "hired_date") {
        const dateValue = row.original[field.key];
        if (!dateValue) return <div>N/A</div>;
        const date = new Date(dateValue);

        return isNaN(date.getTime()) ? (
          <div>Invalid Date</div>
        ) : (
          <div>
            {date.toLocaleString("en-US", {
              year: "numeric",
              month: "short",
              day: "2-digit",
            })}
          </div>
        );
      }
      if (field.key === "picture" || field.key === "info.picture") {
        return (
          <img
            src={`${apiUrl}/uploads/${value}`}
            alt={value}
            onError={(e) => (e.target.src = defimg)}
            className="h-[80px] rounded-lg"
          />
        );
      }
      if (field.key.includes(".")) {
        const keys = field.key.split(".");
        let nestedValue = row.original;
        keys.forEach((key) => {
          nestedValue = nestedValue?.[key];
        });
        return <div className="capitalize">{nestedValue || "N/A"}</div>;
      }
      return <div className="capitalize">{value || "N/A"}</div>;
    },
  }));

  columns.unshift({
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  });

  columns.push({
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const dispatch = useDispatch();
      const item = row.original;
      const status = item.status === "active";
      const date = new Date();

      const editComponent =
        typeof editComponentCreator === "function"
          ? editComponentCreator(item)
          : null;

      const showToast = () => {
        toast.success("Status Update Successfully", {
          description: `📅 ${date}`,
          duration: 5000,
          icon: <FileWarningIcon className="text-yellow-500 w-6 h-6" />,
        });
      };

      const handleDelete = async () => {
        try {
          status
            ? await axiosAuth.patch(
                `/${model}/${item[`${model}_id`]}?type=remove`
              )
            : await axiosAuth.patch(
                `/${model}/${item[`${model}_id`]}?type=restore`
              );
          showToast();
          dispatch(clearCach());
          dispatch(fetchFunc(params));
        } catch (e) {
          console.log(e);
        }
      };

      const [isViewOpen, setIsViewOpen] = React.useState(false);
      const [isRemoveOpen, setIsRemoveOpen] = React.useState(false);

      return (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuLabel className="text-center">
                Actions
              </DropdownMenuLabel>

              {/* View dialog */}
              <AlertDialog open={isViewOpen} onOpenChange={setIsViewOpen}>
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem
                    onSelect={(e) => {
                      e.preventDefault();
                      setIsViewOpen(true);
                    }}
                  >
                    <Fullscreen className="me-1" />
                    View Item
                  </DropdownMenuItem>
                </AlertDialogTrigger>

                <AlertDialogContent className="w-[700px]">
                  <AlertDialogHeader>
                    <AlertDialogTitle className=" font-semibold">
                      Information Details
                    </AlertDialogTitle>

                    <AppDetailViewer item={item} />
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setIsViewOpen(false)}>
                      Close
                    </AlertDialogCancel>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              {editComponent && (
                <Dialog>
                  {editComponent}
                  <DialogTrigger asChild>
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                      <FilePenLine className="me-1" /> Edit Item
                    </DropdownMenuItem>
                  </DialogTrigger>
                </Dialog>
              )}

              <AlertDialog open={isRemoveOpen} onOpenChange={setIsRemoveOpen}>
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem
                    onSelect={(e) => {
                      e.preventDefault();
                      setIsRemoveOpen(true);
                    }}
                    className={status ? "text-red-500" : "text-yellow-500"}
                  >
                    <Trash2 className="me-1" />
                    {status ? "Remove" : "Restore"} Item
                  </DropdownMenuItem>
                </AlertDialogTrigger>
                <AlertDialogContent className="w-[400px]">
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you sure to {status ? "Remove" : "Restore"} this?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      {status
                        ? "This will permanently delete your data from our servers."
                        : "This will restore your data to active status."}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setIsRemoveOpen(false)}>
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => {
                        handleDelete();
                        setIsRemoveOpen(false);
                      }}
                      className={status ? "bg-red-500" : "bg-green-500"}
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  });

  return columns;
};
