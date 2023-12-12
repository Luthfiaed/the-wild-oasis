import styled from "styled-components";
import DashboardBox from "./DashboardBox";
import Heading from "../../ui/Heading";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useDarkMode } from "../../context/useDarkMode";
import { eachDayOfInterval, subDays, format, isSameDay } from "date-fns";

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

const colorsDarkMode = {
  totalSales: { stroke: "#4f46e5", fill: "#4f46e5" },
  extrasSales: { stroke: "#22c55e", fill: "#22c55e" },
  text: "#e5e7eb",
  background: "#18212f",
};

const colorsLightMode = {
  totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
  extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
  text: "#374151",
  background: "#fff",
};

function SalesChart({ bookings, numDays }: { bookings: any; numDays: any }) {
  const { isDarkMode } = useDarkMode();

  // console.log("num days ", numDays);
  // console.log("bookings ", bookings);

  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });

  // console.log("all dates: ", allDates);
  const data = allDates.map((date) => {
    return {
      label: format(date, "MMM dd"),
      totalSales: bookings
        .filter((booking: any) => isSameDay(date, new Date(booking.createdAt)))
        .reduce((acc: any, curr: any) => acc + curr.totalPrice, 0),
      extraSales: bookings
        .filter((booking: any) => isSameDay(date, new Date(booking.createdAt)))
        .reduce((acc: any, curr: any) => acc + curr.extraPrice, 0),
    };
  });

  const color = isDarkMode ? colorsDarkMode : colorsLightMode;

  return (
    <StyledSalesChart>
      <Heading as="h2">
        Sales from {format(allDates.at(0)!, "MMM dd yyy")} &mdash;{" "}
        {format(allDates.at(-1)!, "MMM dd yyy")}
      </Heading>

      <ResponsiveContainer height={300} width="100%">
        <AreaChart data={data}>
          <XAxis
            dataKey="label"
            tick={{ fill: color.text }}
            tickLine={{ stroke: color.text }}
          />
          <YAxis
            unit="$"
            tick={{ fill: color.text }}
            tickLine={{ stroke: color.text }}
          />
          <CartesianGrid strokeDasharray={4} />
          <Tooltip contentStyle={{ backgroundColor: color.background }} />
          <Area
            dataKey="totalSales"
            stroke={color.totalSales.stroke}
            fill={color.totalSales.fill}
            type="monotone"
            strokeWidth={2}
            name="Total sales"
            unit="$"
          />
          <Area
            dataKey="extraSales"
            stroke={color.extrasSales.stroke}
            fill={color.extrasSales.fill}
            type="monotone"
            strokeWidth={2}
            name="Extras sales"
            unit="$"
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  );
}

export default SalesChart;
