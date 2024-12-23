import React, { MouseEvent, ReactElement, useState } from 'react'
import { PieChart, Cell, Pie, Sector, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartConfig, ChartContainer } from '@/components/ui/chart'

interface DataItem {
  name: string
  value: number
  color: string
  allocation: string
}

const data: DataItem[] = [
  { name: 'Public Presale', allocation: '11.5M ATH', value: 55, color: '#cc8605' },
  { name: 'Team', value: 15, allocation: '3.2M ATH', color: '#FF98FC' },
  { name: 'Advisior', value: 5, allocation: '1M ATH', color: '#0088FE' },
  { name: 'Operations', value: 15, allocation: '3.2M ATH', color: '#237809' },
  { name: 'Marketing', value: 10, allocation: '2.1M', color: '#ff0000' }
]

const COLORS = [
  '#cc8605',
  '#FF98FC',
  '#0088FE',
  '#237809',
  '#ff0000'
]

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

const JobsDistributionChart = () => {
  const [state, setState] = useState({
    activeIndex: 0
  })

  const onPieEnter = (_: MouseEvent, index: number) => {
    setState({
      activeIndex: index
    })
  }
  const renderActiveShape = (props: ActiveShapeProps): ReactElement => {
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
    const sx = cx + (outerRadius + 2) * cos
    const sy = cy + (outerRadius + 2) * sin
    const mx = cx + (outerRadius + 3) * cos
    const my = cy + (outerRadius + 3) * sin
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

        <text
          x={ex + (cos >= 0 ? 1 : -1) * 2}
          y={ey - 8}
          dy={4}
          textAnchor={textAnchor}
          fill={payload.color}
        >
          {`(${(percent * 100).toFixed(0)}%)`}
        </text>
      </g>
    )
  }
  return (
    <Card
      className="rounded-xl border bg-card text-card-foreground shadow"
      style={{ minHeight: '100%' }}
    >
      <CardHeader>
        <CardTitle className="text-center ">ATH Allocation</CardTitle>

      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart width={400} height={400}>
              <Pie
                activeIndex={state.activeIndex}
                activeShape={renderActiveShape as any}
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                onMouseEnter={onPieEnter}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
export default JobsDistributionChart
