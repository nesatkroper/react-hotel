import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { getRoomTypes } from "@/app/reducer/room-type-slice";
import { useDispatch, useSelector } from "react-redux";
import { getRooms } from "@/app/reducer/room-slice";
import React, { useEffect, useState } from "react";
import FormInput from "@/components/app/form/form-input";
import FormRatio from "@/components/app/form/form-ratio";
import FormComboBox from "@/components/app/form/form-combobox";
import axiosAuth from "@/providers/axios-auth";

const RoomAdd = () => {
  const dispatch = useDispatch();
  const { typData } = useSelector((state) => state.roomtypes);
  const [formData, setFormData] = useState({
    room_name: 100,
    room_type_id: 1,
    is_ac: true,
    size: 25,
    capacity: 4,
    is_booked: false,
    discount_rate: 0,
  });

  useEffect(() => {
    dispatch(getRoomTypes());
  }, [dispatch]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDataChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await axiosAuth
      .post("/room", formData)
      .then(() => {
        dispatch(getRooms({ roomtype: true, pictures: true }));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <DialogContent>
        <form onSubmit={handleFormSubmit}>
          <DialogHeader className="mb-3">
            <DialogTitle>Reservation Details Information.</DialogTitle>
          </DialogHeader>
          <Separator />
          <div className="flex justify-between mb-2 mt-2">
            <FormInput
              onCallbackInput={handleChange}
              name="room_name"
              type="number"
              placeholder="Room-101"
              label="Room Number*"
            />
            <FormComboBox
              onCallbackSelect={(event) =>
                handleDataChange("room_type_id", event)
              }
              item={typData}
              optID="room_type_id"
              optLabel="type_name"
              label="Room Type"
              placeholder="Select Room Type"
            />
          </div>
          <div className="flex justify-between mb-2">
            <FormInput
              onCallbackInput={handleChange}
              name="price"
              type="number"
              placeholder="$39,99"
              label="Price*"
            />
            <FormInput
              onCallbackInput={handleChange}
              name="discount_rate"
              type="number"
              placeholder="5 %"
              label="Discount Rate*"
              step={1}
            />
          </div>
          <div className="flex justify-between mb-2">
            <FormInput
              onCallbackInput={handleChange}
              name="size"
              type="number"
              placeholder="25 m²"
              label="Room Size*"
              step={1}
            />
            <FormInput
              onCallbackInput={handleChange}
              name="capacity"
              type="number"
              placeholder="4 people"
              label="Room Capacity*"
              step={1}
            />
          </div>
          <div className="flex justify-between mb-2">
            <FormRatio onCallbackSelect={handleChange} />
          </div>
          <DialogClose className="mt-2">
            <Button type="submit">Submit</Button>
          </DialogClose>
        </form>
      </DialogContent>
    </>
  );
};

export default RoomAdd;
