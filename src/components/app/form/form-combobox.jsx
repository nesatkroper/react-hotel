import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import PropTypes from "prop-types";

const FormComboBox = (props) => {
  const {
    onCallbackSelect,
    optID,
    optLabel,
    labelClass,
    size,
    label,
    item,
    defaultValue,
    error,
  } = props;

  const [open, setOpen] = useState(false);
  const [data, setData] = useState(defaultValue);

  const filter = (item || []).map((d) => ({
    value: d[optID],
    label: d[optLabel],
  }));

  return (
    <div className="flex flex-col gap-2">
      <Label className={labelClass}>{label}</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            style={{ width: `${size}px` }}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="justify-between"
          >
            {data
              ? filter?.find((d) => String(d.value) === data)?.label
              : `Select ${label}...`}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent style={{ width: `${size}px` }} className="p-0">
          <Command>
            <CommandInput
              placeholder={label}
              className="h-9"
              aria-label={`Search for ${label}`}
            />
            <CommandList>
              <CommandEmpty>No {label} found.</CommandEmpty>
              <CommandGroup>
                {filter?.map((d) => (
                  <CommandItem
                    key={d.value}
                    value={String(d.value)}
                    onSelect={(currentValue) => {
                      setData(currentValue);
                      setOpen(false);
                      onCallbackSelect?.(currentValue);
                    }}
                  >
                    {d.label}
                    <Check
                      className={cn(
                        "ml-auto",
                        data === d.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

FormComboBox.propTypes = {
  onCallbackSelect: PropTypes.func,
  optID: PropTypes.string,
  optLabel: PropTypes.string,
  labelClass: PropTypes.string,
  size: PropTypes.number,
  label: PropTypes.string,
  error: PropTypes.string,
  item: PropTypes.arrayOf(
    PropTypes.shape({
      [PropTypes.string]: PropTypes.any,
    })
  ),
  defaultValue: PropTypes.string,
};

FormComboBox.defaultProps = {
  onCallbackSelect: null,
  optID: "time",
  optLabel: "less",
  labelClass: "",
  size: 250,
  label: "Email*",
  item: [
    {
      time: "next.js",
      less: "Next.js",
    },
    {
      time: "sveltekit",
      less: "SvelteKit",
    },
  ],
  defaultValue: "",
};

export default FormComboBox;
