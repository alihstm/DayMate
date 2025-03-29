import { useState, useEffect } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { IoIosPause } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import cloudy from "../../assets/Material/cloudy.png";
import clearNight from "../../assets/Material/clear-night.png";

const Weather = () => {
  const [iranTime, setIranTime] = useState("");
  const [iranDate, setIranDate] = useState("");
  const [gregorianDate, setGregorianDate] = useState("");
  const [hijriDate, setHijriDate] = useState("");
  const [activeButton, setActiveButton] = useState(null);

  const convertToPersianNumbers = (text) => {
    const persianNumbers = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return text.replace(/[0-9]/g, (d) => persianNumbers[d]);
  };

  const getPersianDate = () => {
    const persianWeekDays = [
      "یکشنبه",
      "دوشنبه",
      "سه‌شنبه",
      "چهارشنبه",
      "پنجشنبه",
      "جمعه",
      "شنبه",
    ];
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

    const date = new Date();
    const options = { timeZone: "Asia/Tehran" };

    const weekday = new Intl.DateTimeFormat("fa-IR", {
      ...options,
      weekday: "long",
    }).format(date);
    const month = new Intl.DateTimeFormat("fa-IR", {
      ...options,
      month: "numeric",
    }).format(date);
    const day = new Intl.DateTimeFormat("fa-IR", {
      ...options,
      day: "numeric",
    }).format(date);

    const persianToEnglish = (str) => {
      const persianNumbers = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
      return str.replace(/[۰-۹]/g, (d) => persianNumbers.indexOf(d));
    };

    const monthIndex = parseInt(persianToEnglish(month)) - 1;

    return `${weekday} ${convertToPersianNumbers(day)} ${
      persianMonths[monthIndex]
    }`;
  };

  const getGregorianDate = () => {
    const date = new Date();
    const options = {
      timeZone: "Asia/Tehran",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  const getHijriDate = () => {
    const date = new Date();
    const options = {
      timeZone: "Asia/Tehran",
      calendar: "islamic",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Intl.DateTimeFormat("ar-SA-u-ca-islamic", options).format(date);
  };

  useEffect(() => {
    const updateTime = () => {
      const time = new Date().toLocaleTimeString("en-US", {
        timeZone: "Asia/Tehran",
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
      });
      setIranTime(convertToPersianNumbers(time));
      setIranDate(getPersianDate());
      setGregorianDate(getGregorianDate());
      setHijriDate(getHijriDate());
    };

    updateTime();

    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleButtonClick = (button) => {
    setActiveButton(activeButton === button ? null : button);
  };

  const Timer = (hour, minute, second) => {
    const [hours, setHours] = useState(hour);
    const [minutes, setMinutes] = useState(minute);
    const [seconds, setSeconds] = useState(second);
    const [isRunning, setIsRunning] = useState(false);

    const handleInputChange = (e, setter) => {
      const value = Math.min(Math.max(0, parseInt(e.target.value) || 0), 59);
      setter(value);
    };

    const handleReset = () => {
      setHours(0);
      setMinutes(0);
      setSeconds(0);
      setIsRunning(false);
    };

    const handleStartStop = () => {
      setIsRunning(!isRunning);
    };

    useEffect(() => {
      let interval;
      if (isRunning) {
        interval = setInterval(() => {
          if (seconds > 0) {
            setSeconds(seconds - 1);
          } else if (minutes > 0) {
            setMinutes(minutes - 1);
            setSeconds(59);
          } else if (hours > 0) {
            setHours(hours - 1);
            setMinutes(59);
            setSeconds(59);
          } else {
            setIsRunning(false);
          }
        }, 1000);
      }
      return () => clearInterval(interval);
    }, [hours, minutes, seconds, isRunning]);

    return (
      <div className="flex flex-col items-center justify-between pb-3 w-full h-[100%]">
        <div className="flex flex-row items-center justify-between w-[70%] h-[70%]">
          <div className="flex flex-col items-center justify-center gap-1">
            <input
              type="number"
              value={convertToPersianNumbers(String(seconds).padStart(2, "0"))}
              placeholder="۰۰"
              onChange={(e) => handleInputChange(e, setSeconds)}
              min="0"
              max="59"
              disabled={isRunning}
              className="text-center text-2xl font-bold px-1 py-1 rounded-md placeholder:text-black placeholder:text-2xl placeholder:text-center outline-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none custom-lightGray-bg"
              style={{ direction: "ltr" }}
            />
            <p className="text-gray-500 text-xs">ثانیه</p>
          </div>

          <div className="flex flex-col items-center justify-center gap-1">
            <input
              type="number"
              value={convertToPersianNumbers(String(minutes).padStart(2, "0"))}
              placeholder="۰۰"
              onChange={(e) => handleInputChange(e, setMinutes)}
              min="0"
              max="59"
              disabled={isRunning}
              className="text-center text-2xl font-bold px-2 py-1 rounded-md placeholder:text-black placeholder:text-2xl placeholder:text-center outline-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none custom-lightGray-bg"
              style={{ direction: "ltr" }}
            />
            <p className="text-gray-500 text-xs">دقیقه</p>
          </div>

          <div className="flex flex-col items-center justify-center gap-1">
            <input
              type="number"
              value={convertToPersianNumbers(String(hours).padStart(2, "0"))}
              placeholder="۰۰"
              onChange={(e) => handleInputChange(e, setHours)}
              min="0"
              max="23"
              disabled={isRunning}
              className="text-center text-2xl font-bold px-2 py-1 rounded-md placeholder:text-black placeholder:text-2xl placeholder:text-center outline-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none custom-lightGray-bg"
              style={{ direction: "ltr" }}
            />
            <p className="text-gray-500 text-xs">ساعت</p>
          </div>
        </div>

        <div className="flex flex-row items-center justify-center gap-2 h-[25%]">
          <button
            onClick={handleStartStop}
            className="flex flex-row items-center justify-center gap-0.5 text-sm font-bold px-6 py-2 rounded-md hover:cursor-pointer custom-blue-bg custom-white-color"
          >
            {isRunning ? (
              <>
                <IoIosPause />
                توقف
              </>
            ) : (
              "شروع"
            )}
          </button>
          {isRunning && (
            <button
              onClick={handleReset}
              className="flex flex-row items-center justify-center gap-0.5 text-gray-500 text-sm font-bold px-6 py-2 rounded-md hover:cursor-pointer custom-gray-bg"
            >
              <RxCross2 />
              پایان
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <section className="w-full h-[45%] rounded-2xl custom-whiteLess-bg">
      <div className="flex flex-row px-2 py-2 w-full h-[50%]">
        <div className="flex flex-col items-center justify-between pt-1 w-[52%] h-full">
          <h1 className="text-4xl font-bold custom-blue-color">{iranTime}</h1>

          <div className="flex flex-col items-center justify-center w-full h-[35%] gap-2">
            <p className="text-md font-bold">{iranDate}</p>
            <p className="flex flex-row text-[0.6rem] text-gray-600">
              {gregorianDate} | {hijriDate}
            </p>
          </div>

          <div className="flex flex-row items-center justify-between w-full">
            <button
              className={`flex flex-row items-center justify-between text-xs py-1  px-2 rounded-2xl hover:cursor-pointer ${
                activeButton === "button1"
                  ? "custom-darkNavy-bg custom-white-color border-none"
                  : "custom-whiteLess-bg border border-gray-300"
              }`}
              onClick={() => handleButtonClick("button1")}
            >
              تایمر
              <MdOutlineKeyboardArrowDown
                className={`${activeButton === "button1" ? "rotate-180" : ""}`}
                onClick={() => handleButtonClick("button1")}
              />
            </button>

            <button
              className={`flex flex-row items-center justify-between text-xs py-1  px-2 rounded-2xl hover:cursor-pointer ${
                activeButton === "button2"
                  ? "custom-darkNavy-bg custom-white-color border-none"
                  : "custom-whiteLess-bg border border-gray-300"
              }`}
              onClick={() => handleButtonClick("button2")}
            >
              اوقات شرعی
              <MdOutlineKeyboardArrowDown
                className={`${activeButton === "button2" ? "rotate-180" : ""}`}
                onClick={() => handleButtonClick("button2")}
              />
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between pt-1 w-[48%] h-full">
          <div className="flex flex-row items-center justify-between w-[95%]">
            <p className="text-4xl text-gray-600 font-bold">۲۲°</p>
            <div className="flex flex-row items-center justify-center pl-4 w-[50%] h-full relative">
              <img
                src={clearNight}
                className="absolute z-0 w-14 h-14 moon-slide"
                alt=""
              />
              <img
                src={cloudy}
                className="relative z-10 -left-4 w-14 h-14"
                alt=""
              />
            </div>
          </div>

          <div className="flex flex-col items-center justify-between w-[95%] h-[40%]">
            <p className="text-sm font-semibold">آسمون زیباست🎈</p>
            <div className="flex flex-row items-center justify-between w-[95%] h-full">
              <span className="flex flex-row items-center justify-center gap-1 text-xs font-bold w-[50%]">
                ۲۲°<p className="text-gray-500">حداکثر</p>
              </span>
              <span className="flex flex-row items-center justify-center gap-1 text-xs font-bold w-[50%]">
                ۱۷°<p className="text-gray-500">حداقل</p>
              </span>
            </div>
          </div>

          <button
            className={`flex flex-row items-center justify-between text-xs py-1  px-1 rounded-2xl hover:cursor-pointer ${
              activeButton === "button3"
                ? "custom-darkNavy-bg custom-white-color border-none"
                : "custom-whiteLess-bg border border-gray-300"
            }`}
            onClick={() => handleButtonClick("button3")}
          >
            پیشبینی
            <MdOutlineKeyboardArrowDown
              className={`${activeButton === "button3" ? "rotate-180" : ""}`}
              onClick={() => handleButtonClick("button3")}
            />
          </button>
        </div>
      </div>

      <div className="w-full h-[50%]">
        {activeButton === "button1" && <Timer />}
      </div>
    </section>
  );
};
export default Weather;
