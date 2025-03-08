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
import axiosAuth from "@/providers/axios-auth";
import { toast } from "sonner";
import { defimg } from "@/utils/resize-crop-image";
import { apiUrl } from "@/providers/api";
import { cDollar } from "@/utils/dec-format";

export const generateColumns = (
  fields,
  editComponentCreator,
  model,
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

      const editComponent = editComponentCreator
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
          dispatch(fetchFunc(params));
        } catch (e) {
          console.log(e);
        }
      };

      return (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <Dialog>
              {editComponent}
              <AlertDialog>
                <AlertDialogContent className="w-[400px]">
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you sure to Delete this?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your data and remove your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleDelete()}
                      className="bg-red-500"
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel className="text-center">
                    Actions
                  </DropdownMenuLabel>
                  <DropdownMenuItem onClick={() => console.log(item)}>
                    <Fullscreen className="me-1" />
                    View Item
                  </DropdownMenuItem>
                  <div className="flex flex-col">
                    <DialogTrigger>
                      <DropdownMenuItem>
                        <FilePenLine className="me-1" /> Edit Item
                      </DropdownMenuItem>
                    </DialogTrigger>
                    <AlertDialogTrigger>
                      <DropdownMenuItem
                        className={status ? "text-red-500" : "text-yellow-500"}
                      >
                        <Trash2 className="me-1" />
                        {status === "active" ? "Remove" : "Restore"} Item
                      </DropdownMenuItem>
                    </AlertDialogTrigger>
                  </div>
                </DropdownMenuContent>
              </AlertDialog>
            </Dialog>
          </DropdownMenu>
        </div>
      );
    },
  });

  return columns;
};
