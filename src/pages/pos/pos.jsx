import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "@/app/reducer/product-slice";
import Layout from "@/components/app/layout";
import POSSearch from "./components/pos-search";
import POSCart from "./components/pos-cart";
import AppLoading from "@/components/app/utils/app-loading";
import POSList from "./components/pos-list";
import { useCode } from "@/providers/shift-provider";

const POS = () => {
  const dispatch = useDispatch();
  const { code } = useCode();
  const { proData, proLoading } = useSelector((state) => state?.products);
  const [shift, setShift] = useState(false);

  useEffect(() => {
    dispatch(getProduct({ category: true }));
  }, [dispatch]);

  useEffect(() => {
    setShift(!!code);
  }, [code]);

  return (
    <Layout>
      <div className="p-2">
        <POSSearch />
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
