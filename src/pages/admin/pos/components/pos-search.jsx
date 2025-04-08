import React, { useEffect } from "react";
import OpenShift from "../../shift/open";
import CloseShift from "../../shift/close";
import PropTypes from "prop-types";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useSelector, useDispatch } from "react-redux";
// import { getSearchCate } from "@/contexts/reducer/search-category-slice";
import { getCategorys } from "@/contexts/reducer/product-category-slice";
import { FormComboBox, FormInput } from "@/components/app/form";

const POSSearch = ({ shift }) => {
  const dispatch = useDispatch();
  const { data: pcaData } = useSelector((state) => state?.pcategories);
  // const [open, setOpen] = useState(false);
  // const [value, setValue] = useState("");
  // const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(getCategorys());
  }, [dispatch]);

  return (
    <div className='flex justify-between'>
      <div className='flex gap-6'>
        <div className='flex flex-col gap-2'>
          <FormComboBox
            item={pcaData}
            optID='categoryId'
            optLabel='categoryName'
            label='Product Category'
          />
        </div>
        <div className='flex flex-col gap-2'>
          <FormInput label='Search ...' />
        </div>
      </div>
      <div className='flex gap-2 items-end'>
        <AlertDialog>
          <AlertDialogTrigger disabled={shift ? true : false}>
            <Button disabled={shift ? true : false} className='bg-green-500'>
              Open Shift
            </Button>
          </AlertDialogTrigger>
          <OpenShift />
        </AlertDialog>
        <AlertDialog>
          <AlertDialogTrigger disabled={shift ? false : true}>
            <Button disabled={shift ? false : true} className='bg-red-500'>
              Close Shift
            </Button>
          </AlertDialogTrigger>
          <CloseShift />
        </AlertDialog>
      </div>
    </div>
  );
};

POSSearch.propTypes = {
  shift: PropTypes.bool,
};

export default POSSearch;
