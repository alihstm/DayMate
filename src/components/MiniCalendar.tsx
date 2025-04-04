import { useState, useEffect, useRef } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  isToday,
} from "date-fns";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTheme } from "../contexts/ThemeContext";
import { useTranslation } from "react-i18next";
import { useDatePicker } from "../contexts/DatePickerContext";

interface MiniCalendarProps {
  onSelectDate: (date: Date) => void;
  selectedDate: Date | null;
  onClose: () => void;
}

const MiniCalendar = ({
  onSelectDate,
  selectedDate,
  onClose,
}: MiniCalendarProps) => {
  const { isDarkMode } = useTheme();
  const { t } = useTranslation();
  const { locale } = useDatePicker();
  const calendarRef = useRef<HTMLDivElement>(null);

  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  return (
    <div
      ref={calendarRef}
      className={`absolute z-50 p-4 rounded-lg shadow-lg ${
        isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
      }`}
    >
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={prevMonth}
          className={`p-2 rounded-full hover:bg-opacity-10 hover:bg-white transition-colors`}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <span className="font-medium">
          {format(currentMonth, "MMMM yyyy", { locale })}
        </span>
        <button
          onClick={nextMonth}
          className={`p-2 rounded-full hover:bg-opacity-10 hover:bg-white transition-colors`}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-2">
        {["ش", "ی", "د", "س", "چ", "پ", "ج"].map((day) => (
          <div
            key={day}
            className="text-center text-sm font-medium text-gray-500"
          >
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => {
          const isSelected = selectedDate && isSameDay(day, selectedDate);
          const isCurrentDay = isToday(day);
          const isCurrentMonth = isSameMonth(day, currentMonth);

          return (
            <button
              key={index}
              onClick={() => {
                onSelectDate(day);
                onClose();
              }}
              className={`
                w-8 h-8 rounded-full text-sm
                ${isSelected ? "bg-blue-500 text-white" : ""}
                ${!isCurrentMonth ? "text-gray-400" : ""}
                ${isCurrentDay && !isSelected ? "border-2 border-blue-500" : ""}
                hover:bg-opacity-10 hover:bg-white transition-colors
              `}
            >
              {format(day, "d")}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MiniCalendar;
