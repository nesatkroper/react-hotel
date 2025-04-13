import React, { useState } from "react";
import TableLoading from "../utils/app-loading";
import PropTypes from "prop-types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { ChevronDown, Plus, RefreshCcw } from "lucide-react";
import { demo } from "./demo";
import { column } from "./column";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
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

const rowVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.2,
      ease: "easeOut",
    },
  }),
};

const headerVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.2, ease: "easeOut" } },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const rowNumberColumn = {
  id: "rowNumber",
  header: "#",
  cell: (info) => {
    const rowNum = info.row.index + 1;
    // + info.table.getState().pagination.pageIndex;
    // info.table.getState().pagination.pageSize;
    return rowNum.toString().padStart(2, "0");
  },
  enableSorting: false,
  enableHiding: false,
};

const AppDataTable = (props) => {
  const {
    data = demo,
    columns = column,
    main = "name",
    addElement = null,
    title = "Default Title",
    des = "Default Description",
    loading = false,
    refresh,
  } = props;

  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [t] = useTranslation("admin");

  const tableColumns = [rowNumberColumn, ...columns];
  const hasPicture = data.some(
    (d) => "picture" in d || "info.picture" in d || "pictures" in d
  );

  const table = useReactTable({
    data,
    columns: tableColumns,
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
        pageSize: hasPicture ? 6 : 10,
      },
    },
  });

  const handleRefresh = () => {
    refresh();
  };

  return (
    <motion.div variants={cardVariants} initial='hidden' animate='visible'>
      <Card>
        <Dialog>
          {addElement}
          <CardHeader className='p-4'>
            <div className='flex flex-row justify-between'>
              <div>
                <CardTitle>{`${title} Table`}</CardTitle>
                <CardDescription>{des || "Card Description"}</CardDescription>
              </div>
              <DialogTrigger asChild>
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.95 }}
                  className={` h-8 w-40 inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground  px-4 py-2`}>
                  <Plus className='mr-2' /> {title}
                </motion.button>
              </DialogTrigger>
            </div>
          </CardHeader>
        </Dialog>
        <CardContent className='p-4 pt-0'>
          <div className='w-full'>
            <div className='flex gap-4 items-center pb-4'>
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
                className=' w-64'
              />
              <Select
                onValueChange={(event) => table.setPageSize(Number(event))}>
                <SelectTrigger className='w-[100px]'>
                  <SelectValue placeholder={`6 ${t("table.row")}`} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={6}>6 {t("table.row")}</SelectItem>
                  <SelectItem value={10}>10 {t("table.row")}</SelectItem>
                  <SelectItem value={15}>15 {t("table.row")}</SelectItem>
                  <SelectItem value={25}>25 {t("table.row")}</SelectItem>
                  <SelectItem value={50}>50 {t("table.row")}</SelectItem>
                  <SelectItem value={100}>100 {t("table.row")}</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={handleRefresh} variant='outline' type='button'>
                <RefreshCcw className={loading ? "animate-spin" : ""} />
                {t("table.reload")}
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-40 ml-auto inline-flex items-center justify-center rounded-md text-sm font-medium border h-8 px-4 py-2`}>
                    {t("table.col")} <ChevronDown className='ml-2' />
                  </motion.button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                  {table
                    .getAllColumns()
                    .filter((column) => column.getCanHide())
                    ?.map((column) => (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className='capitalize'
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }>
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
            <div className='rounded-md border'>
              <Table>
                <motion.thead
                  variants={headerVariants}
                  initial='hidden'
                  animate='visible'>
                  {table.getHeaderGroups()?.map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers?.map((header) => (
                        <TableHead
                          key={header.id}
                          className={`font-bold px-1 ${
                            header.id === "rowNumber"
                              ? "w-12 text-center"
                              : header.id === "info.picture"
                              ? "w-32"
                              : header.id === "picture"
                              ? "w-32"
                              : header.id === "status"
                              ? "w-28"
                              : header.id === "select"
                              ? "w-8 text-center"
                              : header.id === "actions"
                              ? "w-10"
                              : ""
                          }`}>
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
                  <TableLoading />
                ) : (
                  <TableBody>
                    {table.getRowModel().rows?.length ? (
                      table.getRowModel().rows.map((row, index) => (
                        <motion.tr
                          key={row.id}
                          variants={rowVariants}
                          initial='hidden'
                          animate='visible'
                          custom={index}
                          className='border-b'
                          data-state={row.getIsSelected() && "selected"}>
                          {row.getVisibleCells()?.map((cell) => (
                            <TableCell
                              key={cell.id}
                              className={`px-1 ${
                                cell.column.id === "rowNumber"
                                  ? "text-center"
                                  : cell.column.id === "info.picture"
                                  ? "w-32"
                                  : cell.column.id === "picture"
                                  ? "w-32"
                                  : cell.column.id === "status"
                                  ? "w-28 text-center"
                                  : cell.column.id === "select"
                                  ? "w-8"
                                  : cell.column.id === "actions"
                                  ? "w-10"
                                  : ""
                              }`}>
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
                          className='h-24 text-center'>
                          {t("table.nores")}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                )}
              </Table>
            </div>
            <div className='flex items-center justify-end space-x-2 pt-4'>
              <div className='flex-1 text-sm text-muted-foreground'>
                {table.getFilteredSelectedRowModel().rows.length}
                {t("table.of")}
                {table.getFilteredRowModel().rows.length} {t("table.selected")}
              </div>
              <div className='space-x-2'>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className='inline-flex items-center justify-center rounded-md text-sm font-medium border h-8 px-4 py-2'
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}>
                  {t("table.prev")}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className='inline-flex items-center justify-center rounded-md text-sm font-medium border h-8 px-4 py-2'
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}>
                  {t("table.next")}
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
  addElement: PropTypes.oneOfType([PropTypes.node, PropTypes.element]),
  title: PropTypes.string,
  des: PropTypes.string,
  loading: PropTypes.bool,
  refresh: PropTypes.func,
};

export default AppDataTable;
