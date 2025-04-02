import React, { useState } from "react";
import axios from "@/lib/axios-instance";
import PropTypes from "prop-types";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { useDispatch } from "react-redux";
import { getRoomPictures } from "@/contexts/reducer/room-picture-slice";
import { apiUrl } from "@/constants/api";
import { FormImagePreview, FormInput } from "@/components/app/form";
import FormImageOriginal from "@/components/app/form/form-image-ori";

const RoomPictureUpdate = ({ item }) => {
  const dispatch = useDispatch();
  const [imagePreview, setImagePreview] = useState(
    `${apiUrl}/uploads/room-picture/${item?.picture}`
  );
  const [formData] = useState(() => {
    const form = new FormData();
    form.append("room_id", item?.room_id);
    form.append("picture", item?.picture);
    form.append("picture_name", item?.picture_name);
    return form;
  });

  const handleFormData = (event) => {
    if (event instanceof FormData) {
      for (let [key, value] of event.entries()) {
        formData.set(key, value);
      }

      if (event.has("picture")) {
        const file = event.get("picture");
        const previewUrl = URL.createObjectURL(file);
        setImagePreview(previewUrl);
      }
    } else if (event?.target) {
      const { name, value } = event.target;
      formData.set(name, value);
    } else if (Number(event) > 0) {
      console.log(event);
      formData.set("room_id", parseInt(event, 10));
    } else {
      console.log("Unexpected event structure:", event);
    }

    return formData;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await axios
      .put(`/room-picture/${item?.room_picture_id}`, formData)
      .then((res) => {
        console.log(res);
        dispatch(getRoomPictures());
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <DialogContent>
      <form onSubmit={handleFormSubmit}>
        <DialogHeader className='mb-4'>
          <DialogTitle>Room Picture Information.</DialogTitle>
        </DialogHeader>
        <Separator />
        <div className='flex justify-between mb-3 mt-2'>
          <FormInput
            onCallbackInput={handleFormData}
            label='Room Name*'
            value={item?.room?.room_name}
            type='text'
            readonly={true}
            name='id'
          />
          <FormInput
            onCallbackInput={handleFormData}
            label='Picture Name*'
            name='picture_name'
            value={formData.get("picture_name")}
            type='text'
          />
        </div>
        <div className='flex justify-between mb-3'>
          <div className='flex flex-col gap-2'>
            <Label>Choose Image</Label>
            <FormImageOriginal onCallbackFormData={handleFormData} />
          </div>
          <FormImagePreview imgSrc={imagePreview} />
        </div>
        <DialogClose className='mt-2'>
          <Button type='submit'>Submit</Button>
        </DialogClose>
      </form>
    </DialogContent>
  );
};

RoomPictureUpdate.propTypes = {
  item: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default RoomPictureUpdate;
