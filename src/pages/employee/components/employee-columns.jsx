import { ArrowUpDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { defimg } from "@/utils/resize-crop-image";
import { useDispatch } from "react-redux";
import { getEmployees } from "@/app/reducer/employee-slice";
import { cDollar, dateFormat, formatPhoneNumber } from "@/utils/dec-format";
import { apiUrl } from "@/providers/api";
import axiosAuth from "@/providers/axios-auth";
import OptionDailog from "@/components/app/table/option-dailog";
import EmployeeEdit from "./employee-edit";

export const EmployeeActions = () => {
  const dispatch = useDispatch();

  const handleDelete = async (id) => {
    try {
      await axiosAuth.delete(`/employee/${id}`).then(() => {
        dispatch(getEmployees());
      });
    } catch (err) {
      console.log(err);
    }
  };

  return { handleDelete };
};

export const EmployeeColumns = [
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
        <p
          className={` capitalize font-semibold ${
            status == "active"
              ? "text-green-600"
              : status == "pending"
              ? "text-yellow-600"
              : "text-red-600"
          }`}
        >
          {status}
        </p>
      );
    },
  },
  {
    accessorKey: "picture",
    header: () => <div className="text-start">Picture</div>,
    cell: ({ row }) => {
      const picture = row.original.info?.picture;
      return (
        <img
          src={`${apiUrl}/uploads/employee/${picture}`}
          alt="profile"
          onError={(e) => (e.target.src = defimg)}
          className="h-[80px] rounded-lg"
        />
      );
    },
  },
  {
    accessorKey: "employee_name",
    header: () => <div className="text-center">Name</div>,
    cell: ({ row }) => {
      const name = `${row.original.first_name} ${row.original.last_name}`;
      return <div className="text-start capitalize">{name}</div>;
    },
  },
  {
    accessorKey: "employee_code",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="font-bold text-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Employee Code
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize text-start">
        {row.getValue("employee_code")}
      </div>
    ),
  },
  {
    accessorKey: "position_id",
    header: () => <div className="text-center">Position</div>,
    cell: ({ row }) => {
      const pos = row.original.position?.position_name;
      return <div className="text-start capitalize">{pos}</div>;
    },
  },
  {
    accessorKey: "gender",
    header: () => <div className="text-center">Gender</div>,
    cell: ({ row }) => {
      return (
        <div className="text-start capitalize">
          {row.getValue("gender") == "male" ? "Male" : "Female"}
        </div>
      );
    },
  },
  {
    accessorKey: "dob",
    header: () => <div className="text-center">DOB</div>,
    cell: ({ row }) => {
      return (
        <div className="text-start capitalize">
          {dateFormat(row.getValue("dob"))}
        </div>
      );
    },
  },
  {
    accessorKey: "phone",
    header: () => <div className="text-center">Phone</div>,
    cell: ({ row }) => {
      return (
        <div className="text-start capitalize">
          {formatPhoneNumber(row.getValue("phone"))}
        </div>
      );
    },
  },
  {
    accessorKey: "salary",
    header: () => <div className="text-center">Salary</div>,
    cell: ({ row }) => {
      return (
        <p className="text-start capitalize">{cDollar(row.original?.salary)}</p>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const item = row.original;
      const { handleDelete } = EmployeeActions();

      return (
        <OptionDailog
          item={item}
          deleteItem={() => handleDelete(item.employee_id)}
          EditElement={<EmployeeEdit />}
        />
      );
    },
  },
];
