
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
import LineChart from '../lineChart';
const colors = ['green', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink']

const getPath = (
  x: number,
  y: number,
  width: number,
  height: number
): string => {
  return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3
    }
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width
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
  customEventsData,
  likeUnlikeData,
  likeUnlikeDataAccount,
  customEventsDataAccount
}: any) => {
  const data = [['Visits', account ? apiDataAccount?.nb_visits : apiData?.nb_visits],
  // {
  //   name: 'Actions',
  //   uv: account ? apiDataAccount?.nb_actions : apiData?.nb_actions
  // },
  ['Search', account ? searchDataAccount : searchData],
  ['Time', account ? apiDataAccount?.avg_time_on_site : apiData?.avg_time_on_site],
  ['Sources', account ? customEventsDataAccount?.nb_visits : customEventsData?.nb_visits],
  ['Feedbacks', account ? likeUnlikeDataAccount[0] + likeUnlikeDataAccount[1] : likeUnlikeData[0] + likeUnlikeData[1]]
  ]

  return (
    <Card
      className="rounded-xl  mb-4 border bg-card text-card-foreground shadow "
      style={{ minHeight: '100%' }}
    >
      <CardHeader>
        <CardTitle className="text-center">
          {account ? "My Metrics" : "Athena Metrics"}
        </CardTitle>

        {/* <CardDescription>Presale</CardDescription> */}
      </CardHeader>
      <CardContent>
        <LineChart data={data} />
        {/* <ChartContainer config={chartConfig}>
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
        </ChartContainer> */}
      </CardContent>
    </Card>
  )
}
