import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { defimg, local } from "@/utils/resize-crop-image";
import { useEffect, useMemo, useState } from "react";
import { getCart } from "@/app/reducer/cart-slice";
import {
  afterPerDollar,
  cDollar,
  dollarToRiel,
  toUnit,
} from "@/utils/dec-format";
import Cookies from "js-cookie";
import axiosAuth from "@/providers/axios-auth";
import Invoice from "@/components/app/invoice/invoice";
import RequestKHQR from "@/components/app/khqr/request-khqr";
import FormSelect from "@/components/app/form/form-select";

const AuthID = Cookies.get("auth_id");
const Currency = [
  {
    value: "usd",
    data: "US Dollar",
  },
  {
    value: "khr",
    data: "Khmer Riel",
  },
];

const POSCart = () => {
  const dispatch = useDispatch();
  const { cartData } = useSelector((state) => state.cart);
  const [currency, setCurrency] = useState("khr");

  useEffect(() => {
    dispatch(getCart({ id: AuthID }));
  }, [dispatch]);

  // !
  const { total, discount, amount } = useMemo(() => {
    const total = cartData?.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

    const discount = cartData?.reduce(
      (sum, item) =>
        sum +
        (item.product.price * item.quantity * item.product.discount_rate) / 100,
      0
    );

    const amount = total - discount;

    return { total, discount, amount };
  }, [cartData]);

  const handleQuantityChange = async (cart_id, key) => {
    try {
      const url =
        key === "up" ? `/cart/inc/${cart_id}` : `/cart/dec/${cart_id}`;
      await axiosAuth.put(url);
      dispatch(getCart({ id: AuthID }));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="lg:col-span-1 col-span-2 mt-0">
      <Card>
        <CardContent className="p-3 pt-1">
          <div className="flex justify-between items-center">
            <p className="text-lg font-semibold">Cart Order</p>
            <FormSelect
              onCallbackSelect={(event) => setCurrency(event)}
              item={Currency}
              isLabel={false}
              size={130}
              label="Currency"
            />
          </div>
          <Separator className="my-2" />
          <div className="flex flex-col gap-2">
            {cartData?.map((item) => (
              <Card key={item.cart_id} className="shadow-none">
                <CardContent className="p-0 flex justify-between rounded-lg">
                  <div className="flex gap-3">
                    <img
                      src={`${local}/uploads/${item.product.picture}`}
                      onError={(e) => (e.target.src = defimg)}
                      alt={item?.item_name}
                      className="h-[50px] object-cover rounded-s-lg"
                    />
                    <div className="flex flex-col justify-between py-1">
                      <p className=" text-sm">{item.product.product_name}</p>
                      <p className="text-red-700 text-sm">
                        {afterPerDollar(
                          item.product.price * item.quantity,
                          item.product.discount_rate
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center pr-2 font-semibold">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => handleQuantityChange(item.cart_id, "down")}
                    >
                      <ChevronDown className="text-red-600" />
                    </Button>
                    <p className="text-sm mx-2">
                      {toUnit(item.quantity, 0, "Pcs")}
                    </p>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => handleQuantityChange(item.cart_id, "up")}
                    >
                      <ChevronUp className="text-green-600" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Separator className="my-2" />
          <div className="flex ">
            {currency === "usd" ? (
              <div className="w-full">
                <div className="flex justify-between w-full text-md font-semibold">
                  <p className="text-sm">Total :</p>
                  <p className="text-red-700">{cDollar(total)} </p>
                </div>
                <div className="flex justify-between w-full text-md font-semibold">
                  <p className="text-sm">Discount :</p>
                  <p className="text-red-700">{cDollar(discount)} </p>
                </div>
                <Separator className="my-1" />
                <div className="flex justify-between w-full text-lg font-semibold">
                  <p className="text-sm">Amount :</p>
                  <p className="text-red-700">{cDollar(amount)}</p>
                </div>
              </div>
            ) : (
              <div className="w-full">
                <div className="flex justify-between w-full text-md font-semibold">
                  <p className="text-sm">Total :</p>
                  <p className="">{dollarToRiel(total)} </p>
                </div>
                <div className="flex justify-between w-full text-md font-semibold">
                  <p className="text-sm">Discount :</p>
                  <p className="text-red-700">{dollarToRiel(discount)} </p>
                </div>
                <Separator className="my-1" />
                <div className="flex justify-between w-full text-lg font-semibold">
                  <p className="text-sm">Amount :</p>
                  <p className="text-red-700">{dollarToRiel(amount)}</p>
                </div>
              </div>
            )}
          </div>
          <AlertDialog>
            <AlertDialogTrigger className="w-full">
              <Button className="w-full mt-2">Check Out</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="text-center">
                  Invoice Check Out
                </AlertDialogTitle>
              </AlertDialogHeader>
              <Separator />
              {/* //! INVOICE GENERATOR*/}
              <Invoice />
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialog>
                  <AlertDialogTrigger>
                    <AlertDialogAction>Continue</AlertDialogAction>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="w-[350px] p-6">
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                    </AlertDialogHeader>
                    <RequestKHQR
                      amount={currency === "usd" ? amount : amount * 4000}
                      currency={currency}
                    />
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction>Success</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
    </div>
  );
};

export default POSCart;
