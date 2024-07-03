'use client'

import { Percent } from "lucide-react"
import {
  ResponsiveContainer, PieChart, Pie, Tooltip, Legend
} from 'recharts'
import { FaPercentage } from "react-icons/fa";
import { totalData } from "@/constants/fake-data";

export default function TotalSuscribers() {
  return (
    <div className="mb-4 lg:mb-0 shadow-sm bg-background rounded-lg p-5 w-full md:w-96 hover:shadow-lg transition">
      <div className="flex gap-x-2 items-center mb-4 ">
        <div className="flex items-center justify-center bg-slate-200 w-8 h-8 rounded-lg">
          <FaPercentage className="text-slate-500" />
        </div>
        <p className="text-xl">Total Suscribers</p>
      </div>
      <div className="w-full h-[200px] p-5 ">
        <ResponsiveContainer aspect={1} maxHeight={200}>
          <PieChart>
            <Pie
              dataKey="value"
              data={totalData}
              outerRadius={80}
              labelLine={false}
              
            />
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

