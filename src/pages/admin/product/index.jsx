import React, { useEffect, useMemo } from "react";
import Layout from "@/layout/layout";
import ProductAdd from "./components/product-add.jsx";
import AppDataTable from "@/components/app/table/app-data-table.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "@/contexts/reducer/product-slice.jsx";
import { ProductColumns } from "./components/product-columns.jsx";
import { toNumber } from "@/utils/dec-format.js";

const Product = () => {
  const dispatch = useDispatch();
  const { proData, proLoading } = useSelector((state) => state?.products);

  useEffect(() => {
    dispatch(getProducts({ category: true }));
  }, [dispatch]);

  console.log(proData);

  const lastCode = useMemo(() => {
    if (!proData || proData.length === 0) return 0;
    const code = toNumber(proData[0]?.product_code, "-");
    return Number.isNaN(code) || code == null ? 0 : code;
  }, [proData]);

  return (
    <Layout>
      <AppDataTable
        data={proData}
        columns={ProductColumns}
        title="Product"
        main="product_name"
        loading={proLoading}
        add="Add Product"
        addElement={<ProductAdd key={lastCode} lastCode={lastCode} />}
      />
    </Layout>
  );
};

export default Product;
