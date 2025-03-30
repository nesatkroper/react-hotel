import React from "react";
import { PropTypes } from "prop-types";
import { Label } from "@/components/ui/label";
import { defimg } from "@/utils/resize-crop-image";

const FormImagePreview = ({
  imgSrc = null,
  labelClass = "",
  imgClass = "",
  size = 250,
  label = "Picture Preview",
}) => {
  return (
    <div className='flex flex-col gap-2'>
      <Label className={labelClass}>{label}</Label>
      <img
        src={imgSrc || defimg}
        alt='picture preview'
        className={`w-[${size}px] rounded-xl shadow ${imgClass}`}
      />
    </div>
  );
};

FormImagePreview.propTypes = {
  imgSrc: PropTypes.string,
  labelClass: PropTypes.string,
  imgClass: PropTypes.string,
  size: PropTypes.number,
  label: PropTypes.string,
};
export default FormImagePreview;
