import React, { useEffect } from "react";
import OpenShift from "../../shift/open";
import CloseShift from "../../shift/close";
import PropTypes from "prop-types";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useSelector, useDispatch } from "react-redux";
import { getCategorys } from "@/contexts/reducer/product-category-slice";
import { FormComboBox, FormInput } from "@/components/app/form";
import { useTranslation } from "react-i18next";

const POSSearch = ({ shift }) => {
  const dispatch = useDispatch();
  const [t] = useTranslation("admin");
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
          <AlertDialogTrigger disabled={shift ? true : false} asChild>
            <Button disabled={shift ? true : false} className='bg-green-500'>
              {t("po.shift.open")}
            </Button>
          </AlertDialogTrigger>
          <OpenShift />
        </AlertDialog>
        <AlertDialog>
          <AlertDialogTrigger disabled={shift ? false : true} asChild>
            <Button disabled={shift ? false : true} className='bg-red-500'>
              {t("po.shift.close")}
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
