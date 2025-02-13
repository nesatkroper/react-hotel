import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ArrowUpDown,
  Copy,
  FilePenLine,
  Fullscreen,
  MoreHorizontal,
  Trash2,
} from "lucide-react";
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
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import axiosInstance from "@/providers/axios-instance";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { getDepartments } from "@/app/reducer/department-slice";
import DepartmentUpdate from "./department-update";

export const DepartmentActions = () => {
  const dispatch = useDispatch();

  const handleDelete = async (id) => {
    try {
      await axiosInstance
        .delete(`/deparment/${id}`)
        .then(() => {
          dispatch(getDepartments());
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return { handleDelete };
};

export const DepartmentColumns = [
  {
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
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "department_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="font-bold"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Department Name
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize font-semibold">
        {row.getValue("department_name")}
      </div>
    ),
  },
  {
    accessorKey: "department_code",
    header: () => <div className="text-center">Department Code</div>,
    cell: ({ row }) => {
      return (
        <div className="text-start capitalize">
          {row.getValue("department_code")}
        </div>
      );
    },
  },
  {
    accessorKey: "memo",
    header: () => <div className="text-center">Description</div>,
    cell: ({ row }) => {
      return (
        <div className="text-start capitalize">
          {row.getValue("memo") || "N/A"}
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const item = row.original;
      const { handleDelete } = DepartmentActions();

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <Dialog>
            <DepartmentUpdate items={item} />
            <AlertDialog>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Are you absolutely sure to Delete this?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your data and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handleDelete(item.product_id)}
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
                <DropdownMenuItem
                  onClick={() =>
                    navigator.clipboard.writeText(item.department_id)
                  }
                >
                  <Copy className="me-1" />
                  Copy ID
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => console.log(item.deparment_code)}
                >
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
                    <DropdownMenuItem className="text-red-500">
                      <Trash2 className="me-1" /> Delete Item
                    </DropdownMenuItem>
                  </AlertDialogTrigger>
                </div>
              </DropdownMenuContent>
            </AlertDialog>
          </Dialog>
        </DropdownMenu>
      );
    },
  },
];
