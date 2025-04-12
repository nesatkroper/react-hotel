import React, { useEffect } from "react";
import Cookie from "js-cookie";
import axiosAuth from "@/lib/axios-auth";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useDispatch, useSelector } from "react-redux";
import { getShifts } from "@/contexts/reducer/shift-slice";
import { getBanknotes } from "@/contexts/reducer/bank-note-slice";
import { getCode } from "@/contexts/reducer/code-slice";
import { useTranslation } from "react-i18next";
import { khmerDenominations, usDenominations } from "@/constants/shift";
import { userInfo } from "@/constants/user-info";
import { useFormHandler } from "@/hooks/use-form-handler";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const CloseShift = () => {
  const dispatch = useDispatch();
  const [t] = useTranslation("admin");
  const { codData } = useSelector((state) => state.code);
  const {
    formData: data,
    setFormData: setData,
    resetForm: resetData,
  } = useFormHandler({
    openKhmerRiel: 0,
    openUsDollar: 0,
    authId: "31007b7e-93da-47fb-9e6e-c6c9bc0f317d",
  });
  const {
    formData: banknote,
    setFormData: setBanknote,
    resetForm: resetNote,
  } = useFormHandler({
    shiftId: codData.shiftId,
    khmer200K: 0,
    khmer100K: 0,
    khmer50K: 0,
    khmer30K: 0,
    khmer20K: 0,
    khmer15K: 0,
    khmer10K: 0,
    khmer5K: 0,
    khmer2K: 0,
    khmer1K: 0,
    khmer500: 0,
    khmer100: 0,
    us100: 0,
    us50: 0,
    us20: 0,
    us10: 0,
    us5: 0,
    us1: 0,
  });

  useEffect(() => {
    dispatch(getShifts());
    dispatch(getBanknotes());
    dispatch(getCode());
  }, [dispatch]);

  const calculateTotal = (notes, denominations) => {
    return Object.keys(denominations).reduce(
      (total, key) => total + (notes[key] || 0) * denominations[key],
      0
    );
  };

  const handleBanknoteChange = (e) => {
    const { name, value } = e.target;
    const updatedValue = parseInt(value) || 0;

    setBanknote((prev) => {
      const updatedBanknote = {
        ...prev,
        shiftId: parseInt(codData.shiftId, 10),
        [name]: updatedValue,
      };

      const totalKhmer = calculateTotal(updatedBanknote, khmerDenominations);
      const totalUS = calculateTotal(updatedBanknote, usDenominations);

      setData({
        employeeId: userInfo.employeeId,
        openKhmerRiel: totalKhmer,
        openUsDollar: totalUS,
      });

      return updatedBanknote;
    });
  };

  const handleClearData = () => {
    resetData();
    resetNote();
    console.log("Data cleared successfully!");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const shift = await axiosAuth.post("/shift", data);

      if (shift?.data) {
        Cookie.set("shift-info", JSON.stringify(shift.data), { expires: 1 });

        const newShiftId = shift.data.shiftId;

        if (shift.status === 201) {
          setBanknote((prev) => ({
            ...prev,
            shiftId: newShiftId,
          }));
          const note = await axiosAuth.post("/banknote", {
            ...banknote,
            shiftId: newShiftId,
          });
          console.log(note);
        }
      }
    } catch (err) {
      console.log(err);
    } finally {
      handleClearData();
      dispatch(getCode());
    }
  };

  return (
    <AlertDialogContent className='w-[700]'>
      <form onSubmit={handleSubmit}>
        <AlertDialogHeader>
          <AlertDialogTitle className='text-md'>
            {t("po.shift.dopen")}
          </AlertDialogTitle>
          <Separator />
        </AlertDialogHeader>
        <div className='flex justify-between my-2 gap-3'>
          <div className='flex flex-col gap-2'>
            <Label className='font-normal text-sm'>
              {t("po.shift.doriel")}
            </Label>
            <div className='flex gap-1'>
              <Input value='៛' readOnly className='w-[25px] p-0 text-center' />
              <Input
                readOnly
                value={
                  `${new Intl.NumberFormat("en-US", {
                    style: "decimal",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(data?.openKhmerRiel)}` || "$ 0"
                }
                className='w-[150px]'
              />
            </div>
            <Label className='font-normal text-sm'>
              {t("po.shift.select")}
            </Label>
            <div className='flex flex-col gap-1 rounded-lg'>
              {Object.keys(khmerDenominations).map((key) => (
                <div
                  key={key}
                  className='flex justify-between w-[160px] items-center px-4'>
                  <Label className='font-normal text-sm'>
                    x {khmerDenominations[key].toLocaleString()} ៛
                  </Label>
                  <Input
                    type='number'
                    name={key}
                    value={banknote[key] || 0}
                    onChange={handleBanknoteChange}
                    min={0}
                    className='w-[60px] h-[25px]'
                  />
                </div>
              ))}
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <Label className='font-normal text-sm'>{t("po.shift.dous")}</Label>
            <div className='flex gap-1'>
              <Input value='$' readOnly className='w-[25px] p-0 text-center' />
              <Input
                readOnly
                value={
                  `${new Intl.NumberFormat("en-US", {
                    style: "decimal",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(data?.openUsDollar)}` || ""
                }
                className='w-[180px]'
              />
            </div>
            <Label className='font-normal text-sm'>
              {t("po.shift.select")}
            </Label>
            <div className='flex flex-col gap-1 rounded-lg'>
              {Object.keys(usDenominations).map((key) => (
                <div
                  key={key}
                  className='flex justify-between w-[160px] items-center px-4'>
                  <Label className='font-normal text-sm'>
                    x ${usDenominations[key]}
                  </Label>
                  <Input
                    type='number'
                    name={key}
                    value={banknote[key] || 0}
                    onChange={handleBanknoteChange}
                    className='w-[60px] h-[25px]'
                    min={0}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <AlertDialogFooter className='mt-3'>
          <AlertDialogCancel className='h-7'>{t("cancel")}</AlertDialogCancel>
          <AlertDialogAction type='submit' className='h-7'>
            {t("po.shift.open")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </form>
    </AlertDialogContent>
  );
};

export default CloseShift;
