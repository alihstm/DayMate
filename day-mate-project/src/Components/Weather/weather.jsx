import { useState, useEffect } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { IoIosPause } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import cloudy from "../../assets/Material/cloudy.png";
import rain from "../../assets/Material/rain.png";
import snow from "../../assets/Material/snow.png";
import clearNight from "../../assets/Material/clear-night.png";
import clearDay from "../../assets/Material/clear-day.png";
import sponcer from "/DayMate/DayMate/day-mate-project/src/assets/Material/Walex.png";
import { PiFlowerTulipBold } from "react-icons/pi";
import { LuHardDriveDownload } from "react-icons/lu";
import illustation from "/DayMate/DayMate/day-mate-project/src/assets/Material/illustration.svg";

const Weather = () => {
  const [iranTime, setIranTime] = useState("");
  const [iranDate, setIranDate] = useState("");
  const [gregorianDate, setGregorianDate] = useState("");
  const [hijriDate, setHijriDate] = useState("");
  const [activeButton, setActiveButton] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [isDay, setIsDay] = useState(true);

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
  const API_URL = import.meta.env.VITE_WEATHER_API_URL;

  const fetchWeather = async () => {
    try {
      const response = await fetch(
        `${API_URL}?q=Tehran&units=metric&appid=${API_KEY}`
      );
      if (!response.ok) {
        throw new Error("Weather data fetch failed");
      }

      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching weather:", err);
    }
  };

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
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeather();
        },
        (error) => console.error("Error getting location:", error),
        { enableHighAccuracy: true }
      );
    }

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
      checkDayTime();
    };
    updateTime();

    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleButtonClick = (button) => {
    setActiveButton(activeButton === button ? null : button);
  };

  const getTemperature = () => {
    if (!weatherData) return "...";
    const temp = Math.round(weatherData.main.temp);
    return convertToPersianNumbers(temp.toString()) + "°";
  };

  const checkDayTime = () => {
    const hours = new Date().getHours();
    setIsDay(hours >= 6 && hours < 18);
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

  const getWeatherImage = () => {
    if (!weatherData) return cloudy;

    const weatherId = weatherData.weather[0].id;
    const temp = weatherData.main.temp;

    if (weatherId >= 200 && weatherId < 600) {
      return rain;
    } else if (weatherId >= 600 && weatherId < 700) {
      return snow;
    } else if (weatherId === 800) {
      return isDay ? clearDay : clearNight;
    } else {
      return cloudy;
    }
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
            <p className="text-4xl text-gray-600 font-bold">
              {getTemperature()}
            </p>

            <div className="flex flex-row items-center justify-center pl-4 w-[50%] h-full relative">
              <img
                src={isDay ? clearDay : clearNight}
                className="absolute z-0 w-14 h-14 moon-slide"
                alt=""
              />

              <img
                src={getWeatherImage()}
                className="relative z-10 -left-4 w-14 h-14"
                alt=""
              />
            </div>
          </div>

          <div className="flex flex-col items-center justify-between w-[100%] h-[40%]">
            <p className="text-sm font-semibold">آسمون زیباست🎈</p>

            <div className="flex flex-row items-center justify-between w-[100%] h-full">
              <span className="flex flex-row items-center justify-center gap-1 text-xs font-bold w-[50%]">
                {weatherData
                  ? convertToPersianNumbers(
                      Math.round(weatherData?.main.temp_max).toString()
                    ) + "°"
                  : ""}
                <p className="text-gray-500">حداکثر</p>
              </span>

              <span className="flex flex-row items-center justify-center gap-1 text-xs font-bold w-[50%]">
                {weatherData
                  ? convertToPersianNumbers(
                      Math.round(weatherData?.main.temp_min).toString()
                    ) + "°"
                  : ""}
                <p className="text-gray-500">حداقل</p>
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

      <div className="px-3 pt-2 w-full h-[50%]">
        {activeButton === "button1" ? (
          <Timer />
        ) : (
          <div className="flex flex-row items-center justify-between w-full h-full">
            <div className="flex flex-col items-start pb-5 w-[70%] h-full">
              <div className="flex flex-row items-center justify-between gap-1 pl-3 pr-2 py-1 rounded-lg custom-gray-bg">
                <img src={sponcer} alt="" className="w-6 h-6" />
                <a
                  href="#"
                  className="text-xs font-semibold hover:underline hover:cursor-pointer"
                >
                  والکس؛ خرید آسان بیت‌کوین
                </a>
              </div>

              <div className="flex flex-row items-center justify-between gap-1 text-green-700 custom-mt-2">
                <PiFlowerTulipBold />
                <p className="text-xs font-semibold">
                  نوروز با دی میت - روز یازدهم
                </p>
              </div>

              <p className="text-xs font-semibold text-red-700 custom-mt-2">
                عید سعید فطر(تعطیل)
              </p>

              <div className="flex flex-row items-center justify-between gap-1 custom-mt-2">
                <LuHardDriveDownload />
                <p className="text-xs font-semibold">روز جهانی بک‌آپ گرفتن</p>
              </div>
            </div>

            <div className="flex items-end w-[25%] h-full">
              <img src={illustation} alt="" className="w-full " />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Weather;
