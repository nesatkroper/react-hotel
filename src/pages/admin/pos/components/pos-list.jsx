import Cookies from "js-cookie";
import PropTypes from "prop-types";
import axiosAuth from "@/lib/axios-auth";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { defimg } from "@/utils/resize-crop-image";
import { apiUrl } from "@/constants/api";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { getCarts } from "@/contexts/reducer/cart-slice";
import { Plus } from "lucide-react";
import { cDollar } from "@/utils/dec-format";

const userInfo = Cookies.get("user-info")
  ? JSON.parse(Cookies.get("user-info"))
  : {};
const AuthID = userInfo?.auth_id;

const POSList = ({ data }) => {
  console.log(data);

  const dispatch = useDispatch();
  const { cartData } = useSelector((state) => state.cart);

  const handleAddToCart = async (item) => {
    const isAlreadyAdd = cartData?.some(
      (cartItem) => cartItem.product_id === item.product_id
    );
    console.log("Is already added:", isAlreadyAdd);

    try {
      if (!isAlreadyAdd) {
        const newItem = { auth_id: AuthID, product_id: item.product_id };
        const response = await axiosAuth.post("/cart", newItem);
        dispatch(getCarts({ id: AuthID }));
        console.log("Cart submitted successfully:", response.data);
      } else {
        try {
          const cartItem = cartData.find(
            (cItem) => cItem.product_id === item.product_id
          );

          const cartID = cartItem ? cartItem.cart_id : null;
          const inc = await axiosAuth.put(`/cart/inc/${cartID}`);
          dispatch(getCarts({ id: AuthID }));
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
    <div className='grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3'>
      {data?.map((item) => (
        <Card
          key={item.productId}
          onClick={() => handleAddToCart(item)}
          className='relative cursor-pointer shadow-none'>
          <CardContent className='p-0 relative'>
            <Button className='absolute top-2 left-2 h-6 font-normal px-2'>
              <Plus /> Note
            </Button>
            <img
              src={`${apiUrl}/uploads/${item?.picture}`}
              crossOrigin='anonymous'
              onError={(e) => (e.target.src = defimg)}
              alt={item?.product_name}
              className='rounded-t-lg h-full w-full object-cover'
            />
            <div className='px-3 pt-1 flex justify-between'>
              <p className='font-semibold text-md'>{item?.product_name}</p>
              <p className='font-bold text-red-500'>{cDollar(item?.price)}</p>
            </div>
            <div className='px-3 pb-2 flex justify-between text-xs'>
              <p>{item?.category?.categoryName ?? "Uncategorized"}</p>
              <p className='font-bold text-red-500'>
                {item?.discount_rate <= 0
                  ? ""
                  : `- ${cDollar(item?.price, item?.discount_rate)}`}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

POSList.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default POSList;
