import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import { getPcategory } from "@/app/reducer/product-category-slice.jsx";
import Layout from "@/components/app/layout";
import ProductCategoryAdd from "./components/product-category-add.jsx";
import AppDataTable from "@/components/app/table/app-data-table.jsx";
import { ProductCategoryColumns } from "./components/product-category-columns.jsx";
import { toNumber } from "@/utils/dec-format.js";

const ProductCategory = () => {
  const dispatch = useDispatch();
  const { pcaData, pcaLoading } = useSelector((state) => state?.pcategories);

  useEffect(() => {
    dispatch(getPcategory());
  }, [dispatch]);

  const lastCode = useMemo(() => {
    const code = toNumber(pcaData[0]?.category_code, "-");
    return Number.isNaN(code) || code == null ? 0 : code;
  }, [pcaData]);

  return (
    <Layout>
      <AppDataTable
        data={pcaData}
        columns={ProductCategoryColumns}
        title="Product Category"
        main="category_name"
        loading={pcaLoading}
        add="Add Category"
        addElement={<ProductCategoryAdd key={lastCode} lastCode={lastCode} />}
      />
    </Layout>
  );
};

export default ProductCategory;
