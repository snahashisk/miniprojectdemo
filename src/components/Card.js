import React, { useContext } from "react";
import ThemeContext from "../context/ThemeContext";

const Card = ({ children }) => {
  const { darkMode } = useContext(ThemeContext);
  return (
    <div
      className={`w-full h-full rounded-md relative p-2 ${
        darkMode ? "bg-gray-800" : "bg-slate-300"
      }`}
    >
      {children}
    </div>
  );
};

export default Card;
