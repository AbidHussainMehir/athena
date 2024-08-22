'use client'

import { TrendingUp } from 'lucide-react'
import { CartesianGrid, Line, LineChart, XAxis } from 'recharts'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '../ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '../ui/chart'
import { useEffect, useState } from 'react'

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--chart-1))'
  }
} satisfies ChartConfig

export function RewardsChart({ chartSearchData: chartSearchData }: any) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Searches Per Day</CardTitle>
        {/* <CardDescription>January - June 2024</CardDescription> */}
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            // accessibilityLayer
            data={chartSearchData}
            margin={{
              left: 12,
              right: 12
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value, index) => {
                const isFirst = index === 0
                const isLast = index === chartSearchData&&chartSearchData.length - 1
                const isEvery8th = index % 5 === 0
                return isFirst || isLast || isEvery8th ? value : ''
              }}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="reward"
              type="step"
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last{' '}
          {chartSearchData && chartSearchData.length} days
        </div>
      </CardFooter> */}
    </Card>
  )
}
