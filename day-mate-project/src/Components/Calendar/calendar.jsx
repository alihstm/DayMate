import { useState } from "react";
import moment from "jalali-moment";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";

const PersianCalendar = () => {
  // State to track the current displayed month
  const [currentDate, setCurrentDate] = useState(moment().locale("fa"));

  // Get month details
  const firstDayOfMonth = moment(currentDate).startOf("jMonth").day(); // 0 = Saturday
  const daysInMonth = moment(currentDate).jDaysInMonth();
  const today = moment().locale("fa").startOf("day"); // Today's Persian date

  // Persian week names (Saturday to Friday)
  const weekdays = ["ش", "ی", "د", "س", "چ", "پ", "ج"];

  // Add number converter function
  const toPersianNumber = (num) => {
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return String(num)
      .split("")
      .map((digit) => persianDigits[digit] || digit)
      .join("");
  };

  // Change month
  const changeMonth = (step) => {
    setCurrentDate(moment(currentDate).add(step, "jMonth"));
  };

  return (
    <div className="flex flex-col items-center w-full h-[52%] p-4 rounded-2xl shadow-lg text-center custom-whiteLess-bg">
      <div className="flex items-center justify-between w-full">
        <button
          onClick={() => changeMonth(-1)}
          className="bg-emerald-600 p-2 rounded-xl hover:cursor-pointer"
        >
          <MdKeyboardArrowRight className="text-xl custom-white-color" />
        </button>
        <h2 className="text-xl font-bold text-emerald-600">
          {currentDate.format("jMMMM")}{" "}
          {toPersianNumber(currentDate.format("jYYYY"))}
        </h2>
        <button
          onClick={() => changeMonth(1)}
          className="bg-emerald-600 p-2 rounded-xl hover:cursor-pointer"
        >
          <MdKeyboardArrowLeft className="text-xl hover:cursor-pointer custom-white-color" />
        </button>
      </div>

      <div className="font-bold grid grid-cols-7 w-full border-b pb-1.5">
        {weekdays.map((day, index) => (
          <div key={index} className="text-gray-500 py-2">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-0.5 py-0.5 w-full text-center custom-mt-2">
        {Array.from({ length: firstDayOfMonth }).map((_, index) => (
          <div key={index} className="p-2"></div>
        ))}

        {Array.from({ length: daysInMonth }).map((_, day) => {
          const date = moment(currentDate).jDate(day + 1);
          const isToday = date.isSame(today, "day");

          return (
            <div
              key={day}
              className={`sm:text-[1rem] text-lg sm:p-1.5 p-2 rounded-lg cursor-pointer ${
                isToday
                  ? "font-bold bg-emerald-600 custom-white-color"
                  : "hover:bg-gray-200"
              }`}
            >
              {toPersianNumber(day + 1)}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PersianCalendar;
