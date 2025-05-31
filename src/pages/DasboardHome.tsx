import React from "react";
import RevenueChart from "../component/dashHome/RevenuuesChart";
import Status from "../component/dashHome/Status";
import { useDeshboardGetQuery } from "../redux/dashboardFeatures/Deshboard/deshboardApiSlice";
import { Skeleton } from "antd";
type Props = {};

const DasboardHome = (props: Props) => {
  const {
    data: deshboardData,
    isFetching,
    isLoading,
  } = useDeshboardGetQuery({});
  return (
    <>
      <Status data={deshboardData} isLoading={isLoading} />
      <RevenueChart dataChart={deshboardData} />
    </>
  );
};

export default DasboardHome;
