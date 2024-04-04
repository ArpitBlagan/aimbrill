import { useEffect, useState } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { LineChart } from "@mui/x-charts/LineChart";
import { PieChart } from "@mui/x-charts/PieChart";
import toast from "react-hot-toast";
const Chart = ({ field, chartType, data }: any) => {
  const [arr, setArr] = useState<any[] | null>(null);
  useEffect(() => {
    const getData = async () => {
      const ff = data.map((ee: any) => ee[field]);
      if (typeof ff[0] != "number") {
        toast.error(
          `This field ${field} is not number so we can't create chart out of it!`
        );
        return;
      }
      setArr(() => ff);
    };
    getData();
  }, [field, chartType]);
  return (
    <div>
      {chartType}
      {chartType == "Pie Chart" && arr && (
        <PieChart
          series={[
            {
              data: arr.map((ee) => {
                return { value: ee };
              }),
            },
          ]}
          width={500}
          height={300}
        />
      )}
      {chartType == "Line Chart" && arr && (
        <LineChart
          xAxis={[{ data: arr }]}
          series={[
            {
              data: arr,
            },
          ]}
          width={500}
          height={300}
        />
      )}
      {chartType == "Bar Chart" && arr && (
        <BarChart
          width={500}
          height={300}
          series={[{ data: arr }]}
          xAxis={[{ scaleType: "band", data: arr }]}
        />
      )}
    </div>
  );
};

export default Chart;
