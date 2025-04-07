import { useState } from "react";
import { motion } from "framer-motion";
import { RxCross2 } from "react-icons/rx";
import { HiMiniArrowTurnDownLeft } from "react-icons/hi2";

const persianMonths = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
];

const TimeConvert = () => {
  const [selectedDay, setSelectedDay] = useState(18);
  const [selectedMonth, setSelectedMonth] = useState("فروردین");
  const [selectedYear, setSelectedYear] = useState(1404);
  const [showCalendar, setShowCalendar] = useState(false);
  const [converted, setConverted] = useState(false);

  const scrollToCenter = (e, type, values) => {
    const scrollTop = e.target.scrollTop;
    const itemHeight = 28;
    const index = Math.round(scrollTop / itemHeight);
    const value = values[index];

    if (type === "day") setSelectedDay(value);
    else if (type === "month") setSelectedMonth(value);
    else if (type === "year") setSelectedYear(value);
  };

  const renderScrollList = (items, selected, onScroll, type) => (
    <div className="flex-1 relative overflow-hidden">
      <div className="absolute top-1/2 w-full h-8 -translate-y-1/2 bg-primary-100/20 rounded z-10"></div>
      <div
        className="h-32 overflow-y-scroll no-scrollbar text-center py-2"
        onScroll={(e) => scrollToCenter(e, type, items)}
      >
        {items.map((item, index) => (
          <motion.div
            key={index}
            className={`text-sm py-1 ${
              selected === item
                ? "text-primary-600 font-bold"
                : "text-primary-800"
            }`}
            layout
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {item}
          </motion.div>
        ))}
      </div>
    </div>
  );

  const convertResult = ({ day, month, year, setConverted }) => {
    return (
      <div className="flex flex-col justify-between items-center h-full text-sm text-primary-900">
        <div className="w-full flex flex-col mt-2 border-t border-secondary-50">
          <div className="py-2">
            <div className="flex justify-between">
              <div>شمسی</div>
              <div className="flex gap-1 font-bold">
                <span>{day}</span>
                <span>{month}</span>
                <span>{year}</span>
              </div>
            </div>
          </div>

          <div className="py-2">
            <div className="flex justify-between">
              <div>میلادی</div>
              <div className="flex gap-1 font-bold">
                <span>7</span>
                <span>آوریل</span>
                <span>2025</span>
              </div>
            </div>
          </div>

          <div className="text-end font-bold py-2.5 border-b border-secondary-50">
            دوشنبه
          </div>

          <div className="flex justify-between pt-2">
            <span>فاصله زمانی (سن)</span>
            <span className="font-bold">1 روز</span>
          </div>
        </div>

        <div className="w-full px-3">
          <button
            onClick={() => setConverted(false)}
            className="rounded-lg bg-secondary-100 text-primary-900 p-2 w-full flex justify-center items-center gap-2 text-[11px] font-bold"
          >
            <span className="text-primary-400">تبدیل تاریخ جدید</span>
            <div className="border border-secondary-300 bg-secondary-100 p-1 text-xs rounded leading-3">
              N
            </div>
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col justify-between w-full h-full p-4 bg-white rounded-xl shadow-md text-right space-y-4">
      <div className="flex justify-between items-center h-[10%]">
        <span className="text-base text-emerald-700 font-bold">
          تبدیل تاریخ
        </span>
        <button
          className="hover:text-red-600 hover:cursor-pointer transition"
          onClick={() => setShowCalendar(true)}
        >
          <RxCross2 className="w-5 h-5" />
        </button>
      </div>

      {converted === false ? (
        <div className="flex flex-col justify-between w-full h-[85%]">
          <div className="flex justify-between items-center text-sm text-gray-600">
            <span className="text-primary-700">تاریخ مبدا:</span>
            <div className="flex gap-5 w-[62%]">
              <button className="px-2 py-0.5 transition hover:cursor-pointer">
                شمسی
              </button>
              <button className="px-2 py-0.5 transition hover:cursor-pointer">
                میلادی
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between gap-2 h-[70%]">
            {renderScrollList(
              [...Array(31)].map((_, i) => i + 1),
              selectedDay,
              scrollToCenter,
              "day"
            )}
            {renderScrollList(
              persianMonths,
              selectedMonth,
              scrollToCenter,
              "month"
            )}
            {renderScrollList(
              [...Array(121)].map((_, i) => i + 1300),
              selectedYear,
              scrollToCenter,
              "year"
            )}
          </div>

          <button
            className="flex items-center justify-center text-sm font-bold bg-emerald-700 gap-2 py-2 rounded-lg transition hover:cursor-pointer active:scale-95 custom-white-color"
            onClick={() => setConverted(true)}
          >
            <span>تبدیل</span>
            <HiMiniArrowTurnDownLeft className="font-bold w-5 h-5" />
          </button>
        </div>
      ) : (
        <convertResult
          day={selectedDay}
          month={selectedMonth}
          year={selectedYear}
          setConverted={setConverted}
        />
      )}
    </div>
  );
};

export default TimeConvert;
