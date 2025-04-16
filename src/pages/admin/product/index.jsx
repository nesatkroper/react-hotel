import React, { useEffect } from "react";
import Layout from "@/layout/layout";
import ProductAdd from "./components/product-add.jsx";
import AppDataTable from "@/components/app/table/app-data-table.jsx";
import { useDispatch, useSelector } from "react-redux";
import { ProductColumns } from "./components/product-columns.jsx";
import {
  clearCacheAsync,
  getProducts,
} from "@/contexts/reducer/product-slice.jsx";

const Product = () => {
  const dispatch = useDispatch();
  const { data: proData, loading: proLoading } = useSelector(
    (state) => state?.products
  );

  useEffect(() => {
    dispatch(getProducts({ category: true }));
  }, [dispatch]);

  const refresh = () => {
    dispatch(clearCacheAsync());
    dispatch(getProducts());
  };

  console.log(proData);

  return (
    <Layout>
      <AppDataTable
        data={proData}
        columns={ProductColumns()}
        title='Product'
        main='productName'
        loading={proLoading}
        add='Add Product'
        refresh={refresh}
        addElement={<ProductAdd />}
      />
    </Layout>
  );
};

export default Product;
