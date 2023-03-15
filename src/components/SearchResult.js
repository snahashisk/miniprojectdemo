import React, { useContext } from "react";
import ThemeContext from "../context/ThemeContext";
import stockContext from "../context/StockContext";

const SearchResult = ({ results }) => {
  const { darkMode } = useContext(ThemeContext);
  const { setStockSymbol } = useContext(stockContext);
  return (
    <ul
      className={`absolute top-12 rounded-md h-64 w-96 overflow-y-scroll z-60 custom-scrollbar ${
        darkMode ? "bg-gray-900" : " bg-white  border-neutral-200 border-2"
      }`}
    >
      {results.map((item) => {
        return (
          <li
            className={`cursor-pointer p-4 m-2 flex items-center justify-between rounded-md ${
              darkMode ? "hover:bg-indigo-600" : "hover:bg-indigo-200 "
            }`}
            onClick={() => {
              setStockSymbol(item.symbol);
            }}
          >
            <span>{item.symbol}</span>
            <span>{item.description}</span>
          </li>
        );
      })}
    </ul>
  );
};

export default SearchResult;
