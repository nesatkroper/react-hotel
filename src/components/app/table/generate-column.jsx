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
  Fullscreen,
  MoreHorizontal,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useDispatch } from "react-redux";

import { defimg } from "@/utils/resize-crop-image";
import { apiUrl } from "@/constants/api";
import { cDollar, toUnit } from "@/utils/dec-format";
import { useTranslation } from "react-i18next";
import axiosAuth from "@/lib/axios-auth";
import AppDetailViewer from "./app-detail-viewer";
import { showToast } from "../toast";

export const generateColumns = (
  fields,
  editComponentCreator,
  model,
  clearCach,
  fetchFunc,
  params = {}
) => {
  const [t] = useTranslation("admin");

  const columns = fields.map((field) => ({
    accessorKey: field.key,
    header: ({ column }) => (
      <Button
        variant='icon'
        className='font-bold'
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        {field.label} <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => {
      const value = row.original[field.key];

      if (field.key === "status" || field.key === "isAc")
        return <Checkbox checked={value === "active"} disabled={true} />;

      if (field.key === "salary" || field.key === "price")
        return <div>{cDollar(value)}</div>;

      if (field.key === "discountRate")
        return <div>{toUnit(value, 0, "%")}</div>;

      if (field.key === "size")
        return <div>{toUnit(value, 2, t("table.room.m"))}</div>;

      if (field.key === "capacity")
        return <div>{toUnit(value, 0, t("table.room.peo"))}</div>;

      if (field.key.includes("Code"))
        return (
          <div className='uppercase font-jet font-light'>{value || "N/A"}</div>
        );

      if (field.key === "fullName" || field.key === "fullname") {
        const firstName = row.original.firstName || "";
        const lastName = row.original.lastName || "";

        return (
          <div className='capitalize'>
            {`${firstName} ${lastName}`.trim() || "N/A"}
          </div>
        );
      }

      if (
        field.key === "employee.fullName" ||
        field.key === "employee.fullame"
      ) {
        const firstName = row.original.employee.firstName || "";
        const lastName = row.original.employee.lastName || "";
        console.log(firstName);

        return (
          <div className='capitalize'>
            {`${firstName} ${lastName}`.trim() || "N/A"}
          </div>
        );
      }

      if (field.key === "dob" || field.key === "hiredDate") {
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

      if (field.key === "picture" || field.key === "info.picture")
        return (
          <img
            src={`${apiUrl}/uploads/${value}`}
            crossOrigin='anonymous'
            alt={value}
            onError={(e) => (e.target.src = defimg)}
            className='h-[80px] rounded-lg'
          />
        );

      if (field.key.includes(".")) {
        const keys = field.key.split(".");
        let nestedValue = row.original;
        keys.forEach((key) => {
          nestedValue = nestedValue?.[key];
        });
        return <div className='capitalize'>{nestedValue || "N/A"}</div>;
      }
      return <div className='capitalize'>{value || "N/A"}</div>;
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
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <div className='flex items-center justify-center'>
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label='Select row'
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

      const editComponent =
        typeof editComponentCreator === "function"
          ? editComponentCreator(item)
          : null;

      const handleDelete = async () => {
        try {
          status
            ? await axiosAuth.patch(
                `/${model}/${item[`${model}Id`]}?type=remove`
              )
            : await axiosAuth.patch(
                `/${model}/${item[`${model}Id`]}?type=restore`
              );
          showToast(
            status ? t("toast.remove") : t("toast.restore"),
            status ? "error" : "success"
          );
          dispatch(clearCach());
          dispatch(fetchFunc(params));
        } catch (e) {
          console.log(e);
        }
      };

      const [isViewOpen, setIsViewOpen] = React.useState(false);
      const [isRemoveOpen, setIsRemoveOpen] = React.useState(false);

      return (
        <div className='flex justify-end'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='icon' className='h-8 w-8 p-0'>
                <span className='sr-only'>{t("table.opt.ope")}</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align='end'>
              <DropdownMenuLabel className='text-center'>
                {t("table.opt.act")}
              </DropdownMenuLabel>

              <AlertDialog open={isViewOpen} onOpenChange={setIsViewOpen}>
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem
                    onSelect={(e) => {
                      e.preventDefault();
                      setIsViewOpen(true);
                    }}>
                    <Fullscreen className='me-1' />
                    {t("table.opt.view")}
                  </DropdownMenuItem>
                </AlertDialogTrigger>

                <AlertDialogContent className='w-[700px]'>
                  <AlertDialogHeader>
                    <AlertDialogTitle className=' font-semibold'>
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
                      <FilePenLine className='me-1' />
                      {t("table.opt.edit")}
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
                    className={status ? "text-red-500" : "text-yellow-500"}>
                    <Trash2 className='me-1' />
                    {status ? t("table.opt.remove") : t("table.opt.restore")}
                  </DropdownMenuItem>
                </AlertDialogTrigger>
                <AlertDialogContent className='w-[400px]'>
                  <AlertDialogHeader>
                    <AlertDialogTitle className='text-md'>
                      {status ? t("toast.remove") : t("toast.restore")}
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
                      className={status ? "bg-red-500" : "bg-green-500"}>
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
