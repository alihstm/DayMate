import { useState } from "react";
import "../Login/login.css";
import logo from "/DayMate/DayMate/day-mate-project/src/assets/Material/logo.jpg";
import { RiSettings3Fill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { PiPottedPlantFill } from "react-icons/pi";
//import "@theme-toggles/react/css/Around.css";
//import { Around } from "@theme-toggles/react";
import SplitText from "../Extra/splitText";
import ToDo from "../main/toDo";

const Origin = () => {
  return (
    <main className="flex flex-col items-center justify-between pb-5 w-[70rem] h-[50rem]">
      <header className="flex flex-row items-center justify-between w-full h-[10%]">
        <div className="flex flex-row items-center justify-between w-[18%]">
          <img src={logo} className="w-18 h-18 rounded-full" />
          <h1 className="text-3xl font-bold custom-darkNavy-color custom-alexandria-font">
            دی میت
          </h1>
        </div>

        <div className="flex items-center justify-center px-10 py-2 rounded-3xl custom-whiteLess-bg">
          <SplitText
            text="yaD etaM"
            className="text-2xl font-semibold text-center custom-direction custom-darkNavy-color"
            delay={100}
            animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
            animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
            easing="easeOutCubic"
            threshold={0.2}
          />
          <PiPottedPlantFill className="w-[1.5rem] h-[1.5rem] custom-darkNavy-color" />
        </div>

        <div className="flex flex-row items-center justify-between w-25">
          <button className="flex items-center justify-center px-[0.4rem] py-[0.6rem] rounded-full hover:cursor-pointer hover:bg-[#1e3a4c] transition hover:-translate-y-1 custom-whiteLess-bg">
            <RiSettings3Fill className="w-[2rem] h-[1.6rem] custom-darkNavy-color" />
          </button>

          <button className="flex items-center justify-center px-[0.4rem] py-[0.6rem] rounded-full hover:cursor-pointer hover:bg-[#1e3a4c] transition hover:-translate-y-1 custom-whiteLess-bg">
            <FaUser className="w-[2rem] h-[1.6rem] custom-darkNavy-color " />
          </button>
          {/*<Around className="w-8 h-8" duration={750} />*/}
        </div>
      </header>

      <section className="flex flex-row items-center justify-between w-full h-[85%]">
        <ToDo />
      </section>
    </main>
  );
};
export default Origin;
