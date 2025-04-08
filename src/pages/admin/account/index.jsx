import React, { useEffect } from "react";
import { FormImagePreview, FormPreview } from "@/components/app/form";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { image } from "@/components/app/sidebar/nav-user";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "@/contexts/reducer/user-slice";

const AccountInfo = () => {
  const dispatch = useDispatch();
  const { usrData, usrLoading, usrError } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  if (usrLoading) {
    return (
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Loading user data...</AlertDialogTitle>
        </AlertDialogHeader>
      </AlertDialogContent>
    );
  }

  if (usrError) {
    return (
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Error loading user data</AlertDialogTitle>
          <AlertDialogDescription>{usrError}</AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    );
  }

  if (!usrData) {
    return (
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>No user data available</AlertDialogTitle>
        </AlertDialogHeader>
      </AlertDialogContent>
    );
  }

  const displayableFields = [
    { label: "Email", value: usrData.email },
    { label: "Role", value: usrData.role?.name },
    { label: "Status", value: usrData.status },
    {
      label: "Created At",
      value: new Date(usrData.createdAt).toLocaleDateString(),
    },
  ];

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle className='text-md'>
          User Information
        </AlertDialogTitle>
      </AlertDialogHeader>
      <Separator />
      <div className='columns-2'>
        <FormImagePreview imgSrc={image} label='User Profile' />

        <div className='grid grid-cols-1 gap-2'>
          {displayableFields.map((field) => (
            <FormPreview
              key={field.label}
              label={field.label}
              value={field.value || "N/A"}
            />
          ))}
        </div>
      </div>
      <AlertDialogFooter>
        <AlertDialogCancel>Close</AlertDialogCancel>
        <AlertDialogAction>Save Changes</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

export default AccountInfo;
