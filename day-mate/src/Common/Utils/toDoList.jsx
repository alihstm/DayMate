import axios from "axios";

const BASE_URL = "http://localhost:8000/api/to_do_list/";

const axiosInstance = (token) =>
  axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

// دریافت لیست تسک‌ها
export async function fetchTasks(token) {
  const api = axiosInstance(token);
  const res = await api.get("/");
  return res.data;
}

// ایجاد تسک جدید
export async function createTask(task, token) {
  const api = axiosInstance(token);
  const res = await api.post("create/", task);
  return res.data;
}

// بروزرسانی تسک
export async function updateTask(id, updatedTask, token) {
  const api = axiosInstance(token);
  const res = await api.put(`update/${id}/`, updatedTask);
  return res.data;
}

// حذف تسک
export async function deleteTask(id, token) {
  const api = axiosInstance(token);
  await api.delete(`delete/${id}/`);
}

// اگر خواستی جزئیات یک تسک خاص رو بگیری:
export async function getTaskDetail(id, token) {
  const api = axiosInstance(token);
  const res = await api.get(`${id}/`);
  return res.data;
}
