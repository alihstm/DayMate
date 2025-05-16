import { useEffect, useState } from "react";
import axios from "axios";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";

import usFlag from "../../assets/Material/us.svg";
import euFlag from "../../assets/Material/eu.svg";
import goldIcon from "../../assets/Material/gold.svg";
import gbFlag from "../../assets/Material/gb.svg";
import caFlag from "../../assets/Material/ca.svg";
import auFlag from "../../assets/Material/au.svg";
import chFlag from "../../assets/Material/ch.svg";
import trFlag from "../../assets/Material/tr.svg";
import btcIcon from "../../assets/Material/btc.svg";
import ethIcon from "../../assets/Material/eth.svg";

const availableCurrencies = {
  usd: "US Dollar",
  eur: "Euro",
  gold_18: "18K Gold",
  gbp: "British Pound",
  cad: "Canadian Dollar",
  aud: "Australian Dollar",
  chf: "Swiss Franc",
  try: "Turkish Lira",
  btc: "Bitcoin",
  eth: "Ethereum",
};

const defaultCurrencies = ["usd", "eur", "gbp"];

const currencyIcons = {
  usd: <img src={usFlag} alt="USD" className="w-8 h-5 object-contain" />,
  eur: <img src={euFlag} alt="EUR" className="w-8 h-5 object-contain" />,
  gold_18: <img src={goldIcon} alt="GOLD" className="w-8 h-5 object-contain" />,
  gbp: <img src={gbFlag} alt="GBP" className="w-8 h-5 object-contain" />,
  cad: <img src={caFlag} alt="CAD" className="w-8 h-5 object-contain" />,
  aud: <img src={auFlag} alt="AUD" className="w-8 h-5 object-contain" />,
  chf: <img src={chFlag} alt="CHF" className="w-8 h-5 object-contain" />,
  try: <img src={trFlag} alt="TRY" className="w-8 h-5 object-contain" />,
  btc: <img src={btcIcon} alt="BTC" className="w-8 h-5 object-contain" />,
  eth: <img src={ethIcon} alt="ETH" className="w-8 h-5 object-contain" />,
};

const toPersianDigits = (num) => {
  return num?.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);
};

const Currency = () => {
  const [data, setData] = useState({});
  const [prevData, setPrevData] = useState({});
  const [selectedCurrencies, setSelectedCurrencies] =
    useState(defaultCurrencies);
  const [showCurrencySelector, setShowCurrencySelector] = useState(false);

  const API_URL = import.meta.env.VITE_CURRENCY_API_URL;
  const API_KEY = import.meta.env.VITE_CURRENCY_API_KEY;

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data from:", API_URL);
        console.log("Using API key:", API_KEY);

        const res = await axios.get(`${API_URL}?api_key=${API_KEY}`);
        console.log("API Response:", res.data);

        if (Object.keys(data).length > 0) {
          setPrevData(data);
        }
        setData(res.data);
      } catch (err) {
        console.error("Error fetching currency data:", err);
      }
    };

    fetchData();

    const interval = setInterval(fetchData, 30000);

    return () => clearInterval(interval);
  }, [API_URL, API_KEY]);

  useEffect(() => {
    console.log("Current data:", data);
    console.log("Selected currencies:", selectedCurrencies);
  }, [data, selectedCurrencies]);

  const getChangeIcon = (currencyKey) => {
    const currentValue = data[currencyKey]?.value;
    const prevValue = prevData[currencyKey]?.value;

    if (currentValue && prevValue) {
      const change = currentValue - prevValue;
      if (change > 0) return <FaArrowUp className="text-green-500" />;
      if (change < 0) return <FaArrowDown className="text-red-500" />;
    }
    return null;
  };

  const handleAddCurrency = (currencyKey) => {
    if (!selectedCurrencies.includes(currencyKey)) {
      setSelectedCurrencies([...selectedCurrencies, currencyKey]);
    }
    setShowCurrencySelector(false);
  };

  const handleRemoveCurrency = (currencyKey) => {
    setSelectedCurrencies(selectedCurrencies.filter((c) => c !== currencyKey));
  };

  const availableCurrenciesToAdd = Object.keys(availableCurrencies).filter(
    (currency) => !selectedCurrencies.includes(currency)
  );

  const formatNumber = (num) => {
    if (num == null) return "";

    const formatted = new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 2, // فقط اگه اعشار داشت، نشون بده
    }).format(num);

    return formatted.replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]).replace(/,/g, "٬");
  };

  return (
    <section className="flex flex-col items-center justify-start sm:w-[55%] w-full h-full rounded-2xl shadow-md p-2 overflow-y-auto custom-whiteLess-bg">
      <ul className="flex flex-col w-full gap-y-2">
        {selectedCurrencies.map((currencyKey) => {
          const value = data[currencyKey]?.value;
          return (
            <li
              key={currencyKey}
              onClick={() => handleRemoveCurrency(currencyKey)}
              className="flex justify-between items-center text-sm bg-sky-50 border border-gray-300 rounded-lg px-3 py-2 
                hover:bg-red-50 transition-colors duration-200 cursor-pointer"
              title="Click to remove"
            >
              <div className="flex flex-col items-end">
                <span className="text-sm font-medium">
                  {formatNumber(value)}
                </span>
                {getChangeIcon(currencyKey)}
              </div>

              <div className="flex flex-row items-center gap-2">
                <span className="text-xs text-gray-500 font-semibold mt-[2px]">
                  {currencyKey.toUpperCase()}
                </span>

                <span className="font-bold text-gray-600">
                  {availableCurrencies[currencyKey]}
                </span>

                {currencyIcons[currencyKey]}
              </div>
            </li>
          );
        })}

        {showCurrencySelector && availableCurrenciesToAdd.length > 0 && (
          <div className="flex flex-col gap-2 bg-white p-3 rounded-lg border border-gray-300">
            {availableCurrenciesToAdd.map((currency) => (
              <button
                key={currency}
                onClick={() => handleAddCurrency(currency)}
                className="flex items-center justify-between p-2 hover:bg-gray-100 rounded-md transition"
              >
                <span className="text-sm font-medium">
                  {availableCurrencies[currency]}
                </span>
                {currencyIcons[currency]}
              </button>
            ))}
          </div>
        )}

        <button
          onClick={() => setShowCurrencySelector(!showCurrencySelector)}
          className="flex flex-row items-center h-10 text-sm font-bold text-gray-600 bg-gray-100 border border-gray-300 px-3 gap-2 rounded-lg shadow-md transition hover:scale-105 hover:cursor-pointer hover:bg-gray-200"
        >
          <FaCirclePlus className="text-gray-500 w-4 h-4" />
          افزودن ارز
        </button>
      </ul>
    </section>
  );
};

export default Currency;
