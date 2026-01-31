import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { convertToUnixTimestamp } from "./ConvertToChartData";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { fetchMarketChart } from "@/Redux/Coin/Action";
import SpinnerBackdrop from "@/components/custome/SpinnerBackdrop";

const timeSeries = [
  {
    keyword: "DIGITAL_CURRENCY_DAILY",
    key: "Time Series (Daily)",
    lable: "1 Day",
    value: 1,
  },
  {
    keyword: "DIGITAL_CURRENCY_WEEKLY",
    key: "Weekly Time Series",
    lable: "1 Week",
    value: 7,
  },
  {
    keyword: "DIGITAL_CURRENCY_MONTHLY",
    key: "Monthly Time Series",
    lable: "1 Month",
    value: 30,
  },
  {
    keyword: "DIGITAL_CURRENCY_MONTHLY_3",
    key: "3 Month Time Series",
    lable: "3 Month",
    value: 90,
  },
  {
    keyword: "DIGITAL_CURRENCY_MONTHLY_6",
    key: "6 Month Time Series",
    lable: "6 Month",
    value: 180,
  },
  {
    keyword: "DIGITAL_CURRENCY_YEARLY",
    key: "Yearly Time Series",
    lable: "1 year",
    value: 365,
  },
];
const StockChart = ({ coinId }) => {
  const [stockData, setStockData] = useState(null);
  const [activeType, setActiveType] = useState(timeSeries[0]);
  const [loading, setLoading] = useState(false);
  const { coin,auth } = useSelector((store) => store);
  const dispatch = useDispatch();
  const series = [
    {
      data: coin.marketChart.data,
    },
  ];

  const [options] = useState({
    chart: {
      id: "area-datetime",
      type: "area",
      height: 450,
      zoom: {
        autoScaleYaxis: true,
        enabled: true,
      },
      toolbar: {
        show: true,
        tools: {
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true,
        },
      },
      background: "transparent",
    },
    annotations: {
      // your annotations
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 2,
      colors: ["#f43f5e"], // Rose color
    },
    xaxis: {
      type: "datetime",
      tickAmount: 6,
      labels: {
        style: {
          colors: "#9ca3af",
          fontSize: "12px",
        },
      },
      axisBorder: {
        color: "#374151",
      },
      axisTicks: {
        color: "#374151",
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#9ca3af",
          fontSize: "12px",
        },
        formatter: function (val) {
          return "$" + val.toLocaleString();
        },
      },
    },
    colors: ["#f43f5e"], // Rose line color (can be changed to gradient)
    markers: {
      colors: ["#f43f5e"],
      strokeColors: "#f43f5e",
      strokeWidth: 2,
      size: 0,
      style: "hollow",
    },
    tooltip: {
      theme: "dark",
      style: {
        fontSize: "12px",
      },
      y: {
        formatter: function (val) {
          return "$" + val.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 });
        },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0.1,
        stops: [0, 100],
        colorStops: [
          {
            offset: 0,
            color: "#f43f5e",
            opacity: 0.4,
          },
          {
            offset: 50,
            color: "#22d3ee",
            opacity: 0.3,
          },
          {
            offset: 100,
            color: "#22d3ee",
            opacity: 0.1,
          },
        ],
      },
    },
    grid: {
      borderColor: "#374151",
      strokeDashArray: 4,
      show: true,
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
  });

  useEffect(() => {
    // const fetchStockData = async () => {
    //   setLoading(true);
    //   setStockData(null)
    //   const data = await fetchData(activeType.keyword, coinId );
    //   console.log("stock data ", data);
    //   const chartData = convertToUnixTimestamp(data[activeType.key]);
    //   console.log("chartData ", chartData);
    //   setStockData(chartData);
    //   setLoading(false);
    // };
    // fetchStockData();
    if (coinId) {
      dispatch(fetchMarketChart({ coinId, days: activeType.value,jwt:localStorage.getItem("jwt") || auth.jwt }));
    }
  }, [coinId,activeType.value]);

  if (coin.marketChart.loading) {
    return (
      <div className="h-full w-full inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-50">
        <div className="w-16 h-16 border-4 border-t-4 border-t-gray-200 border-gray-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  console.log("coin reducer", coin);

  return (
    <div>
      <div id="charts">
        <div className="mb-6 flex flex-wrap gap-2">
          {timeSeries.map((item) => (
            <Button
              onClick={() => setActiveType(item)}
              key={item.lable}
              className={`h-9 rounded-full px-4 text-xs font-semibold transition-all ${
                activeType.lable === item.lable
                  ? "bg-gradient-to-r from-rose-500 via-emerald-500 to-cyan-500 text-black shadow-lg shadow-rose-500/30 hover:shadow-xl"
                  : "border-slate-700 bg-black/60 text-slate-300 hover:bg-black/80 hover:border-rose-500/50"
              }`}
              variant={activeType.lable !== item.lable ? "outline" : "default"}
            >
              {item.lable}
            </Button>
          ))}
        </div>
        <div id="chart-timelines">
          <ReactApexChart
            options={options}
            series={series}
            type="area"
            height={450}
          />
        </div>
      </div>
    </div>
  );
};

export default StockChart;
