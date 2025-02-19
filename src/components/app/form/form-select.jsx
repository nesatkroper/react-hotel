import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import PropTypes from "prop-types";

const demo = [
  {
    value: "male",
    data: "Male",
  },
  {
    value: "female",
    data: "Female",
  },
  {
    value: "others",
    data: "Others",
  },
];

const FormSelect = (props) => {
  const {
    onCallbackSelect,
    mainClass,
    labelClass,
    size = 250,
    label = "Gender",
    item = demo,
    isLabel = true,
  } = props;

  const handleSelect = (event) => {
    onCallbackSelect(event);
  };
  return (
    <div className={`flex flex-col gap-2 ${mainClass}`}>
      {isLabel ? <Label className={labelClass}>{label}</Label> : ""}
      <Select onValueChange={handleSelect}>
        <SelectTrigger className={`w-[${size}px]`}>
          <SelectValue placeholder={`Set ${label}`} />
        </SelectTrigger>
        <SelectContent>
          {item?.map((d, i) => (
            <SelectItem key={i} value={d.value}>
              {d.data}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

FormSelect.propTypes = {
  onCallbackSelect: PropTypes.func,
  mainClass: PropTypes.string,
  labelClass: PropTypes.string,
  placeholder: PropTypes.string,
  size: PropTypes.number,
  label: PropTypes.string,
  isLabel: PropTypes.bool,
  item: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      data: PropTypes.string.isRequired,
    })
  ),
};

export default FormSelect;
