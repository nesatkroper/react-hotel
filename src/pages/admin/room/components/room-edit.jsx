import React, { useEffect } from "react";
import axios from "@/lib/axios-instance";
import PropTypes from "prop-types";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { getRooms } from "@/contexts/reducer/room-slice";
import { useFormHandler } from "@/hooks/use-form-handler";
import { FormComboBox, FormInput, FormRatio } from "@/components/app/form";
import { getRoomtypes } from "@/contexts/reducer";

const RoomEdit = ({ items }) => {
  const dispatch = useDispatch();
  const { data: typData } = useSelector((state) => state.roomtypes);
  const { formData, handleChange, resetForm } = useFormHandler({
    room_name: items.room_name,
    roomtype_id: items.roomtype_id,
    price: items.price,
    discount_rate: items.discount_rate,
    size: items.size,
    capacity: items.capacity,
    is_ac: items.is_ac,
    status: items.status,
  });

  useEffect(() => {
    dispatch(getRoomtypes());
  }, [dispatch]);

  console.log(items);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      await axios.put(`/room/${items.room_id}`, formData);
      resetForm();
      getRooms({ status: "all", roomtype: true, pictures: true, order: "asc" });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DialogContent>
      <form onSubmit={handleFormSubmit}>
        <DialogHeader className='mb-3'>
          <DialogTitle className='text-md'>
            Update Reservation Details Information.
          </DialogTitle>
        </DialogHeader>
        <Separator />
        <div className='flex justify-between mb-2 mt-2'>
          <FormInput
            onChange={handleChange}
            name='room_name'
            value={items.room_name}
            label="Room's Name*"
            readonly={true}
          />
          <FormComboBox
            onCallbackSelect={(event) => handleChange("room_type_id", event)}
            item={typData}
            optID='roomtype_id'
            optLabel='type_name'
            label='Room Type'
            defaultValue={items.roomtype_id}
          />
        </div>
        <div className='flex justify-between mb-2'>
          <FormInput
            onChange={handleChange}
            name='price'
            type='number'
            value={items.price}
            label='Price ($)'
          />
          <FormInput
            onChange={handleChange}
            name='discount_rate'
            type='number'
            value={items.discount_rate}
            label='Discount Rate (%)'
          />
        </div>
        <div className='flex justify-between mb-2'>
          <FormInput
            onChange={handleChange}
            name='size'
            type='number'
            value={items.size}
          />
          <FormInput
            onChange={handleChange}
            name='capacity'
            type='number'
            value={items.capacity}
            label="Room's Capacity"
          />
        </div>
        <div className='flex justify-between mb-2'>
          <FormRatio onCallbackSelect={handleChange} />
        </div>
        <DialogClose className='mt-2'>
          <Button type='submit'>Submit</Button>
        </DialogClose>
      </form>
    </DialogContent>
  );
};

RoomEdit.propTypes = {
  items: PropTypes.object,
};

export default RoomEdit;
