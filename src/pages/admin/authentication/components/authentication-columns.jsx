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
import axiosInstance from "@/lib/axios-instance";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { getProducts } from "@/contexts/reducer/product-slice";
import React from "react";

export const AuthenticationActions = () => {
  const dispatch = useDispatch();

  const handleDelete = async (id) => {
    try {
      await axiosInstance
        .delete(`/products/${id}`)
        .then(() => {
          dispatch(getProducts());
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

export const AuthenticationColumns = [
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
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <div
          className={`capitalize ${
            status == "active"
              ? "text-green-600"
              : status == "dormant"
              ? "text-yellow-600"
              : "text-red-600"
          }`}
        >
          {row.getValue("status")}
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="font-bold"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div
        className={` font-semibold ${
          row.getValue("email") == "admin@nun.com" ? "text-red-500" : ""
        }`}
      >
        {row.getValue("email")}
      </div>
    ),
  },
  {
    accessorKey: "password",
    header: () => <div className="text-center">Password</div>,
    cell: ({ row }) => {
      return (
        <div className="text-start capitalize">{row.getValue("password")}</div>
      );
    },
  },
  {
    accessorKey: "role",
    header: () => <div className="text-center">Role</div>,
    cell: ({ row }) => {
      const role = row.original.role?.name || "N/A";

      return (
        <div
          className={`text-center font-semibold capitalize ${
            role == "admin"
              ? "text-red-600"
              : role == "management"
              ? "text-yellow-600"
              : role == "accountant"
              ? "text-blue-600"
              : role == "sale"
              ? "text-green-600"
              : " text-purple-600"
          }`}
        >
          {role}
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const item = row.original;
      const { handleDelete } = AuthenticationActions();

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <Dialog>
            {/* // */}
            {/* <ProductCategoryUpdate items={item} /> */}
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
                  onClick={() => navigator.clipboard.writeText(item.email)}
                >
                  <Copy className="me-1" />
                  Copy Email
                </DropdownMenuItem>

                <DropdownMenuSeparator />
                {item.auth_id == 1 ? (
                  ""
                ) : (
                  <DropdownMenuItem
                    onClick={() => console.log(item.category_name)}
                  >
                    <Fullscreen className="me-1" />
                    View Item
                  </DropdownMenuItem>
                )}
                <div className="flex flex-col">
                  {item.auth_id == 1 ? (
                    ""
                  ) : (
                    <DialogTrigger>
                      <DropdownMenuItem>
                        <FilePenLine className="me-1" /> Modify
                      </DropdownMenuItem>
                    </DialogTrigger>
                  )}
                  {item.auth_id == 1 ? (
                    ""
                  ) : (
                    <AlertDialogTrigger>
                      <DropdownMenuItem className="text-red-500">
                        <Trash2 className="me-1" /> Suspend
                      </DropdownMenuItem>
                    </AlertDialogTrigger>
                  )}
                </div>
              </DropdownMenuContent>
            </AlertDialog>
          </Dialog>
        </DropdownMenu>
      );
    },
  },
];
