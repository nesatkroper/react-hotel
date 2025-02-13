import Layout from "@/components/app/layout";
import POSSearch from "./components/pos-search";
import POSCart from "./components/pos-cart";
import Cookies from "js-cookie";
import AppLoading from "@/components/app/utils/app-loading";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "@/app/reducer/product-slice";
import { defimg, local } from "@/utils/resize-crop-image";
import axiosAuth from "@/providers/axios-auth";
import { getCart } from "@/app/reducer/cart-slice";

const AuthID = Cookies.get("auth_id") ?? null;

const POS = () => {
  const dispatch = useDispatch();
  const { proData, proLoading } = useSelector((state) => state?.products);
  const { cartData } = useSelector((state) => state.cart);
  const [isOpenShift, setOpenShift] = useState(true);

  useEffect(() => {
    dispatch(getProduct({ category: true }));
  }, [dispatch]);

  const handleOpenShift = () => {
    setOpenShift(!isOpenShift);
  };

  const handleAddToCart = async (item) => {
    const isAlreadyAdd = cartData?.some(
      (cartItem) => cartItem.product_id === item.product_id
    );
    console.log("Is already added:", isAlreadyAdd);

    try {
      if (!isAlreadyAdd) {
        const newItem = { auth_id: AuthID, product_id: item.product_id };
        const response = await axiosAuth.post("/cart", newItem);
        dispatch(getCart({ id: AuthID }));
        console.log("Cart submitted successfully:", response.data);
      } else {
        try {
          const cartItem = cartData.find(
            (cItem) => cItem.product_id === item.product_id
          );

          const cartID = cartItem ? cartItem.cart_id : null;
          const inc = await axiosAuth.put(`/cart/inc/${cartID}`);
          dispatch(getCart({ id: AuthID }));
          console.log("Item is already in the cart.", inc);
        } catch (err) {
          console.log(err);
        }
      }
    } catch (error) {
      console.log("Error submitting cart:", error);
    }
  };

  return (
    <>
      <Layout>
        <div className="p-2">
          <POSSearch shift={isOpenShift} setShift={() => handleOpenShift} />
          <Separator className="my-2" />
          {isOpenShift ? (
            <div className="grid lg:grid-cols-4 md:grid-cols-5 gap-3">
              {!proLoading ? (
                <ScrollArea className="w-full h-[80vh] col-span-3 rounded-2xl">
                  <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-3">
                    {proData?.map((item) => (
                      <Card
                        key={item.product_id}
                        onClick={() => handleAddToCart(item)}
                        className="relative cursor-pointer shadow-none"
                      >
                        <CardContent className="p-0">
                          <img
                            src={`${local}/uploads/${item?.picture}`}
                            onError={(e) => (e.target.src = defimg)}
                            alt={item?.product_name}
                            className="rounded-t-lg h-full w-full object-cover"
                          />
                          <div className="px-3 pt-1 flex justify-between">
                            <p className="font-semibold text-md">
                              {item?.product_name}
                            </p>
                            <p className="font-bold text-red-500">
                              ${item?.price}
                            </p>
                          </div>
                          <div className="px-3 pb-2 flex justify-between">
                            <p>
                              {item?.category?.category_name ?? "Uncategorized"}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              ) : (
                <div className="w-full h-[80vh] col-span-3 rounded-2xl flex  justify-center">
                  <AppLoading />
                </div>
              )}
              <POSCart />
            </div>
          ) : (
            <p className="text-lg text-center font-semibold">
              Open Shift to continue working...
            </p>
          )}
        </div>
      </Layout>
    </>
  );
};

export default POS;
