import React from "react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import PropTypes from "prop-types";
import axiosAuth from "@/lib/axios-auth";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FormInput, FormSelect, FormTextArea } from "@/components/app/form";
import { dateFormat } from "@/utils/dec-format";
import { useFormHandler } from "@/hooks/use-form-handler";

const ReservationDialog = ({
  start,
  end,
  room,
  currentDate,
  setIsDialogOpen,
}) => {
  const month = new Date(currentDate);
  const year = new Date(currentDate).getFullYear();
  const startDate = new Date(`${year}, ${month.getMonth() + 1}, ${start + 1}`);
  const endDate = new Date(`${year}, ${month.getMonth() + 1}, ${end + 1}`);

  console.log(room);

  const {
    formData: reserveData,
    resetForm: reserveReset,
    handleChange: reserveChange,
  } = useFormHandler({
    checkin_date: startDate,
    checkout_date: endDate,
    is_checkin: true,
    is_checkout: false,
    reservation_type: "reserve",
    adults: 1,
    children: 0,
    payment_method: "cash",
    payment_status: "paid",
    memo: "",
    status: "active",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const res = axiosAuth.post("/reservation", reserveData);
      console.table([res]);
      reserveReset();
      setIsDialogOpen(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <DialogContent>
      <form onSubmit={handleSubmit}>
        <DialogHeader>
          <DialogTitle className='text-md'>
            Reservation Details Information. ({room?.room_name})
          </DialogTitle>
        </DialogHeader>
        <Separator className='my-3' />
        <div className='flex justify-between mb-3'>
          <FormInput
            label='Check-In Date'
            value={dateFormat(`${year}, ${month.getMonth() + 1}, ${start + 1}`)}
            readonly={true}
          />
          <FormInput
            label='Check-Out Date'
            value={dateFormat(`${year}, ${month.getMonth() + 1}, ${end + 1}`)}
            readonly={true}
          />
        </div>
        <div className='flex justify-between mb-3'>
          <FormInput label='Room' value={room?.room_name} readonly={true} />
          <FormInput label='Customer Name' onCallbackInput={reserveChange} />
        </div>
        <div className='flex justify-between mb-3'>
          <FormInput
            label='Number of Adult'
            type='number'
            onCallbackInput={reserveChange}
          />
          <FormInput
            label='Number of Children'
            type='number'
            onCallbackInput={reserveChange}
          />
        </div>
        <div className='flex justify-between mb-3'>
          <FormSelect label='Payment Method' onCallbackSelect={reserveChange} />
          <FormSelect label='Payment Status' onCallbackSelect={reserveChange} />
        </div>
        <FormTextArea label='Note' onCallbackInput={reserveChange} />
        <Button>Check</Button>
      </form>
    </DialogContent>
  );
};

ReservationDialog.propTypes = {
  currentDate: PropTypes.instanceOf(Date),
  start: PropTypes.instanceOf(Date),
  end: PropTypes.instanceOf(Date),
  room: PropTypes.string,
  setIsDialogOpen: PropTypes.func.isRequired,
};

export default ReservationDialog;
