import { ArrowUpDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import axiosInstance from "@/providers/axios-instance";
import { Button } from "@/components/ui/button";
import { defimg } from "@/utils/resize-crop-image";
import { useDispatch } from "react-redux";
import { getProduct } from "@/app/reducer/product-slice";
import { apiUrl } from "@/providers/api";
import OptionDailog from "@/components/app/table/option-dailog";
import React from "react";

export const RoomActions = () => {
  const dispatch = useDispatch();

  const handleDelete = async (id) => {
    try {
      await axiosInstance
        .delete(`/room/${id}`)
        .then(() => {
          dispatch(getProduct());
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

export const RoomColumns = [
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
              ? "text-green-600 font-semibold"
              : "text-red-600 font-semibold"
          }`}
        >
          {row.getValue("status")}
        </div>
      );
    },
  },
  {
    accessorKey: "picture",
    header: () => <div className="text-start">Picture</div>,
    cell: ({ row }) => {
      const img = row.original.pictures[0]?.picture;
      console.log(img);
      return (
        <img
          src={`${apiUrl}/uploads/${img}`}
          alt="product"
          onError={(e) => (e.target.src = defimg)}
          className="h-[80px] rounded-lg"
        />
      );
    },
  },
  {
    accessorKey: "room_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="font-bold"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Room Name
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("room_name")}</div>
    ),
  },
  {
    accessorKey: "room_type",
    header: () => <div className="text-center">Room Type</div>,
    cell: ({ row }) => {
      return (
        <div className="text-start capitalize">{row.getValue("room_type")}</div>
      );
    },
  },
  {
    accessorKey: "is_ac",
    header: () => <div className="text-center">AC</div>,
    cell: ({ row }) => {
      const check = row.original.is_ac || false;

      return (
        <div className="flex justify-center">
          <Checkbox checked={check} />
        </div>
      );
    },
  },
  {
    accessorKey: "is_booked",
    header: () => <div className="text-center">Book</div>,
    cell: ({ row }) => {
      const book = row.original.is_booked || false;

      return (
        <div className="flex justify-center">
          <Checkbox checked={book} />
        </div>
      );
    },
  },
  {
    accessorKey: "size",
    header: () => <div className="text-center">Size</div>,
    cell: ({ row }) => {
      return (
        <div className="text-center capitalize">{row.getValue("size")} m²</div>
      );
    },
  },
  {
    accessorKey: "capacity",
    header: () => <div className="text-center">Capacity</div>,
    cell: ({ row }) => {
      return (
        <div className="text-center capitalize">
          {row.getValue("capacity")} p
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: () => <div className="text-start">Price</div>,
    cell: ({ row }) => {
      return (
        <div className="text-start capitalize">
          $ {row.getValue("price") || "N/A"}
        </div>
      );
    },
  },
  {
    accessorKey: "discount_rate",
    header: () => <div className="text-center">Discount Rate</div>,
    cell: ({ row }) => {
      return (
        <div className="text-center capitalize">
          {row.getValue("discount_rate") || "0"} %
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const item = row.original;
      const { handleDelete } = RoomActions();

      return (
        <OptionDailog
          item={item}
          deleteItem={() => handleDelete(item.room_id)}
        />
      );
    },
  },
];
