import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getShifts } from "@/contexts/reducer/shift-slice";
import { getBanknotes } from "@/contexts/reducer/bank-note-slice";
import { getCode } from "@/contexts/reducer/code-slice";
import Cookie from "js-cookie";
import axiosAuth from "@/lib/axios-auth";

const CloseShift = () => {
  const dispatch = useDispatch();
  const userInfo = Cookie.get("user-info")
    ? JSON.parse(Cookie.get("user-info"))
    : {};
  const { codData } = useSelector((state) => state.code);
  const [data, setData] = useState({
    open_khmer_riel: 0,
    open_us_dollar: 0,
    employee_id: 1,
  });
  const [banknote, setBanknote] = useState({
    shift_id: parseInt(codData.shift_id, 10),
    khmer_200K: 0,
    khmer_100K: 0,
    khmer_50K: 0,
    khmer_30K: 0,
    khmer_20K: 0,
    khmer_15K: 0,
    khmer_10K: 0,
    khmer_5K: 0,
    khmer_2K: 0,
    khmer_1K: 0,
    khmer_500: 0,
    khmer_100: 0,
    us_100: 0,
    us_50: 0,
    us_20: 0,
    us_10: 0,
    us_5: 0,
    us_1: 0,
  });

  const khmerDenominations = {
    khmer_200K: 200000,
    khmer_100K: 100000,
    khmer_50K: 50000,
    khmer_30K: 30000,
    khmer_20K: 20000,
    khmer_15K: 15000,
    khmer_10K: 10000,
    khmer_5K: 5000,
    khmer_2K: 2000,
    khmer_1K: 1000,
    khmer_500: 500,
    khmer_100: 100,
  };

  const usDenominations = {
    us_100: 100,
    us_50: 50,
    us_20: 20,
    us_10: 10,
    us_5: 5,
    us_1: 1,
  };

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
        shift_id: parseInt(codData.shift_id, 10),
        [name]: updatedValue,
      };

      const totalKhmer = calculateTotal(updatedBanknote, khmerDenominations);
      const totalUS = calculateTotal(updatedBanknote, usDenominations);

      setData({
        employee_id: userInfo.employee_id,
        open_khmer_riel: totalKhmer,
        open_us_dollar: totalUS,
      });

      return updatedBanknote;
    });
  };

  const handleClearData = () => {
    setData({
      open_khmer_riel: 0,
      open_us_dollar: 0,
      employee_id: 0,
    });

    setBanknote({
      shift_id: 0,
      khmer_200K: 0,
      khmer_100K: 0,
      khmer_50K: 0,
      khmer_30K: 0,
      khmer_20K: 0,
      khmer_15K: 0,
      khmer_10K: 0,
      khmer_5K: 0,
      khmer_2K: 0,
      khmer_1K: 0,
      khmer_500: 0,
      khmer_100: 0,
      us_100: 0,
      us_50: 0,
      us_20: 0,
      us_10: 0,
      us_5: 0,
      us_1: 0,
    });

    console.log("Data cleared successfully!");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const shift = await axiosAuth.post("/shift", data);
      console.log(banknote);

      if (shift?.data) {
        console.log(shift);
        Cookie.set("shift-info", JSON.stringify(shift.data), { expires: 1 });

        const newShiftId = shift.data.shift_id;

        setBanknote((prev) => ({
          ...prev,
          shift_id: newShiftId,
        }));

        const note = await axiosAuth.post("/banknote", {
          ...banknote,
          shift_id: newShiftId,
        });
        console.log(note);
      }
    } catch (err) {
      console.log(err);
    } finally {
      handleClearData();
      dispatch(getCode());
    }
  };

  return (
    <AlertDialogContent className="w-[700]">
      <form onSubmit={handleSubmit}>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-base">
            Shift Opening Details
          </AlertDialogTitle>
          <Separator />
        </AlertDialogHeader>
        <div className="flex justify-between my-2 gap-3">
          <div className="flex flex-col gap-2">
            <Label className="font-normal text-xs">Open Money Khmer (៛)*</Label>
            <div className="flex gap-1">
              <Input value="៛" readOnly className="w-[25px] p-0 text-center" />
              <Input
                readOnly
                value={
                  `${new Intl.NumberFormat("en-US", {
                    style: "decimal",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(data?.open_khmer_riel)}` || "$ 0"
                }
                className="w-[150px]"
              />
            </div>
            <Label className="font-normal text-xs">Select Bank Note</Label>
            <div className="flex flex-col gap-1 rounded-lg">
              {Object.keys(khmerDenominations).map((key) => (
                <div
                  key={key}
                  className="flex justify-between w-[160px] items-center px-4"
                >
                  <Label className="font-normal text-xs">
                    x {khmerDenominations[key].toLocaleString()} ៛
                  </Label>
                  <Input
                    type="number"
                    name={key}
                    value={banknote[key] || 0}
                    onChange={handleBanknoteChange}
                    min={0}
                    className="w-[60px] h-[25px]"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label className="font-normal text-xs">
              Open Money Dollar ($)*
            </Label>
            <div className="flex gap-1">
              <Input value="$" readOnly className="w-[25px] p-0 text-center" />
              <Input
                readOnly
                value={
                  `${new Intl.NumberFormat("en-US", {
                    style: "decimal",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(data?.open_us_dollar)}` || ""
                }
                className="w-[180px]"
              />
            </div>
            <Label className="font-normal text-xs">Select Bank Note</Label>
            <div className="flex flex-col gap-1 rounded-lg">
              {Object.keys(usDenominations).map((key) => (
                <div
                  key={key}
                  className="flex justify-between w-[160px] items-center px-4"
                >
                  <Label className="font-normal text-xs">
                    x ${usDenominations[key]}
                  </Label>
                  <Input
                    type="number"
                    name={key}
                    value={banknote[key] || 0}
                    onChange={handleBanknoteChange}
                    className="w-[60px] h-[25px]"
                    min={0}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-between my-1">
          <div className="flex flex-col gap-2">
            <Label className="font-normal text-xs">Staff Name*</Label>
            <Input
              name="product_code"
              type="text"
              value={`${userInfo.employee?.first_name} ${userInfo.employee?.last_name}`}
              disabled
              className="w-[190px]"
            />
          </div>
        </div>
        <AlertDialogFooter className="mt-3">
          <AlertDialogCancel className="h-7">Cancel</AlertDialogCancel>
          <AlertDialogAction className="p-0 h-7">
            <Button type="submit" className="w-full h-7">
              Start Open
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </form>
    </AlertDialogContent>
  );
};

export default CloseShift;
