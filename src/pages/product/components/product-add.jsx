import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "@/contexts/reducer/product-slice";
import { defimg } from "@/utils/resize-crop-image";
import { getCategorys } from "@/contexts/reducer/product-category-slice";
import PropTypes from "prop-types";
import FormInput from "@/components/app/form/form-input";
import FormComboBox from "@/components/app/form/form-combobox";
import FormImagePreview from "@/components/app/form/form-image-preview";
import FormImageResize from "@/components/app/form/form-image-resize";
import axiosInstance from "@/lib/axios-instance";

const ProductAdd = ({ lastCode }) => {
  const dispatch = useDispatch();
  const [imagePreview, setImagePreview] = useState(defimg);
  const { pcaData } = useSelector((state) => state.pcategories);

  const [formData] = useState(() => {
    const form = new FormData();
    form.append("product_name", "");
    form.append("product_code", lastCode + 1);
    form.append("product_category_id", 1);
    form.append("price", 0);
    form.append("discount_rate", 0);
    form.append("state", true);
    form.append("picture", "");
    return form;
  });

  useEffect(() => {
    dispatch(getCategorys());
  }, [dispatch]);

  const handleFormData = (event) => {
    if (event instanceof FormData) {
      for (let [key, value] of event.entries()) {
        formData.set(key, value);
      }
      if (event.has("picture")) {
        const file = event.get("picture");
        const previewUrl = URL.createObjectURL(file);
        setImagePreview(previewUrl);
      }
    } else if (event?.target) {
      const { name, value } = event.target;
      formData.set(name, value);
    }
    return formData;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      await axiosInstance
        .post("/product", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(res);
          dispatch(getProducts());
        })
        .catch((error) => {
          console.log("Error submitting form:", error);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <DialogContent>
      <form onSubmit={handleFormSubmit}>
        <DialogHeader className="mb-3">
          <DialogTitle>Product Details Information</DialogTitle>
        </DialogHeader>
        <Separator />
        <div className="flex justify-between mb-2 mt-2">
          <FormInput
            onCallbackInput={handleFormData}
            label="Product Name*"
            name="product_name"
            type="text"
          />
          <FormInput
            label="Product Code"
            readonly={true}
            value={`PROD-${(lastCode + 1).toString().padStart(5, "0")}`}
          />
        </div>
        <div className="flex justify-between mb-2 mt-3">
          <FormComboBox
            onCallbackSelect={(event) =>
              handleFormData(new FormData().set("product_category_id", event))
            }
            label="Category*"
            item={pcaData}
            optID="product_category_id"
            optLabel="category_name"
          />
          <FormInput
            onCallbackInput={handleFormData}
            label="Price*"
            name="price"
            type="number"
            placeholder="$ 39.99"
          />
        </div>
        <div className="flex justify-between mb-2 mt-3">
          <FormInput
            onCallbackInput={handleFormData}
            label="Discount Rate*"
            name="discount_rate"
            type="number"
            placeholder="5 %"
            step={1}
          />
          <div className="flex flex-col gap-2">
            <Label>Choose Image*</Label>
            <FormImageResize
              onCallbackFormData={handleFormData}
              resolution={400}
            />
          </div>
        </div>
        <FormImagePreview imgSrc={imagePreview} />
        <DialogClose className="mt-2">
          <Button type="submit">Submit</Button>
        </DialogClose>
      </form>
    </DialogContent>
  );
};

ProductAdd.propTypes = {
  lastCode: PropTypes.number.isRequired,
};

ProductAdd.defaultProps = {
  lastCode: 0,
};

export default ProductAdd;
