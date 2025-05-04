import axios from "axios";

export const weatherText = async (category) => {
  const API_URL = `http://127.0.0.1:8000/weather_text/weather/${category}/`;

  try {
    const response = await axios.get(API_URL);
    const data = response.data;
    const randomIndex = Math.floor(Math.random() * data.length);
    const randomText =
      data[randomIndex]?.text || "متنی برای این وضعیت یافت نشد.";
    console.log(randomText);
    return randomText;
  } catch (err) {
    console.error("Error fetching weather text:", err);
    return "خطا در دریافت تکست وضعیت آب و هوا.";
  }
};
