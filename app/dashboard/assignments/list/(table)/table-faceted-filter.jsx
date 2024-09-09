'use client'
import { useEffect, useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from '@/components/ui/command';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { FaPlusCircle, FaCheck } from "react-icons/fa";

const FacetedFilter = ({ table, columnId, options }) => {
  // const [selectedValues, setSelectedValues] = useState(new Set());

  // const handleCheckboxChange = (value) => {
  //   const newSelectedValues = new Set(selectedValues);
  //   if (newSelectedValues.has(value)) {
  //     newSelectedValues.delete(value);
  //   } else {
  //     newSelectedValues.add(value);
  //   }
  //   setSelectedValues(newSelectedValues);

  //   // Actualizamos el filtro de la columna
  //   table.getColumn(columnId)?.setFilterValue(Array.from(newSelectedValues));
  // };
  const column = table.getColumn(columnId);
  const [selectedValues, setSelectedValues] = useState(new Set());

  const title = columnId.replace(".", " ").toUpperCase();

  const toggleSelectAll = () => {
    if (selectedValues.size === options.length) {
      setSelectedValues(new Set());
      column.setFilterValue(undefined);
    } else {
      const allValues = new Set(options);
      setSelectedValues(allValues);
      column.setFilterValue(Array.from(allValues));
    }
  };

  return (
    <div className="faceted-filter">
      {/* {options.map((option) => (
        <label key={option} className="flex items-center gap-2">
          <Checkbox
            checked={selectedValues.has(option)}
            onCheckedChange={() => handleCheckboxChange(option)}
          />
          <span>{option}</span>
        </label>
      ))} */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="h-10 border-dashed">
            <FaPlusCircle className="mr-2 h-4 w-4" />
            Filtrar por beneficio
            {selectedValues.size > 0 && (
              <>
                <Separator orientation="vertical" className="mx-2 h-4" />
                <Badge variant="secondary" className="rounded-sm px-1 font-normal lg:hidden">
                  {selectedValues.size}
                </Badge>
                <div className="hidden space-x-1 lg:flex">
                  {selectedValues.size > 2 ? (
                    <Badge variant="secondary" className="rounded-sm px-1 font-normal">
                      {selectedValues.size} selected
                    </Badge>
                  ) : (
                    Array.from(selectedValues).map((value) => (
                      <Badge variant="secondary" key={value} className="rounded-sm px-1 font-normal">
                        {value}
                      </Badge>
                    ))
                  )}
                </div>
              </>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <Command>
            <CommandInput placeholder={`Filtrar por beneficio`} />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {options.map((option) => {
                  const isSelected = selectedValues.has(option);
                  return (
                    <CommandItem
                      key={option}
                      onSelect={() => {
                        const newSelectedValues = new Set(selectedValues);
                        if (isSelected) {
                          newSelectedValues.delete(option);
                        } else {
                          newSelectedValues.add(option);
                        }
                        setSelectedValues(newSelectedValues);
                        column.setFilterValue(Array.from(newSelectedValues));
                      }}
                    >
                      <div
                        className={`mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary ${
                          isSelected ? "bg-primary text-primary-foreground" : "opacity-50"
                        }`}
                      >
                        {
                          isSelected ? <FaCheck className="h-4 w-4" /> : ""
                        }
                      </div>
                      <span>{option}</span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
              {selectedValues.size > 0 && (
                <>
                  <CommandSeparator />
                  <CommandGroup>
                    <CommandItem onSelect={() => setSelectedValues(new Set())} className="justify-center text-center">
                      Clear filters
                    </CommandItem>
                  </CommandGroup>
                </>
              )}
              <CommandGroup>
                <CommandItem onSelect={toggleSelectAll} className="justify-center text-center">
                  {selectedValues.size === options.length ? "Deselect All" : "Select All"}
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default FacetedFilter;
// import * as React from "react"
// // import { CheckIcon, PlusCircledIcon } from "@radix-ui/react-icons"
// import { Column } from "@tanstack/react-table"
// import { FaCheck, FaPlusCircle  } from "react-icons/fa";

// import { cn } from "@/lib/utils"
// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList,
//   CommandSeparator,
// } from "@/components/ui/command"
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover"
// import { Separator } from "@/components/ui/separator"


// export function DataTableFacetedFilter({
//   column,
//   title,
//   options,
// }) {
//   const facets = column?.getFacetedUniqueValues()
//   const selectedValues = new Set(column?.getFilterValue())

//   return (
    // <Popover>
    //   <PopoverTrigger asChild>
    //     <Button variant="outline" size="sm" className="h-8 border-dashed">
    //       <FaPlusCircle className="mr-2 h-4 w-4" />
    //       {title}
    //       {selectedValues?.size > 0 && (
    //         <>
    //           <Separator orientation="vertical" className="mx-2 h-4" />
    //           <Badge
    //             variant="secondary"
    //             className="rounded-sm px-1 font-normal lg:hidden"
    //           >
    //             {selectedValues.size}
    //           </Badge>
    //           <div className="hidden space-x-1 lg:flex">
    //             {selectedValues.size > 2 ? (
    //               <Badge
    //                 variant="secondary"
    //                 className="rounded-sm px-1 font-normal"
    //               >
    //                 {selectedValues.size} selected
    //               </Badge>
    //             ) : (
    //               options
    //                 .filter((option) => selectedValues.has(option.value))
    //                 .map((option) => (
    //                   <Badge
    //                     variant="secondary"
    //                     key={option.value}
    //                     className="rounded-sm px-1 font-normal"
    //                   >
    //                     {option.label}
    //                   </Badge>
    //                 ))
    //             )}
    //           </div>
    //         </>
    //       )}
    //     </Button>
    //   </PopoverTrigger>
    //   <PopoverContent className="w-[200px] p-0" align="start">
    //     <Command>
    //       <CommandInput placeholder={title} />
    //       <CommandList>
    //         <CommandEmpty>No results found.</CommandEmpty>
    //         <CommandGroup>
    //           {options.map((option) => {
    //             const isSelected = selectedValues.has(option.value)
    //             return (
    //               <CommandItem
    //                 key={option.value}
    //                 onSelect={() => {
    //                   if (isSelected) {
    //                     selectedValues.delete(option.value)
    //                   } else {
    //                     selectedValues.add(option.value)
    //                   }
    //                   const filterValues = Array.from(selectedValues)
    //                   column?.setFilterValue(
    //                     filterValues.length ? filterValues : undefined
    //                   )
    //                 }}
    //               >
    //                 <div
    //                   className={cn(
    //                     "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
    //                     isSelected
    //                       ? "bg-primary text-primary-foreground"
    //                       : "opacity-50 [&_svg]:invisible"
    //                   )}
    //                 >
    //                   <FaCheck className={cn("h-4 w-4")} />
    //                 </div>
    //                 {option.icon && (
    //                   <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />
    //                 )}
    //                 <span>{option.label}</span>
    //                 {facets?.get(option.value) && (
    //                   <span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
    //                     {facets.get(option.value)}
    //                   </span>
    //                 )}
    //               </CommandItem>
    //             )
    //           })}
    //         </CommandGroup>
    //         {selectedValues.size > 0 && (
    //           <>
    //             <CommandSeparator />
    //             <CommandGroup>
    //               <CommandItem
    //                 onSelect={() => column?.setFilterValue(undefined)}
    //                 className="justify-center text-center"
    //               >
    //                 Clear filters
    //               </CommandItem>
    //             </CommandGroup>
    //           </>
    //         )}
    //       </CommandList>
    //     </Command>
    //   </PopoverContent>
    // </Popover>
//   )
// }