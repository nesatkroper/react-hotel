import React, { useEffect } from "react";
import FormInput from "@/components/app/form/form-input";
import FormRatio from "@/components/app/form/form-ratio";
import FormComboBox from "@/components/app/form/form-combobox";
import axiosAuth from "@/lib/axios-auth";
import { getRoomtypes } from "@/contexts/reducer/room-type-slice";
import { useFormHandler } from "@/hooks/use-form-handler";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { clearCache, getRooms } from "@/contexts/reducer/room-slice";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

const RoomAdd = () => {
  const dispatch = useDispatch();
  const { data: typData } = useSelector((state) => state.roomtypes);
  const { formData, resetForm, handleChange } = useFormHandler({
    room_name: 100,
    roomtype_id: 1,
    is_ac: true,
    size: 25,
    capacity: 4,
    is_booked: false,
    discount_rate: 0,
    status: "active",
  });

  useEffect(() => {
    dispatch(getRoomtypes());
  }, [dispatch]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosAuth.post("/room", formData);
      console.log(formData);

      dispatch(clearCache());
      getRooms({ status: "all", roomtype: true, pictures: true, order: "asc" });
      resetForm();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DialogContent className='max-w-[500px]'>
      <form onSubmit={handleFormSubmit}>
        <DialogHeader className='mb-3'>
          <DialogTitle>Reservation Details Information.</DialogTitle>
        </DialogHeader>
        <Separator />
        <div className='columns-2 mb-2 mt-2'>
          <FormInput
            onCallbackInput={handleChange}
            name='room_name'
            type='number'
            placeholder='Room-101'
            label='Room Number*'
          />
          <FormComboBox
            onCallbackSelect={(event) => handleChange("room_type_id", event)}
            item={typData}
            optID='roomtype_id'
            optLabel='type_name'
            label='Room Type'
          />
        </div>
        <div className='columns-2 mb-2'>
          <FormInput
            onCallbackInput={handleChange}
            name='price'
            type='number'
            placeholder='$39,99'
            label='Price*'
          />
          <FormInput
            onCallbackInput={handleChange}
            name='discount_rate'
            type='number'
            placeholder='5 %'
            label='Discount Rate*'
            step={1}
          />
        </div>
        <div className='columns-2 mb-2'>
          <FormInput
            onCallbackInput={handleChange}
            name='size'
            type='number'
            placeholder='25 m²'
            label='Room Size*'
            step={1}
          />
          <FormInput
            onCallbackInput={handleChange}
            name='capacity'
            type='number'
            placeholder='4 people'
            label='Room Capacity*'
            step={1}
          />
        </div>
        <div className='columns-2 mb-2'>
          <FormRatio onCallbackSelect={handleChange} />
        </div>
        <DialogClose className='mt-2'>
          <Button type='submit'>Submit</Button>
        </DialogClose>
      </form>
    </DialogContent>
  );
};

export default RoomAdd;
