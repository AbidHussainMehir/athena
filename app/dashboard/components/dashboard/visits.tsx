// 'use client'
// import { CartesianGrid, Line, LineChart, XAxis } from 'recharts'
// import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '../ui/chart'
const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--chart-1))'
  }
} satisfies ChartConfig

// export function VisitsChart({ apiData: apiData }: any) {
//   return (
//     <Card className='rounded-xl border bg-card text-card-foreground shadow'>
//       <CardHeader>
//         <CardTitle>Actions Per Day</CardTitle>
//         {/* <CardDescription>January - June 2024</CardDescription> */}
//       </CardHeader>
//       <CardContent>
//         <ChartContainer config={chartConfig}>
//           <LineChart
//             // accessibilityLayer
//             data={apiData}
//             margin={{
//               left: 12,
//               right: 12
//             }}
//           >
//             <CartesianGrid vertical={false} />
//             <XAxis
//               dataKey="day"
//               tickLine={false}
//               axisLine={false}
//               tickMargin={8}
//               tickFormatter={value => value && value.slice(0, 5)}
//             />
//             <ChartTooltip
//               cursor={false}
//               content={<ChartTooltipContent hideLabel />}
//             />
//             <Line
//               dataKey="actions"
//               type="linear"
//               stroke="var(--color-desktop)"
//               strokeWidth={2}
//               dot={false}
//             />
//           </LineChart>
//         </ChartContainer>
//       </CardContent>
//       {/* <CardFooter className="flex-col items-start gap-2 text-sm">
//         <div className="flex gap-2 font-medium leading-none">
//           Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
//         </div>
//         <div className="leading-none text-muted-foreground">
//           Showing total visitors for the last {apiData && apiData?.length} days
//         </div>
//       </CardFooter> */}
//     </Card>
//   )
// }
// import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'

// import React, { useState, useEffect } from 'react'
// import {
//   AreaChart,
//   Area,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer
// } from 'recharts'

// const data = [
//   {
//     name: 'Page A',
//     uv: 4000,
//     pv: 2400,
//     amt: 2400
//   },
//   {
//     name: 'Page B',
//     uv: 3000,
//     pv: 1398,
//     amt: 2210
//   },
//   {
//     name: 'Page C',
//     uv: 2000,
//     pv: 9800,
//     amt: 2290
//   },
//   {
//     name: 'Page D',
//     uv: 2780,
//     pv: 3908,
//     amt: 2000
//   },
//   {
//     name: 'Page E',
//     uv: 1890,
//     pv: 4800,
//     amt: 2181
//   },
//   {
//     name: 'Page F',
//     uv: 2390,
//     pv: 3800,
//     amt: 2500
//   },
//   {
//     name: 'Page G',
//     uv: 3490,
//     pv: 4300,
//     amt: 2100
//   }
// ]

// export const VisitsChart = (props: any) => {
//   console.log({ props })
//   const [chartData, setChartData] = useState([])
//   useEffect(() => {
//     try {
//       const { chartSearchData, apiData, chartVisitsData }: any = props

//       const mergedData: any = {}

//       // Function to merge data by day
//       const mergeByDay = (array: any, key: any) => {
//         array.forEach((item: any) => {
//           if (!mergedData[item.day]) {
//             mergedData[item.day] = { day: item.day }
//           }
//           mergedData[item.day][key] = item[key]
//         })
//       }

//       // Merge the data
//       mergeByDay(chartSearchData, 'reward')
//       mergeByDay(apiData, 'actions')
//       mergeByDay(chartVisitsData, 'visits')

//       // Convert the mergedData object back into an array
//       const result: any = Object.values(mergedData)
//       setChartData(result)
//     } catch (error) {}
//   }, [props])
//   console.log({ chartData })
//   return (
//     <Card className="rounded-xl  mb-4 border bg-card text-card-foreground shadow">
//       {/* <CardHeader>
//         <CardTitle>Actions Per Day</CardTitle>
//       </CardHeader> */}
//       <CardContent>
//         <ChartContainer config={chartConfig}>
//           <ResponsiveContainer width="100%" height="200px">
//             <AreaChart
//               height={200}
//               data={chartData}
//               margin={{
//                 top: 10,
//                 right: 30,
//                 left: 0,
//                 bottom: 0
//               }}
//             >
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="day" />
//               <YAxis />
//               <Tooltip />
//               <Area
//                 type="monotone"
//                 dataKey="actions"
//                 stackId="1"
//                 stroke="#8884d8"
//                 fill="#8884d8"
//               />
//               <Area
//                 type="monotone"
//                 dataKey="visits"
//                 stackId="1"
//                 stroke="#82ca9d"
//                 fill="#82ca9d"
//               />
//               <Area
//                 type="monotone"
//                 dataKey="reward"
//                 stackId="1"
//                 stroke="#ffc658"
//                 fill="#ffc658"
//               />
//             </AreaChart>
//           </ResponsiveContainer>
//         </ChartContainer>
//       </CardContent>
//     </Card>
//   )
// }
import React from 'react'
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer
} from 'recharts'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '../ui/card'
const colors = ['green', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink']

const getPath = (
  x: number,
  y: number,
  width: number,
  height: number
): string => {
  return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${
    y + height / 3
  }
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
    x + width
  }, ${y + height}
  Z`
}

const TriangleBar = (props: any) => {
  const { fill, x, y, width, height } = props

  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />
}

export const VisitsChart = ({
  apiData: apiData,
  searchData: searchData,
  apiDataAccount: apiDataAccount,
  account: account,
  searchDataAccount: searchDataAccount,
  customEventsData
}: any) => {
  const data = [
    {
      name: 'Visits',
      uv: account ? apiDataAccount?.nb_visits : apiData?.nb_visits
    },
    {
      name: 'Actions',
      uv: account ? apiDataAccount?.nb_actions : apiData?.nb_actions
    },
    {
      name: 'Search',
      uv: account ? searchDataAccount : searchData
    },
    {
      name: 'Time',
      uv: account ? apiDataAccount?.avg_time_on_site : apiData?.avg_time_on_site
    },
    {
      name: 'Sources',
      uv: account ? customEventsData?.nb_visits : customEventsData?.nb_visits
    }
  ]
  return (
    <Card
      className="rounded-xl  mb-4 border bg-card text-card-foreground shadow "
      style={{ minHeight: '100%' }}
    >
      <CardHeader>
        <CardTitle className="p-2"></CardTitle>
        {/* <CardDescription>Presale</CardDescription> */}
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height="200px">
            <BarChart
              height={200}
              data={data}
              margin={{
                top: 10,
                right: 10,
                left: 10,
                bottom: 5
              }}
            >
              <CartesianGrid strokeDasharray="1 1 1 1" />
              <XAxis width={5} dataKey="name" />
              {/* <YAxis /> */}
              <Bar
                dataKey="uv"
                fill="#8884d8"
                shape={<TriangleBar />}
                label={{ position: 'top', width: 10 }}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} width={20} fill={colors[index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
