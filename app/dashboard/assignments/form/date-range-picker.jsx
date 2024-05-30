"use client"
 
import * as React from "react"
import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"
 
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
 import { useState } from "react"
export function DatePickerWithRange({ className, }) {
  const [date, setDate] = useState({
    from: new Date(),
    to: addDays(new Date(), 20),
  })
 
  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

// "use client"
 
// import * as React from "react"
// import { addDays, format } from "date-fns"
// import { Calendar as CalendarIcon } from "lucide-react"
// import { DateRange } from "react-day-picker"
 
// import { cn } from "@/lib/utils"
// import { Button } from "@/components/ui/button"
// import { Calendar } from "@/components/ui/calendar"
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover"
//  import { useState } from "react"
// export function DatePickerWithRange({ className, date, setDate }) {
//   // const [date, setDate] = useState({
//   //   from: new Date(),
//   //   to: addDays(new Date(), 20),
//   // })
 
//   return (
//     <div className={cn("grid gap-2", className)}>
//       <Popover>
//         <PopoverTrigger asChild>
//           <Button
//             id="date"
//             variant={"outline"}
//             className={cn(
//               "w-[300px] justify-start text-left font-normal",
//               !field.value && "text-muted-foreground"
//             )}
//             // className={cn(
//             //   "w-[300px] justify-start text-left font-normal",
//             //   !date && "text-muted-foreground"
//             // )}
//           >
//             <CalendarIcon className="mr-2 h-4 w-4" />
//             {/* {date?.from ? (
//               date.to ? (
//                 <>
//                   {format(date.from, "LLL dd, y")} -{" "}
//                   {format(date.to, "LLL dd, y")}
//                 </>
//               ) : (
//                 format(date.from, "LLL dd, y")
//               )
//             ) : ( */}
//             {field.value.from ? (
//               field.value.to ? (
//                   <>
//                       {format(field.value.from, "LLL dd, y")} -{" "}
//                       {format(field.value.to, "LLL dd, y")}
//                   </>
//               ) : (
//                   format(field.value.from, "LLL dd, y")
//               )
//             ) : (
//               <span>Pick a date</span>
//             )}
//           </Button>
//         </PopoverTrigger>
//         <PopoverContent className="w-auto p-0" align="start">
//           {/* <Calendar
//             initialFocus
//             mode="range"
//             defaultMonth={date?.from}
//             selected={date}
//             onSelect={setDate}
//             numberOfMonths={2}
//           /> */}
//           <Calendar
//             initialFocus
//             mode="range"
//             defaultMonth={field.value.from}
//             selected={{from: field.value.from!, to: field.value.to}}
//             onSelect={field.onChange}
//             numberOfMonths={1}
//           />
//         </PopoverContent>
//       </Popover>
//     </div>
//   )
// }