import React, { useContext, useEffect, useState } from "react";
import Card from "./Card";
import Chart from "./Chart";
import Header from "./Header";
import Details from "./Details";
import Overview from "./Overview";
import ThemeContext from "../context/ThemeContext";
import stockContext from "../context/StockContext";
import {
  fetchStockDetails,
  fetchQuote,
  fetchVantageStockDetails,
} from "../api/stockApi";

const Dashboard = () => {
  const { darkMode } = useContext(ThemeContext);
  const { stockSymbol } = useContext(stockContext);

  const [stockDetails, setStockDetails] = useState({});
  const [stockQuote, setStockQuote] = useState({});

  useEffect(() => {
    const updateStockDetails = async () => {
      try {
        const result = await fetchStockDetails(stockSymbol);
        setStockDetails(result);
        //(result);
      } catch (error) {
        setStockDetails({});
        //(`Error encountered in fetching Stock Details: ${error}`);
      }
    };

    const updateStockOverview = async () => {
      try {
        const result = await fetchQuote(stockSymbol);
        setStockQuote(result);
      } catch (error) {
        setStockQuote({});
        //(error);
      }
    };

    updateStockDetails();
    updateStockOverview();
  }, [stockSymbol]);
  return (
    <div
      className={`h-screen grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 grid-rows-8 md:grid-rows-7 xl:grid-rows-5 auto-rows-fr gap-6 p-10 font-quicksand ${
        darkMode ? "bg-gray-900 text-gray-300" : "bg-neutral-100"
      }`}
    >
      <div className="col-span-1 md:col-span-2 xl:col-span-3 row-span-1 flex justify-start items-center">
        <Header name={stockDetails.name} />
      </div>

      <div className="md:col-span-2 row-span-4">
        <Chart />
      </div>
      <div>
        <Overview
          symbol={stockSymbol}
          price={stockQuote.pc}
          change={stockQuote.d}
          changePercent={stockQuote.dp}
          currency={stockDetails.currency}
        />
      </div>
      <div className="row-span-2 xl:row-span-3">
        <Card>
          <Details details={stockDetails} />
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
