import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import {
  Copy,
  FilePenLine,
  Fullscreen,
  MoreHorizontal,
  Trash2,
} from "lucide-react";
import PropTypes from "prop-types";

const OptionDailog = (props) => {
  const { item, editElement, deleteItem = null } = props;

  const handleDelete = () => {
    deleteItem();
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <Dialog>
        {editElement}
        <AlertDialog>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you absolutely sure to Delete this?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                data and remove your data from our servers.
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
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(item.product_category_id)
              }
            >
              <Copy className="me-1" />
              Copy ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => console.log(item.employee_id)}>
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
};

OptionDailog.propTypes = {
  item: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  editElement: PropTypes.oneOfType([PropTypes.node, PropTypes.element]),
  deleteItem: PropTypes.func,
};

export default OptionDailog;
