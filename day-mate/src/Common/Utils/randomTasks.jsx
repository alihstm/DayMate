import axios from "axios";

export async function getRandomTask() {
  try {
    const response = await axios.get(
      "http://localhost:8000/task_random/random_task/"
    );
    console.log(response.data);
    return response.data.title;
  } catch (error) {
    console.error("Error fetching task:", error);
    return "خطا در دریافت تسک";
  }
}
