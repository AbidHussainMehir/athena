import React, { PureComponent, MouseEvent, useState } from 'react'
import { PieChart, Cell, Pie, Sector, ResponsiveContainer } from 'recharts'
import logowhite from '../../../public/assets/logowhite2.png'
import Image from 'next/image'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '../ui/card'
import { ChartConfig, ChartContainer } from '../ui/chart'
interface DataItem {
  name: string
  value: number
  color: string
  allocation: string
}

interface ActiveShapeProps {
  cx: number
  cy: number
  midAngle: number
  innerRadius: number
  outerRadius: number
  startAngle: number
  endAngle: number
  fill: string
  payload: DataItem
  percent: number
  value: number
}

interface ExampleState {
  activeIndex: number
}

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--chart-1))'
  },
  mobile: {
    label: 'Mobile',
    color: 'hsl(var(--chart-2))'
  }
} satisfies ChartConfig
const COLORS = ['#FF98FC', '#0088FE', '#cc8605', '#ff0000']

const WorkDistribution = ({
  apiData: apiData,
  searchData: searchData,
  apiDataAccount: apiDataAccount,
  account: account,
  searchDataAccount: searchDataAccount,
  customEventsData
}: any) => {
  const [data] = useState<any>([
    {
      name: 'Community Rewards',
      allocation: '400M ATHR',
      value: 80,
      color: '#FF98FC'
    },
    { name: 'Team', value: 5, allocation: '25M ATHR', color: '#0088FE' },
    { name: 'Campaigns', value: 10, allocation: '75M ATHR', color: '#cc8605' },
    { name: 'Marketing', value: 5, allocation: '25M ATHR', color: '#ff0000' }
  ])

  const [state, setState] = useState({
    activeIndex: 0
  })

  const onPieEnter = (_: MouseEvent, index: number) => {
    setState({
      activeIndex: index
    })
  }
  const renderActiveShape = (props: any | unknown): JSX.Element => {
    const RADIAN = Math.PI / 180
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      percent,
      value
    } = props
    const sin = Math.sin(-RADIAN * midAngle)
    const cos = Math.cos(-RADIAN * midAngle)
    const sx = cx + (outerRadius + 10) * cos
    const sy = cy + (outerRadius + 10) * sin
    const mx = cx + (outerRadius + 30) * cos
    const my = cy + (outerRadius + 30) * sin
    const ex = mx + (cos >= 0 ? 1 : -1) * 22
    const ey = my
    const textAnchor = cos >= 0 ? 'start' : 'end'

    return (
      <g>
        <text x={cx} y={cy} dy={-8} textAnchor="middle" fill={fill}>
          {payload.name}
        </text>
        <text x={cx} y={cy} dy={14} textAnchor="middle" fill={fill}>
          {`${payload.allocation} Tokens`}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={payload.color}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={payload.color}
        />
        <path
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
          stroke={payload.color}
          fill="none"
        />
        <circle cx={ex} cy={ey} r={2} fill={payload.color} stroke="none" />

        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          dy={18}
          textAnchor={textAnchor}
          fill={payload.color}
        >
          {`(${percent * 100}%)`}
        </text>
      </g>
    )
  }

  return (
    <Card
      className="rounded-xl border bg-card text-card-foreground shadow "
      style={{ minHeight: '100%' }}
    >
      <CardHeader>
        <CardTitle className="text-center">ATHR Allocation</CardTitle>

        {/* <CardDescription>Rewards</CardDescription> */}
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                activeIndex={state.activeIndex}
                activeShape={renderActiveShape}
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                onMouseEnter={onPieEnter}
              >
                {data.map((entry: any, index: any) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
        {/* <div className="text-center">
          <p>Community Rewards:80%(400M ATHR)</p>
          <p> Team:5%(25M ATHR Token)</p>
          <p>Campaigns:10%(75M ATHR Token)</p>
          <p> Marketing:5%(25M ATHR Tokens)</p>
        </div> */}
      </CardContent>
    </Card>
  )
}
export default WorkDistribution
