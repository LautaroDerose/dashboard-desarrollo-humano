
"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
export const description = "A donut chart with text"
const chartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 287, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 190, fill: "var(--color-other)" },
]
const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} 
export function PieCharts() {
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0)
  }, [])
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Pie Chart - Donut with Text</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
      
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square h-[20vh]"
          // className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="browser"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Visitors
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}

// "use client"

// import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import {
//   ChartConfig,
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
// } from "@/components/ui/chart"

// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#FF6B6B']

// export default function RecipientCharts({ 
//   menoresDe18,
//   entre18Y35,
//   entre36Y50,
//   entre50Y60,
//   mayoresDe60,
//   masculino,
//   femenino,
//   recipientsWithLocalitiesNames 
// }) {
//   const genderData = [
//     { name: 'Masculino', value: 50 },
//     { name: 'Femenino', value: 50 },
//   ]

//   const ageData = [
//     { name: 'Menores de 18', value: menoresDe18 },
//     { name: '18-35', value: entre18Y35 },
//     { name: '36-50', value: entre36Y50 },
//     { name: '51-60', value: entre50Y60 },
//     { name: 'Mayores de 60', value: mayoresDe60 },
//   ]

//   const localityData = recipientsWithLocalitiesNames.sort((a, b) => b.count - a.count).slice(0, 10)
//   console.log("Data",{ menoresDe18, entre18Y35, entre36Y50, entre50Y60, mayoresDe60, masculino, femenino, recipientsWithLocalitiesNames });
//   return (
//     <div className="space-y-8">
//       <Card>
//         <CardHeader>
//           <CardTitle>Distribución por Género</CardTitle>
//           <CardDescription>Proporción de destinatarios masculinos y femeninos</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <ResponsiveContainer width="100%" height={300}>
//             <PieChart>
//               <Pie
//                 data={genderData}
//                 cx="50%"
//                 cy="50%"
//                 labelLine={false}
//                 outerRadius={80}
//                 fill="#8884d8"
//                 dataKey="value"
//                 label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
//               >
//                 {genderData.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                 ))}
//               </Pie>
//               <Tooltip />
//               <Legend />
//             </PieChart>
//           </ResponsiveContainer>
//         </CardContent>
//       </Card>

//       {/* <Card>
//         <CardHeader>
//           <CardTitle>Distribución por Edad</CardTitle>
//           <CardDescription>Número de destinatarios por grupo de edad</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={ageData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="name" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Bar dataKey="value" fill="#8884d8" />
//             </BarChart>
//           </ResponsiveContainer>
//         </CardContent>
//       </Card>

//       <Card>
//         <CardHeader>
//           <CardTitle>Top 10 Localidades</CardTitle>
//           <CardDescription>Número de destinatarios por localidad</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <ResponsiveContainer width="100%" height={400}>
//             <BarChart data={localityData} layout="vertical">
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis type="number" />
//               <YAxis dataKey="localityName" type="category" width={150} />
//               <Tooltip />
//               <Legend />
//               <Bar dataKey="count" fill="#82ca9d" />
//             </BarChart>
//           </ResponsiveContainer>
//         </CardContent>
//       </Card> */}
//     </div>
//   )
// }
