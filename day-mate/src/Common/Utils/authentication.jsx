import axios from "axios";

const API_BASE_URL = "http://localhost:8000";

export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

// ورود
export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/Authentication/auth/login/`,
      {
        username,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Login error:", error.response?.data);
    throw new Error("نام کاربری یا رمز عبور اشتباه است!");
  }
};

// ثبت نام
export const registerUser = async (
  email,
  password,
  firstname,
  lastname,
  username
) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/Authentication/auth/register/`,
      {
        email,
        username,
        password,
        first_name: firstname,
        last_name: lastname,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Register error:", error.response?.data);

    const data = error.response?.data;

    const errorMessage =
      data?.non_field_errors?.[0] ||
      data?.username?.[0] ||
      data?.password?.[0] ||
      data?.email?.[0] ||
      data?.first_name?.[0] ||
      data?.last_name?.[0] ||
      "ثبت‌نام ناموفق!";

    throw new Error(errorMessage);
  }
};
