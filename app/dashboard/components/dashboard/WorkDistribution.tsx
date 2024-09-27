import React, { PureComponent, MouseEvent, useState } from "react";
import { PieChart, Cell, Pie, Sector, ResponsiveContainer } from "recharts";
import logowhite from "../../../public/assets/logowhite2.png";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '../ui/card'
import { ChartConfig, ChartContainer } from "../ui/chart";
interface DataItem {
  name: string;
  value: number;
  color: string;
}

const data: DataItem[] = [
  { name: "JOBS holders", value: 25, color: "#cc8605" },
  { name: "Team", value: 15, color: "#FF98FC" },
  { name: "Community", value: 10, color: "#0088FE" },
];
const COLORS = ["#cc8605", "#FF98FC", "#0088FE"];

interface ActiveShapeProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  startAngle: number;
  endAngle: number;
  fill: string;
  payload: DataItem;
  percent: number;
  value: number;
}

interface ExampleState {
  activeIndex: number;
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
const WorkDistribution = () => {
  const [state, setState] = useState({
    activeIndex: 0,
  });

  const onPieEnter = (_: MouseEvent, index: number) => {
    setState({
      activeIndex: index,
    });
  };
  const renderActiveShape = (props: any | unknown): JSX.Element => {
    const RADIAN = Math.PI / 180;
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
      value,
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";

    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
          {payload.name}
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
          {`(${(percent * 100)}%)`}
        </text>
      </g>
    );
  };

  return (
    <Card className='rounded-xl border bg-card text-card-foreground shadow'>
    <CardHeader>
  
      {/* <CardDescription>January - June 2024</CardDescription> */}
    </CardHeader>
    <CardContent>
      <ChartContainer config={chartConfig}>
      <ResponsiveContainer width="100%" height="100%">
      <PieChart >
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
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
      </ChartContainer>
    </CardContent>

  </Card>
 
  );
};
export default WorkDistribution;