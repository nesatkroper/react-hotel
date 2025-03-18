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
import { useDispatch } from "react-redux";
import { defimg } from "@/utils/resize-crop-image";
import { getRooms } from "@/contexts/reducer/room-slice";
import FormInput from "@/components/app/form/form-input";
import FormTextArea from "@/components/app/form/form-textarea";
import FormImagePreview from "@/components/app/form/form-image-preview";
import PropTypes from "prop-types";
import FormImageResize from "@/components/app/form/form-image-resize";
import axiosInstance from "@/lib/axios-instance";
import { getCategorys } from "@/contexts/reducer/product-category-slice";

const ProductCategoryAdd = ({ lastCode }) => {
  const dispatch = useDispatch();
  const [imagePreview, setImagePreview] = useState(defimg);

  const [formData] = useState(() => {
    const form = new FormData();
    form.append("picture", "");
    form.append("category_name", "");
    form.append("category_code", 0);
    form.append("memo", "");
    return form;
  });

  useEffect(() => {
    dispatch(getRooms());
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
      formData.set(
        "category_code",
        !isNaN(lastCode) ? Number(lastCode) + 1 : 1
      );
    } else {
      console.log("Unexpected event structure:", event);
    }
    return formData;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      await axiosInstance
        .post("/category", formData, {
          headers: {
            "Content-type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(res);
          dispatch(getCategorys());
        })
        .catch((error) => {
          console.log("Error submitting form:", error);
        });
      console.log(formData);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <DialogContent>
        <form onSubmit={handleFormSubmit}>
          <DialogHeader className="mb-3">
            <DialogTitle>Product Category Details Information.</DialogTitle>
          </DialogHeader>
          <Separator />
          <div className="flex justify-between mb-2 mt-2">
            <FormInput
              onCallbackInput={handleFormData}
              label="Product Category Name*"
              name="category_name"
              type="text"
            />
            <FormInput
              label="Product Category Code"
              readonly={true}
              value={
                !isNaN(lastCode)
                  ? `CATE-${(lastCode + 1).toString().padStart(3, "0")}`
                  : 1
              }
            />
          </div>
          <FormTextArea
            onCallbackInput={handleFormData}
            name="memo"
            label="Description"
          />
          <div className="flex justify-between my-3 ">
            <div className="flex flex-col gap-2">
              <Label>Choose Image*</Label>
              <FormImageResize
                onCallbackFormData={handleFormData}
                resolution={400}
              />
            </div>
            <FormImagePreview imgSrc={imagePreview} />
          </div>
          <DialogClose className="mt-2">
            <Button type="submit">Submit</Button>
          </DialogClose>
        </form>
      </DialogContent>
    </>
  );
};

ProductCategoryAdd.propTypes = {
  lastCode: PropTypes.number.isRequired,
};

ProductCategoryAdd.defualtProps = { lastCode: 0 };

export default ProductCategoryAdd;
