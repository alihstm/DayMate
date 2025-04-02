import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import persianNumber from "persian-number";

const PrayerTimes = () => {
  const [prayerTimes, setPrayerTimes] = useState([]);

  const toPersianDigits = (num) => {
    const persianNumbers = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return num.toString().replace(/\d/g, (d) => persianNumbers[d]);
  };

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        const response = await fetch(
          "https://api.aladhan.com/v1/timingsByCity?city=تهران&country=ایران&method=8"
        );
        const data = await response.json();
        if (data.code === 200) {
          const timings = data.data.timings;

          const prayerNames = {
            Fajr: "صبح",
            Dhuhr: "ظهر",
            Asr: "عصر",
            Maghrib: "مغرب",
            Isha: "عشاء",
          };

          const formattedTimes = Object.entries(timings)
            .filter(([key]) => prayerNames[key])
            .map(([key, time]) => {
              const [hours, minutes] = time.split(":").map(Number);
              const decimalTime = hours + minutes / 60;

              return {
                name: prayerNames[key],
                time: decimalTime,
                timeLabel: toPersianDigits(`${hours}:${minutes}`),
              };
            });

          setPrayerTimes(formattedTimes);
        }
      } catch (error) {
        console.error("Error fetching prayer times:", error);
      }
    };

    fetchPrayerTimes();
  }, []);

  return (
    <div className="flex items-center justify-center w-full h-full rounded-xl text-center custom-whiteLess-bg">
      {" "}
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={prayerTimes}>
          <XAxis dataKey="name" tick={{ fontSize: 12 }} dy={5} />
          <YAxis
            className="sticky text-sm"
            domain={[0, 24]}
            tickFormatter={(hour) => toPersianDigits(Math.floor(hour)) + ":۰۰"}
            dx={-30}
          />
          <Tooltip
            formatter={(value, name, props) => {
              const hours = Math.floor(value);
              const minutes = Math.round((value - hours) * 60);
              return [
                `${toPersianDigits(hours)}:${toPersianDigits(
                  minutes.toString().padStart(2, "0")
                )}`,
                "ساعت",
              ];
            }}
            labelFormatter={(label) => `نماز ${label}`}
            contentStyle={{
              borderRadius: "0.5rem",
            }}
          />
          <Line
            type="monotone"
            dataKey="time"
            stroke="#1e3a4c"
            strokeWidth={3}
            dot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PrayerTimes;
