import React, { useEffect } from "react";
import axios from "@/lib/axios-instance";
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
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { useDispatch, useSelector } from "react-redux";
import { getRooms } from "@/contexts/reducer/room-slice";
import { useFormHandler } from "@/hooks/use-form-handler";

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
    <DialogContent>
      <form onSubmit={handleSubmit}>
        <DialogHeader className='mb-4'>
          <DialogTitle>Room Picture Information.</DialogTitle>
        </DialogHeader>
        <Separator />
        <div className='flex justify-between mb-3 mt-2'>
          <FormComboBox
            onCallbackSelect={(event) => handleChange("room_id", event)}
            label='Room Name*'
            item={rooData}
            optID='room_id'
            optLabel='room_name'
          />
        </div>
        <div className='flex justify-between mb-3'>
          <div className='flex flex-col gap-2'>
            <Label>Chosing Image</Label>
            <FormImageResize onCallbackFormData={handleImageData} />
          </div>
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
