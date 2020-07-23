import React from "react";
import { Chart } from "react-charts";

export default function LineChart({ data }) {
  const memoizedData = React.useMemo(
    () => [
      {
        label: "Votes",
        data,
      },
    ],
    [data]
  );
  const axes = React.useMemo(() => [
    {
      primary: true,
      type: "ordinal",
      position: "bottom",
    },
    { type: "linear", position: "left" },
  ]);

  return (
    <div
      style={{
        width: "100%",
        height: "300px",
      }}
    >
      <Chart data={memoizedData} axes={axes} secondaryCursor />
    </div>
  );
}
