import React, { useEffect } from "react";
import axios from "@/lib/axios-instance";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useDispatch, useSelector } from "react-redux";
import { getRooms } from "@/contexts/reducer/room-slice";
import { useFormHandler } from "@/hooks/use-form-handler";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import {
  clearCache,
  getRoomPictures,
} from "@/contexts/reducer/room-picture-slice";
import {
  FormComboBox,
  FormImagePreview,
  FormImageResize,
} from "@/components/app/form";

const RoomPictureAdd = () => {
  const dispatch = useDispatch();
  const { data: rooData } = useSelector((state) => state?.rooms);
  const {
    formData,
    resetForm,
    handleChange,
    handleImageData,
    getFormDataForSubmission,
  } = useFormHandler({
    status: "active",
    room_id: 0,
    picture: "",
  });

  useEffect(() => {
    dispatch(getRooms());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const submissionData = getFormDataForSubmission();
      await axios.post("/roompicture", submissionData);

      resetForm();
      dispatch(clearCache());
      dispatch(getRoomPictures());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DialogContent className='max-w-[500px]'>
      <form onSubmit={handleSubmit}>
        <DialogHeader className='mb-4'>
          <DialogTitle>Room Picture Information.</DialogTitle>
        </DialogHeader>
        <Separator />
        <div className='columns-2 mb-3 mt-2'>
          <FormComboBox
            onCallbackSelect={(event) => handleChange("room_id", event)}
            label='Room Name*'
            item={rooData}
            optID='room_id'
            optLabel='room_name'
          />
        </div>
        <div className='columns-2 mb-3'>
          <FormImageResize onCallbackFormData={handleImageData} />
          <FormImagePreview
            imgSrc={
              formData.picture ? URL.createObjectURL(formData.picture) : null
            }
          />
        </div>

        <DialogClose asChild className='mt-2'>
          <Button type='submit'>Submit</Button>
        </DialogClose>
      </form>
    </DialogContent>
  );
};

export default RoomPictureAdd;
