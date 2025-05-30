import React from "react";
import RevenueChart from "../component/dashHome/RevenuuesChart";
import Status from "../component/dashHome/Status";
import { useDeshboardGetQuery } from "../redux/dashboardFeatures/Deshboard/deshboardApiSlice";
import { Skeleton } from "antd";
type Props = {};

const DasboardHome = (props: Props) => {
  const { data, isFetching, isLoading } = useDeshboardGetQuery({});
  return (
    <>
      {isLoading ? <Skeleton active /> : <Status data={data} />}
      <RevenueChart />
    </>
  );
};

export default DasboardHome;
