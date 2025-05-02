import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "../../Components/global.css";
import Dot from "../Extra/dot";
import { RxCross2 } from "react-icons/rx";
import { loginUser, registerUser, setAuthToken } from "../../Common/Utils/authentication";

const InputField = ({ id, type, placeholder, value, onChange }) => (
  <div className="relative w-[80%] mb-4">
    <input
      id={id}
      name={id}
      type={type}
      placeholder={placeholder}
      className="rounded-md p-4 h-[2.8rem] w-full focus:outline-none placeholder-shown:placeholder-opacity-100 placeholder-opacity-0 transition-all duration-200 custom-whiteLess-bg"
      value={value}
      onChange={onChange}
      required
    />
  </div>
);

const ErrorPopup = ({ message, onClose }) => (
  <div className="fixed top-0 left-1/2 transform -translate-x-1/2 mt-4 px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-slideDown z-50 custom-red-bg custom-white-color">
    <span className="font-medium whitespace-nowrap">{message}</span>
    <button
      onClick={onClose}
      className="custom-whiteLess-bg rounded-full p-1 hover:cursor-pointer transition custom-red-color"
    >
      <RxCross2 />
    </button>
  </div>
);

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    username: "",
    isLogin: false,
  });
  const [errorPopup, setErrorPopup] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const toggleLoginMode = () => {
    setForm({
      email: "",
      password: "",
      firstname: "",
      lastname: "",
      username: "",
      isLogin: !form.isLogin,
    });
    setErrorPopup("");
    setIsButtonDisabled(false);
  };

  const translateErrorMessage = (msg) => {
    if (msg.includes("کاربری با آن نام کاربری وجود دارد"))
      return "این نام کاربری قبلاً ثبت شده است.";
    if (msg.includes("این مقدار لازم است"))
      return "لطفاً تمام فیلدها را پر کنید.";
    if (msg.includes("Enter a valid email address"))
      return "آدرس ایمیل نامعتبر است.";
    if (msg.includes("Ensure this field has at least"))
      return "رمز عبور خیلی کوتاه است.";
    if (msg.includes("password")) return "رمز عبور نامعتبر است.";
    return msg;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorPopup("");
    setIsButtonDisabled(true);

    try {
      const data = form.isLogin
        ? await loginUser(form.username, form.password)
        : await registerUser(
            form.email,
            form.password,
            form.firstname,
            form.lastname,
            form.username
          );

      if (data.token) {
        localStorage.setItem("access", data.token);
        setAuthToken(data.token);
        console.log("ورود یا ثبت‌نام موفق!");
        navigate("/origin");
      } else {
        throw new Error("توکن دریافت نشد!");
      }
    } catch (err) {
      setErrorPopup(
        form.isLogin
          ? "نام کاربری یا رمز عبور اشتباه است!"
          : translateErrorMessage(err.message)
      );
      setIsButtonDisabled(false);
    }
  };

  const dots = useMemo(
    () =>
      Array.from({ length: 25 }, (_, i) => (
        <Dot key={i} className="pointer-events-none" />
      )),
    []
  );

  return (
    <section className="relative flex flex-row items-center justify-between sm:w-[65rem] sm:h-[38rem] w-[100%] h-[35rem]">
      <div className="absolute inset-0 flex flex-wrap pointer-events-none">
        {dots}
      </div>

      {errorPopup && (
        <ErrorPopup
          message={errorPopup}
          onClose={() => {
            setErrorPopup("");
            setIsButtonDisabled(false);
          }}
        />
      )}

      <div className="flex flex-col items-center justify-between sm:p-10 sm:w-[45%] sm:h-full p-5 w-[21rem] h-[35rem] rounded-3xl custom-lightBlue-bg">
        <div className="flex flex-col items-center gap-8">
          <h1 className="text-4xl font-bold custom-alexandria-font custom-darkNavy-color">
            دی میت
          </h1>
          <div className="flex flex-col text-center gap-2">
            <h2 className="text-3xl font-bold custom-white2-color">
              خوش اومدی!
            </h2>
            <p className="font-medium text-sm custom-gray-color">
              {form.isLogin
                ? "برای ورود لطفا نام کاربری و رمز عبورت رو وارد کن"
                : "برای ثبت نام لطفا اطلاعاتت رو وارد کن"}
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center w-full h-[60%] gap-5"
        >
          {!form.isLogin && (
            <>
              <div className="flex flex-row items-center justify-between w-[80%] sm:gap-5 gap-1">
                <InputField
                  id="firstname"
                  type="text"
                  placeholder="نام"
                  value={form.firstname}
                  onChange={handleChange}
                />
                <InputField
                  id="lastname"
                  type="text"
                  placeholder="نام خانوادگی"
                  value={form.lastname}
                  onChange={handleChange}
                />
              </div>
              <InputField
                id="email"
                type="email"
                placeholder="ایمیل"
                value={form.email}
                onChange={handleChange}
              />
            </>
          )}
          <InputField
            id="username"
            type="text"
            placeholder="نام کاربری"
            value={form.username}
            onChange={handleChange}
          />
          <InputField
            id="password"
            type="password"
            placeholder="رمز عبور"
            value={form.password}
            onChange={handleChange}
          />

          <button
            type="submit"
            disabled={
              !form.username ||
              !form.password ||
              (!form.isLogin &&
                (!form.firstname || !form.lastname || !form.email)) ||
              isButtonDisabled
            }
            className="font-bold py-2 w-[80%] rounded-xl transition duration-200 hover:opacity-90 hover:cursor-pointer active:scale-90 disabled:opacity-50 disabled:cursor-not-allowed custom-white-color custom-darkNavy-bg"
          >
            {form.isLogin ? "ورود" : "ثبت نام"}
          </button>
        </form>

        <p className="custom-white-color">
          {form.isLogin ? "حساب کاربری نداری؟" : "قبلا ثبت‌نام کردی؟"}{" "}
          <button
            onClick={toggleLoginMode}
            className="underline hover:cursor-pointer custom-darkNavy-color"
          >
            {form.isLogin ? "ثبت‌نام" : "ورود"}
          </button>
        </p>
      </div>

      <div className="sm:flex hidden items-center justify-center w-[50%] h-full rounded-3xl custom-login-banner">
        <div className="flex flex-col items-start justify-between bg-transparent w-[85%] h-[90%] rounded-2xl">
          <h1 className="text-3xl font-bold w-[25rem] custom-white2-color">
            دی میت <br /> دستیار هوشمند روزانه شما!
          </h1>
          <p className="w-[95%] font-bold text-lg custom-white2-color">
            با دی میت برنامه‌ریزی روزانه‌تان را ساده کنید! شامل تقویم هوشمند،
            پیش‌بینی دقیق آب‌وهوا و لیست کارهای روزانه.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
