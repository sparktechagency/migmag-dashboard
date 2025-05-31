import React, { useState } from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Title from "../share/Title";
import SelectBox from "../share/SelectBox";
interface RawData {
  month: string;
  data: number;
}

interface DataPoint {
  name: string;
  amt: number;
}

interface Props {
  dataChart?: RawData[];
}

const RevenueChart: React.FC<Props> = ({ dataChart }) => {
  const [selectedValue, setSelectedValue] = useState<string | undefined>("1");

  const chartData =
    dataChart?.data?.monthly_revenue_this_year?.map((item) => ({
      name: item.month,
      amt: item.data,
    })) || [];

  const chartDataLastyears =
    dataChart?.data?.monthly_revenue_last_year?.map((item) => ({
      name: item.month,
      amt: item.data,
    })) || [];

  const formatYAxis = (tickItem) => `${tickItem / 1000}k`;

  const handleSelectChange = (value: string) => {
    setSelectedValue(value);
  };
  console.log(selectedValue);
  console.log("====================================");

  const selectOptions = [
    { value: "1", label: "This Year" },
    { value: "2", label: "Last Year" },
  ];

  return (
    <div className="bg-[#FFFFFF] rounded-2xl mt-2 p-2 text-gray-300 pr-14">
      <div className="flex justify-between">
        <Title className="mb-5">Statics Analytics</Title>
        <SelectBox
          options={selectOptions}
          placeholder="Revenue"
          onChange={handleSelectChange}
          style={{ width: 100 }}
        />
      </div>
      <Title className="mb-5">Revenue</Title>
      <ResponsiveContainer width="100%" height={543}>
        <AreaChart
          data={selectedValue === "1" ? chartData : chartDataLastyears}
          syncId="anyId"
        >
          <defs>
            <linearGradient id="colorAmt" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00D6FF" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#00D6FF" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis axisLine={false} dataKey="name" />
          <YAxis
            axisLine={false}
            tickFormatter={formatYAxis}
            ticks={[0, 2000, 4000, 6000, 8000, 10000, 12000, 14000]}
            interval={0}
          />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="amt"
            stroke="url(#colorAmt)"
            fill="url(#colorAmt)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;
