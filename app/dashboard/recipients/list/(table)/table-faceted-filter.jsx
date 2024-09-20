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
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="h-10 border-dashed">
            <FaPlusCircle className="mr-2 h-4 w-4" />
            Filtrar por Localidad
            {selectedValues.size > 0 && (
              <>
                <Separator orientation="vertical" className="mx-2 h-4" />
                <Badge variant="secondary" className="rounded-sm px-1 font-normal lg:hidden">
                  {selectedValues.size}
                </Badge>
                <div className="hidden space-x-1 lg:flex">
                  {selectedValues.size > 5 ? (
                    <Badge variant="secondary" className="rounded-sm px-1 font-normal">
                      {selectedValues.size} seleccionados
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
                  {selectedValues.size === options.length ? "Deseleccionar Todo" : "Seleccionar Todo"}
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

// 'use client'
// import { useEffect, useState } from 'react';
// import { Checkbox } from '@/components/ui/checkbox';
// import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
// import { Separator } from '@/components/ui/separator';
// import { Badge } from '@/components/ui/badge';
// import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from '@/components/ui/command';
// import { Button } from '@/components/ui/button';
// import { cn } from '@/lib/utils';
// import { FaPlusCircle, FaCheck } from "react-icons/fa";
// // const [selectedValues, setSelectedValues] = useState(new Set());

// // const handleCheckboxChange = (value) => {
// //   const newSelectedValues = new Set(selectedValues);
// //   if (newSelectedValues.has(value)) {
// //     newSelectedValues.delete(value);
// //   } else {
// //     newSelectedValues.add(value);
// //   }
// //   setSelectedValues(newSelectedValues);

// //   // Actualizamos el filtro de la columna
// //   table.getColumn(columnId)?.setFilterValue(Array.from(newSelectedValues));
// // };

// const FacetedFilter = ({ table, columnId, options }) => {
//   const column = table.getColumn(columnId);
  
//   console.log("ColumnId:", columnId); // Verifica el valor
  
//   const [selectedValues, setSelectedValues] = useState(new Set());

//   // const title = columnId.replace(".", " ").toUpperCase();

//   const toggleSelectAll = () => {
//     if (selectedValues.size === options.length) {
//       setSelectedValues(new Set());
//       column.setFilterValue(undefined);
//     } else {
//       const allValues = new Set(options);
//       setSelectedValues(allValues);
//       column.setFilterValue(Array.from(allValues));
//     }
//   };

//   return (
//     <div className="faceted-filter">
//       {/* {options.map((option) => (
//         <label key={option} className="flex items-center gap-2">
//           <Checkbox
//             checked={selectedValues.has(option)}
//             onCheckedChange={() => handleCheckboxChange(option)}
//           />
//           <span>{option}</span>
//         </label>
//       ))} */}
//       <Popover>
//         <PopoverTrigger asChild>
//           <Button variant="outline" size="sm" className="h-10 border-dashed">
//             <FaPlusCircle className="mr-2 h-4 w-4" />
//             Filtrar por beneficio
//             {selectedValues.size > 0 && (
//               <>
//                 <Separator orientation="vertical" className="mx-2 h-4" />
//                 <Badge variant="secondary" className="rounded-sm px-1 font-normal lg:hidden">
//                   {selectedValues.size}
//                 </Badge>
//                 <div className="hidden space-x-1 lg:flex">
//                   {selectedValues.size > 2 ? (
//                     <Badge variant="secondary" className="rounded-sm px-1 font-normal">
//                       {selectedValues.size} selected
//                     </Badge>
//                   ) : (
//                     Array.from(selectedValues).map((value) => (
//                       <Badge variant="secondary" key={value} className="rounded-sm px-1 font-normal">
//                         {value}
//                       </Badge>
//                     ))
//                   )}
//                 </div>
//               </>
//             )}
//           </Button>
//         </PopoverTrigger>
//         <PopoverContent className="w-[200px] p-0" align="start">
//           <Command>
//             <CommandInput placeholder={`Filtrar por beneficio`} />
//             <CommandList>
//               <CommandEmpty>No results found.</CommandEmpty>
//               <CommandGroup>
//               {options.map((option) => {
//                 const isSelected = selectedValues.has(option.id); // Usar option.id para verificar la selección
//                 return (
//                   <CommandItem
//                     key={option.id}
//                     onSelect={() => {
//                       const newSelectedValues = new Set(selectedValues);
//                       if (isSelected) {
//                         newSelectedValues.delete(option.name);
//                       } else {
//                         newSelectedValues.add(option.name);
//                       }
//                       setSelectedValues(newSelectedValues);
//                       if (column) {
//                         column.setFilterValue(Array.from(newSelectedValues)); // Solo llama si la columna está disponible
//                       }
//                     }}
//                   >
//                     <div
//                       className={`mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary ${
//                         isSelected ? "bg-primary text-primary-foreground" : "opacity-50"
//                       }`}
//                     >
//                       {isSelected ? <FaCheck className="h-4 w-4" /> : ""}
//                     </div>
//                     <span>{option.name}</span> {/* Usar option.name para renderizar el nombre */}
//                   </CommandItem>
//                 );
//               })}
//               </CommandGroup>
//               {selectedValues.size > 0 && (
//                 <>
//                   <CommandSeparator />
//                   <CommandGroup>
//                     <CommandItem onSelect={() => setSelectedValues(new Set())} className="justify-center text-center">
//                       Clear filters
//                     </CommandItem>
//                   </CommandGroup>
//                 </>
//               )}
//               <CommandGroup>
//                 <CommandItem onSelect={toggleSelectAll} className="justify-center text-center">
//                   {selectedValues.size === options.length ? "Deselect All" : "Select All"}
//                 </CommandItem>
//               </CommandGroup>
//             </CommandList>
//           </Command>
//         </PopoverContent>
//       </Popover>
//     </div>
//   );
// };

// export default FacetedFilter;
