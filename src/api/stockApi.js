const basePath = "https://finnhub.io/api/v1";
const vantageBasePath = "//https://www.alphavantage.co/";
export const searchSymbols = async (query) => {
  const url = `${basePath}/search?q=${query}&token=${process.env.REACT_APP_API_KEY}`;
  // //(url);
  const response = await fetch(url);
  if (!response.ok) {
    const message = `An error has been occured: ${response.status}`;
    throw new Error(message);
  }
  return await response.json();
};

// Fetching Stock Details
export const fetchStockDetails = async (stockSymbol) => {
  const url = `${basePath}/stock/profile2?symbol=${stockSymbol}&token=${process.env.REACT_APP_API_KEY}`;
  const response = await fetch(url);
  // //(url);
  //(response);
  if (!response.ok) {
    const message = `An error has been occured in fetching the stock details: ${response.status}`;
    throw new Error(message);
  }
  return await response.json();
};

//Fetching Stock Data with Vantage API Key
//https://www.alphavantage.co/query?function=OVERVIEW&symbol=IBM&apikey=demo
//This is my try to access the stock data in easy and efficient manner
export const fetchVantageStockDetails = async (stockSymbol) => {
  const url = `${vantageBasePath}query?function=OVERVIEW&symbol=${stockSymbol}&apikey=${process.env.REACT_VANTAGE_API_KEY}`;
  const response = await fetch(url);

  if (!response.ok) {
    const message = `An error has been occured in fetching the stock details: ${response.status}`;
    throw new Error(message);
  }
  return await response.json();
};

//FETCHING STOCK QUOTE DATA
export const fetchQuote = async (stockSymbol) => {
  const url = `${basePath}/quote?symbol=${stockSymbol}&token=${process.env.REACT_APP_API_KEY}`;
  const response = await fetch(url);

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }

  return await response.json();
};

export const fetchHistoricalData = async (
  stockSymbol,
  resolution,
  from,
  to
) => {
  const url = `${basePath}/stock/candle?symbol=${stockSymbol}&resolution=${resolution}&from=${from}$to=${to}&token=${process.env.REACT_APP_API_KEY}`;
  // console.log(url);
  const response = await fetch(url);

  if (!response.ok) {
    const message = `An error has been occured in fetching the historical data: ${response.status}`;
    throw new Error(message);
  }

  return await response.json();
};
