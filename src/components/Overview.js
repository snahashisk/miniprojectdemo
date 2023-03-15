import React from "react";
import Card from "./Card";

const Overview = ({ symbol, price, change, changePercent, currency }) => {
  return (
    <Card>
      <span className="absolute top-2 left-2 text-blue-500 text-sm font-bold">
        {symbol}
      </span>
      <div className="w-full h-full flex items-center justify-around">
        <span className="flex text-lg xl:text-xl 2xl:text-2xl items-center">
          ${price}
          <span className="text-neutral-400 text-sm m-2">{currency}</span>
        </span>
        <span
          className={`text-lg xl:text-xl 2xl:text-2xl ${
            change > 0 ? "text-lime-500" : "text-red-500"
          }`}
        >
          {change}
          <span> ({changePercent}%)</span>
        </span>
      </div>
    </Card>
  );
};

export default Overview;
