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

  const filter = (item || []).map((d) => ({
    value: String(d[optID]),
    label: d[optLabel],
  }));

  const [open, setOpen] = useState(false);
  const [data, setData] = useState(
    defaultValue || (filter.length > 0 ? filter[0].value : "")
  );

  return (
    <div className='flex flex-col gap-2'>
      <Label className={labelClass}>{label}</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            style={{ width: `${size}px` }}
            variant='outline'
            role='combobox'
            aria-expanded={open}
            className='justify-between'>
            {data
              ? filter.find((d) => d.value === data)?.label ||
                `Select ${label}...`
              : `Select ${label}...`}
            <ChevronsUpDown className='opacity-50' />
          </Button>
        </PopoverTrigger>
        <PopoverContent style={{ width: `${size}px` }} className='p-0'>
          <Command
            filter={(value, search) => {
              const item = filter.find((f) => f.value === value);
              if (!item) return 0;
              return item.label.toLowerCase().includes(search.toLowerCase())
                ? 1
                : 0;
            }}>
            <CommandInput
              placeholder={`Search ${label}...`}
              className='h-9'
              aria-label={`Search for ${label}`}
            />
            <CommandList className='max-h-[200px] overflow-y-auto overflow-x-hidden'>
              <CommandEmpty>No {label} found.</CommandEmpty>
              <CommandGroup>
                {filter.map((d) => (
                  <CommandItem
                    key={d.value}
                    value={d.value}
                    onSelect={(currentValue) => {
                      setData(currentValue);
                      setOpen(false);
                      onCallbackSelect?.(currentValue);
                    }}>
                    {d.label}
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4",
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
      {error && <p className='text-red-500 text-sm mt-1'>{error}</p>}
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
  item: PropTypes.arrayOf(PropTypes.shape({}).isRequired),
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
    { time: "next.js", less: "Next.js" },
    { time: "sveltekit", less: "SvelteKit" },
  ],
  defaultValue: "",
};

const propTypeItemShape = (props, propName, componentName) => {
  const optID = props.optID || "time";
  const optLabel = props.optLabel || "less";
  if (!Array.isArray(props[propName])) {
    return new Error(
      `Invalid prop \`${propName}\` supplied to \`${componentName}\`. Expected an array.`
    );
  }
  for (const item of props[propName] || []) {
    if (
      typeof item !== "object" ||
      item === null ||
      !(optID in item) ||
      !(optLabel in item)
    ) {
      return new Error(
        `Invalid prop \`${propName}\` supplied to \`${componentName}\`. Each item must be an object containing \`${optID}\` and \`${optLabel}\` properties.`
      );
    }
  }
};

FormComboBox.propTypes.item = propTypeItemShape;

export default FormComboBox;

// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList,
// } from "@/components/ui/command";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import { cn } from "@/lib/utils";
// import React, { useState } from "react";
// import { Check, ChevronsUpDown } from "lucide-react";
// import PropTypes from "prop-types";

// const FormComboBox = (props) => {
//   const {
//     onCallbackSelect,
//     optID,
//     optLabel,
//     labelClass,
//     size,
//     label,
//     item,
//     defaultValue,
//     error,
//   } = props;

//   const filter = (item || []).map((d) => ({
//     value: String(d[optID]),
//     label: d[optLabel],
//   }));

//   const [open, setOpen] = useState(false);
//   const [data, setData] = useState(
//     defaultValue || (filter.length > 0 ? filter[0].value : "")
//   );

//   return (
//     <div className='flex flex-col gap-2'>
//       <Label className={labelClass}>{label}</Label>
//       <Popover open={open} onOpenChange={setOpen}>
//         <PopoverTrigger asChild>
//           <Button
//             style={{ width: `${size}px` }}
//             variant='outline'
//             role='combobox'
//             aria-expanded={open}
//             className='justify-between'>
//             {data
//               ? filter.find((d) => d.value === data)?.label ||
//                 `Select ${label}...`
//               : `Select ${label}...`}
//             <ChevronsUpDown className='opacity-50' />
//           </Button>
//         </PopoverTrigger>
//         <PopoverContent
//           style={{ width: `${size}px` }} // Match trigger width
//           className='p-0'>
//           <Command
//             filter={(value, search) => {
//               const item = filter.find((f) => f.value === value);
//               if (!item) return 0;
//               return item.label.toLowerCase().includes(search.toLowerCase())
//                 ? 1
//                 : 0;
//             }}>
//             <CommandInput
//               placeholder={`Search ${label}...`}
//               className='h-9'
//               aria-label={`Search for ${label}`}
//             />
//             <CommandList className='max-h-[200px] overflow-y-auto overflow-x-hidden'>
//               <CommandEmpty>No {label} found.</CommandEmpty>
//               <CommandGroup>
//                 {filter.map((d) => (
//                   <CommandItem
//                     key={d.value}
//                     value={d.value}
//                     onSelect={(currentValue) => {
//                       setData(currentValue);
//                       setOpen(false);
//                       onCallbackSelect?.(currentValue);
//                     }}>
//                     {d.label}
//                     <Check
//                       className={cn(
//                         "ml-auto h-4 w-4",
//                         data === d.value ? "opacity-100" : "opacity-0"
//                       )}
//                     />
//                   </CommandItem>
//                 ))}
//               </CommandGroup>
//             </CommandList>
//           </Command>
//         </PopoverContent>
//       </Popover>
//       {error && <p className='text-red-500 text-sm mt-1'>{error}</p>}
//     </div>
//   );
// };

// FormComboBox.propTypes = {
//   onCallbackSelect: PropTypes.func,
//   optID: PropTypes.string,
//   optLabel: PropTypes.string,
//   labelClass: PropTypes.string,
//   size: PropTypes.number,
//   label: PropTypes.string,
//   error: PropTypes.string,
//   item: PropTypes.object,
//   defaultValue: PropTypes.string,
// };

// FormComboBox.defaultProps = {
//   onCallbackSelect: null,
//   optID: "time",
//   optLabel: "less",
//   labelClass: "",
//   size: 250,
//   label: "Email*",
//   item: [
//     { time: "next.js", less: "Next.js" },
//     { time: "sveltekit", less: "SvelteKit" },
//   ],
//   defaultValue: "",
// };

// export default FormComboBox;

// // import {
// //   Popover,
// //   PopoverContent,
// //   PopoverTrigger,
// // } from "@/components/ui/popover";
// // import {
// //   Command,
// //   CommandEmpty,
// //   CommandGroup,
// //   CommandInput,
// //   CommandItem,
// //   CommandList,
// // } from "@/components/ui/command";
// // import { Button } from "@/components/ui/button";
// // import { Label } from "@/components/ui/label";
// // import { cn } from "@/lib/utils";
// // import React, { useState } from "react";
// // import { Check, ChevronsUpDown } from "lucide-react";
// // import PropTypes from "prop-types";

// // const FormComboBox = (props) => {
// //   const {
// //     onCallbackSelect,
// //     optID,
// //     optLabel,
// //     labelClass,
// //     size,
// //     label,
// //     item,
// //     defaultValue,
// //     error,
// //   } = props;

// //   const filter = (item || []).map((d) => ({
// //     value: String(d[optID]),
// //     label: d[optLabel],
// //   }));

// //   const [open, setOpen] = useState(false);
// //   const [data, setData] = useState(
// //     defaultValue || (filter.length > 0 ? filter[0].value : "")
// //   );

// //   return (
// //     <div className='flex flex-col gap-2'>
// //       <Label className={labelClass}>{label}</Label>
// //       <Popover open={open} onOpenChange={setOpen}>
// //         <PopoverTrigger asChild>
// //           <Button
// //             style={{ width: `${size}px` }}
// //             variant='outline'
// //             role='combobox'
// //             aria-expanded={open}
// //             className='justify-between'>
// //             {data
// //               ? filter.find((d) => d.value === data)?.label ||
// //                 `Select ${label}...`
// //               : `Select ${label}...`}
// //             <ChevronsUpDown className='opacity-50' />
// //           </Button>
// //         </PopoverTrigger>
// //         <PopoverContent style={{ width: `${size}px` }} className='p-0'>
// //           <Command
// //             filter={(value, search) => {
// //               const item = filter.find((f) => f.value === value);
// //               if (!item) return 0;
// //               return item.label.toLowerCase().includes(search.toLowerCase())
// //                 ? 1
// //                 : 0;
// //             }}>
// //             <CommandInput
// //               placeholder={`Search ${label}...`}
// //               className='h-9'
// //               aria-label={`Search for ${label}`}
// //             />
// //             <CommandList className='overflow-y-auto'>
// //               <CommandEmpty>No {label} found.</CommandEmpty>
// //               <CommandGroup>
// //                 {filter.map((d) => (
// //                   <CommandItem
// //                     key={d.value}
// //                     value={d.value}
// //                     onSelect={(currentValue) => {
// //                       setData(currentValue);
// //                       setOpen(false);
// //                       onCallbackSelect?.(currentValue);
// //                     }}>
// //                     {d.label}
// //                     <Check
// //                       className={cn(
// //                         "ml-auto",
// //                         data === d.value ? "opacity-100" : "opacity-0"
// //                       )}
// //                     />
// //                   </CommandItem>
// //                 ))}
// //               </CommandGroup>
// //             </CommandList>
// //           </Command>
// //         </PopoverContent>
// //       </Popover>
// //       {error && <p className='text-red-500 text-sm mt-1'>{error}</p>}
// //     </div>
// //   );
// // };

// // FormComboBox.propTypes = {
// //   onCallbackSelect: PropTypes.func,
// //   optID: PropTypes.string,
// //   optLabel: PropTypes.string,
// //   labelClass: PropTypes.string,
// //   size: PropTypes.number,
// //   label: PropTypes.string,
// //   error: PropTypes.string,
// //   item: PropTypes.arrayOf(PropTypes.shape({}).isRequired),
// //   defaultValue: PropTypes.string,
// // };

// // FormComboBox.defaultProps = {
// //   onCallbackSelect: null,
// //   optID: "time",
// //   optLabel: "less",
// //   labelClass: "",
// //   size: 250,
// //   label: "Email*",
// //   item: [
// //     {
// //       time: "next.js",
// //       less: "Next.js",
// //     },
// //     {
// //       time: "sveltekit",
// //       less: "SvelteKit",
// //     },
// //   ],
// //   defaultValue: "",
// // };

// // const propTypeItemShape = (props, propName, componentName) => {
// //   const optID = props.optID || "time";
// //   const optLabel = props.optLabel || "less";
// //   if (!Array.isArray(props[propName])) {
// //     return new Error(
// //       `Invalid prop \`${propName}\` supplied to \`${componentName}\`. Expected an array.`
// //     );
// //   }
// //   for (const item of props[propName] || []) {
// //     if (
// //       typeof item !== "object" ||
// //       item === null ||
// //       !(optID in item) ||
// //       !(optLabel in item)
// //     ) {
// //       return new Error(
// //         `Invalid prop \`${propName}\` supplied to \`${componentName}\`. Each item must be an object containing \`${optID}\` and \`${optLabel}\` properties.`
// //       );
// //     }
// //   }
// // };

// // FormComboBox.propTypes.item = propTypeItemShape;

// // export default FormComboBox;
