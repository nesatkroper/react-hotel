import React, { useEffect } from "react";
import Layout from "@/layout/layout";
import ProductCategoryAdd from "./components/category-add.jsx";
import AppDataTable from "@/components/app/table/app-data-table.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCacheAsync,
  getCategorys,
} from "@/contexts/reducer/product-category-slice.jsx";
import { CategoryColumns } from "./components/category-columns.jsx";

const ProductCategory = () => {
  const dispatch = useDispatch();
  const { data: pcaData, loading: pcaLoading } = useSelector(
    (state) => state?.pcategories
  );

  useEffect(() => {
    dispatch(getCategorys());
  }, [dispatch]);

  const refresh = () => {
    dispatch(clearCacheAsync());
    dispatch(getCategorys());
  };

  return (
    <Layout>
      <AppDataTable
        data={pcaData}
        columns={CategoryColumns()}
        title='Category'
        main='categoryName'
        loading={pcaLoading}
        refresh={refresh}
        add='Add Category'
        addElement={<ProductCategoryAdd />}
      />
    </Layout>
  );
};

export default ProductCategory;
