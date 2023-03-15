import React, { useState, useContext, useEffect } from "react";
import ChartFilter from "./ChartFilter";
import { chartConfig } from "../constants/config";
import Card from "./Card";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  conertUnixTimeStampToDate,
  convertDateToUnixTimeStamp,
  createDate,
} from "../helpers/date-helper";
import ThemeContext from "../context/ThemeContext";
import { fetchHistoricalData } from "../api/stockApi";
import stockContext from "../context/StockContext";

const Chart = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("1Y");

  const formatData = (data) => {
    return data.c.map((item, index) => {
      return {
        value: item.toFixed(2),
        date: conertUnixTimeStampToDate(data.t[index]),
      };
    });
  };

  const { darkMode } = useContext(ThemeContext);
  const { stockSymbol } = useContext(stockContext);

  useEffect(() => {
    //Fetching historical data
    const getDateRange = () => {
      const { days, weeks, months, years } = chartConfig[filter];
      const endDate = new Date();
      const startDate = createDate(endDate, -days, -weeks, -months, -years);
      const startTimeStamUnix = convertDateToUnixTimeStamp(startDate);
      const endTimeStampUnix = convertDateToUnixTimeStamp(endDate);
      return { startTimeStamUnix, endTimeStampUnix };
    };

    const updateChartData = async () => {
      try {
        const { startTimeStamUnix, endTimeStampUnix } = getDateRange();
        const resolution = chartConfig[filter].resolution;
        const result = await fetchHistoricalData(
          stockSymbol,
          resolution,
          startTimeStamUnix,
          endTimeStampUnix
        );

        setData(formatData(result));
      } catch (error) {
        setData([]);
        //(error);
      }
    };

    updateChartData();
  }, [stockSymbol, filter]);

  return (
    <Card>
      <ul className="flex absolute top-2 right-2 z-40">
        {Object.keys(chartConfig).map((item, index) => {
          return (
            <li key={item}>
              <ChartFilter
                text={item}
                active={filter === item}
                onClick={() => {
                  setFilter(item);
                }}
              />
            </li>
          );
        })}
      </ul>
      <ResponsiveContainer>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="chartColor" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor={`${darkMode ? "#FFEA20" : "rgb(199 210 254)"}`}
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor={`${darkMode ? "#FFEA20" : "rgb(199 210 254)"}`}
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="value"
            stroke="#312e81"
            fillOpacity={1}
            fill="url(#chartColor)"
            strokeWidth={0.5}
          />
          <Tooltip
            contentStyle={darkMode ? { backgroundColor: "#111827" } : null}
            itemStyle={darkMode ? { color: "#818cf8" } : null}
          />
          <XAxis dataKey={"date"} />
          <YAxis domain={["dataMin", "dataMax"]} />;
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default Chart;
