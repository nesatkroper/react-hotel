import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { ChevronDown, Plus } from "lucide-react";
import { demo } from "./demo";
import { column } from "./column";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import AppLoading from "../utils/app-loading";

const rowVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.4,
      ease: "easeOut",
    },
  }),
};

const headerVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const AppDataTable = (props) => {
  const {
    data = demo,
    columns = column,
    main = "name",
    btnSize = 200,
    addElement = null,
    title = "Default Title",
    des = "Default Description",
    loading = false,
  } = props;

  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  });

  return (
    <motion.div variants={cardVariants} initial="hidden" animate="visible">
      <Card>
        <Dialog>
          {addElement}
          <CardHeader className="p-4">
            <div className="flex flex-row justify-between">
              <div>
                <CardTitle>{`${title} Table`}</CardTitle>
                <CardDescription>{des || "Card Description"}</CardDescription>
              </div>
              <DialogTrigger>
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-[${btnSize}px] h-7 inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground  px-4 py-2`}
                >
                  <Plus className="mr-2" /> {title}
                </motion.button>
              </DialogTrigger>
            </div>
          </CardHeader>
        </Dialog>
        <CardContent className="p-4 pt-0">
          <div className="w-full">
            <div className="flex gap-4 items-center pb-4">
              <Input
                placeholder={`Filter ${main
                  .split("_")
                  ?.map(
                    (m) => m.charAt(0).toUpperCase() + m.slice(1).toLowerCase()
                  )
                  .join(" ")}s...`}
                value={table.getColumn(main)?.getFilterValue() ?? ""}
                onChange={(event) =>
                  table.getColumn(main)?.setFilterValue(event.target.value)
                }
                className="max-w-sm"
              />
              <Select
                onValueChange={(event) => table.setPageSize(Number(event))}
              >
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="5 Rows" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={5}>5 Rows</SelectItem>
                  <SelectItem value={10}>10 Rows</SelectItem>
                  <SelectItem value={15}>15 Rows</SelectItem>
                  <SelectItem value={25}>25 Rows</SelectItem>
                  <SelectItem value={50}>50 Rows</SelectItem>
                  <SelectItem value={100}>100 Rows</SelectItem>
                </SelectContent>
              </Select>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-[${btnSize}px] ml-auto inline-flex items-center justify-center rounded-md text-sm font-medium border h-7 px-4 py-2`}
                  >
                    Columns <ChevronDown className="ml-2" />
                  </motion.button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {table
                    .getAllColumns()
                    .filter((column) => column.getCanHide())
                    ?.map((column) => (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id
                          .split("_")
                          ?.map(
                            (m) =>
                              m.charAt(0).toUpperCase() +
                              m.slice(1).toLowerCase()
                          )
                          .join(" ")}
                      </DropdownMenuCheckboxItem>
                    ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="rounded-md border">
              <Table>
                <motion.thead
                  variants={headerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {table.getHeaderGroups()?.map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers?.map((header) => (
                        <TableHead key={header.id} className="font-bold">
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      ))}
                    </TableRow>
                  ))}
                </motion.thead>
                {loading ? (
                  <AppLoading />
                ) : (
                  <TableBody>
                    {table.getRowModel().rows?.length ? (
                      table.getRowModel().rows.map((row, index) => (
                        <motion.tr
                          key={row.id}
                          variants={rowVariants}
                          initial="hidden"
                          animate="visible"
                          custom={index} // Stagger based on row index
                          data-state={row.getIsSelected() && "selected"}
                        >
                          {row.getVisibleCells()?.map((cell) => (
                            <TableCell key={cell.id}>
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </TableCell>
                          ))}
                        </motion.tr>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={columns.length}
                          className="h-24 text-center"
                        >
                          No results.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                )}
              </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 pt-4">
              <div className="flex-1 text-sm text-muted-foreground">
                {table.getFilteredSelectedRowModel().rows.length} of{" "}
                {table.getFilteredRowModel().rows.length} row(s) selected.
              </div>
              <div className="space-x-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium border h-8 px-4 py-2"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  Previous
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium border h-8 px-4 py-2"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  Next
                </motion.button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

AppDataTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  columns: PropTypes.arrayOf(PropTypes.object),
  main: PropTypes.string,
  btnSize: PropTypes.number,
  addElement: PropTypes.oneOfType([PropTypes.node, PropTypes.element]),
  title: PropTypes.string,
  des: PropTypes.string,
  loading: PropTypes.bool,
};

export default AppDataTable;
