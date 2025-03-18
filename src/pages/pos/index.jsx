import React, { useEffect, useState } from "react";
import Layout from "@/layout/layout";
import POSSearch from "./components/pos-search";
import POSCart from "./components/pos-cart";
import AppLoading from "@/components/app/utils/app-loading";
import POSList from "./components/pos-list";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "@/contexts/reducer/product-slice";
import { getCode } from "@/contexts/reducer/code-slice";

const POS = () => {
  const dispatch = useDispatch();
  const { proData, proLoading } = useSelector((state) => state.products);
  const { codData } = useSelector((state) => state.code);
  const [shift, setShift] = useState(false);

  useEffect(() => {
    if (!codData || typeof codData !== "object") {
      setShift(false);
    } else if (Object.keys(codData).length === 0) {
      setShift(false);
    } else if (codData?.shift_code) {
      setShift(true);
    } else {
      setShift(false);
    }
  }, [codData]);

  useEffect(() => {
    dispatch(getProducts({ category: true }));
    dispatch(getCode());
  }, [dispatch]);

  return (
    <Layout>
      <div className="p-2">
        <POSSearch shift={shift} />
        <Separator className="my-2" />
        {shift ? (
          <div className="grid 2xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-5 grid-cols-2 gap-3">
            {!proLoading ? (
              <ScrollArea className="w-full h-[80vh] 2xl:col-span-5 lg:col-span-3 md:col-span-3 col-span-1 rounded-2xl">
                <POSList data={proData} />
              </ScrollArea>
            ) : (
              <div className="w-full h-[80vh] 2xl:col-span-5 lg:col-span-3 md:col-span-3 col-span-1 rounded-2xl flex  justify-center">
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
  );
};

export default POS;
