import React, { useState } from "react";
import Dashboard from "./components/Dashboard";
import ThemeContext from "./context/ThemeContext";
import stockContext from "./context/StockContext";
const App = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [stockSymbol, setStockSymbol] = useState("MSFT");
  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      <stockContext.Provider value={{ stockSymbol, setStockSymbol }}>
        <Dashboard />;
      </stockContext.Provider>
    </ThemeContext.Provider>
  );
};

export default App;
// npx tailwindcss -i ./src/input.css -o ./src/output.css --watch
//npm start
