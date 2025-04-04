import { useState, useEffect } from "react";
import axios from "axios";
import moment from "jalali-moment";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { motion } from "framer-motion"; // اضافه کردن Framer Motion

const PersianCalendar = () => {
  const [currentDate, setCurrentDate] = useState(moment().locale("fa"));
  const [occasions, setOccasions] = useState([]);

  const today = moment().locale("fa").startOf("day");
  const firstDayOfMonth = moment(currentDate).startOf("jMonth").day();
  const daysInMonth = moment(currentDate).jDaysInMonth();
  const weekdays = ["ش", "ی", "د", "س", "چ", "پ", "ج"];

  const toPersianNumber = (num) => {
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return String(num)
      .split("")
      .map((digit) => persianDigits[digit] || digit)
      .join("");
  };

  const changeMonth = (step) => {
    const newDate = moment(currentDate).add(step, "jMonth");
    setCurrentDate(newDate);
  };

  useEffect(() => {
    const fetchHolidays = async () => {
      const year = currentDate.locale("en").format("YYYY");

      try {
        const { data } = await axios.get(
          "https://calendarific.com/api/v2/holidays",
          {
            params: {
              api_key: "jPBda2gRjih0nwT2qfPK0NVjQOIQyOGs",
              country: "IR",
              year,
              type: "national",
            },
          }
        );

        const holidays = data.response.holidays.map((holiday) => ({
          name: holiday.name,
          date: moment(holiday.date.iso),
        }));

        setOccasions(holidays);
      } catch (error) {
        console.error("Error fetching holidays:", error);
        setOccasions([]);
      }
    };

    fetchHolidays();
  }, [currentDate]);

  const isOccasion = (day) => {
    const date = moment(currentDate)
      .jDate(day + 1)
      .locale("en");
    return occasions.find(
      (o) =>
        o.date.jYear() === date.jYear() &&
        o.date.jMonth() === date.jMonth() &&
        o.date.jDate() === date.jDate()
    );
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

        <motion.h2
          className="text-xl font-bold text-emerald-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {currentDate.clone().locale("fa").format("jMMMM")}{" "}
          {toPersianNumber(currentDate.format("jYYYY"))}
        </motion.h2>

        <button
          onClick={() => changeMonth(1)}
          className="bg-emerald-600 p-2 rounded-xl hover:cursor-pointer"
        >
          <MdKeyboardArrowLeft className="text-xl custom-white-color" />
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
          const jDate = moment(currentDate).jDate(day + 1);
          const isToday = jDate.isSame(today, "day");
          const occasion = isOccasion(day);
          const weekDay = jDate.day();

          return (
            <motion.div
              key={day}
              title={occasion?.name || ""}
              className={`sm:text-[1rem] text-lg sm:p-1.5 p-2 rounded-lg cursor-pointer
                ${isToday ? "font-bold bg-emerald-600 custom-white-color" : ""}
                ${
                  occasion
                    ? "text-red-800 font-semibold custom-redLess-bg"
                    : weekDay === 6
                    ? "text-red-500 font-semibold"
                    : "hover:bg-gray-200"
                }
              `}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * day }}
            >
              {toPersianNumber(day + 1)}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default PersianCalendar;
