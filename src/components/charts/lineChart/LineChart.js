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
  const axes = React.useMemo(
    () => [
      {
        primary: true,
        type: "ordinal",
        position: "bottom",
        //format: (tick) => `My Prefix ${tick}`,
      },
      { type: "linear", position: "left" },
    ],
    []
  );

  return (
    <div
      style={{
        margin: "0 auto",
        width: "98%",
        height: "400px",
      }}
    >
      <Chart data={memoizedData} axes={axes} secondaryCursor />
    </div>
  );
}
