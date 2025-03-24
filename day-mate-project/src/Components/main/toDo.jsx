import { useState } from "react";
import { BiSolidShow, BiSolidHide } from "react-icons/bi";
import { IoIosAdd } from "react-icons/io";
import { IoMdPricetag } from "react-icons/io";
import { FaCalendarAlt } from "react-icons/fa";
import Popover from "../Extra/popOver";

const ToDo = () => {
  const [isShown, setIsShown] = useState(true);
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  const [selectedColor, setSelectedColor] = useState("");
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [tags, setTags] = useState([]);

  const toggleIcon = () => {
    setIsShown((prev) => !prev);
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  const handleAddTag = (tag, isRemove = false) => {
    if (isRemove) {
      setTags((prevTags) => prevTags.filter((t) => t !== tag));
    } else {
      setTags((prevTags) => [tag, ...prevTags]);
    }
  };

  return (
    <section className="flex flex-col items-center justify-between px-3 py-4 w-[26%] h-[100%] rounded-2xl custom-whiteLess-bg">
      <div className="flex flex-row items-center justify-between w-full">
        <h2 className="text-xl font-bold custom-darkNavy-color">دست نویس</h2>
        <button onClick={toggleIcon}>
          {isShown ? (
            <BiSolidShow className="px-1 py-1 w-8 h-8 rounded hover:cursor-pointer custom-darkNavy-color custom-gray-bg" />
          ) : (
            <BiSolidHide className="px-1 py-1 w-8 h-8 rounded hover:cursor-pointer custom-darkNavy-color custom-gray-bg" />
          )}
        </button>
      </div>

      <div
        className={`flex flex-col items-start justify-between w-full h-[75%] ${
          isShown ? "blur-md" : "blur-none"
        }`}
      >
        دوره ی نود جی اس
      </div>

      <div className="flex flex-row items-start justify-between w-full h-[15%]">
        <div className="flex flex-col items-center justify-between w-[82%] h-[100%]">
          <input
            placeholder="نوشتن تسک جدید"
            className="px-2 w-full h-[40%] text-sm font-semibold rounded-md transition duration-150 focus:placeholder-emerald-600 focus:outline-0 focus:caret-[#3f75ff] custom-gray-border"
            onFocus={() => setIsDetailsVisible(true)}
          />

          <div
            className={`flex flex-col items-start justify-between w-full h-[50%] transition-all duration-300 ${
              isDetailsVisible
                ? "opacity-100 scale-100"
                : "opacity-0 scale-95 pointer-events-none"
            }`}
          >
            <input
              placeholder="توضیحات بیشتر..."
              className="mt-2 px-2 w-full text-[0.8rem] text-gray-700 rounded-md focus:outline-0"
            />

            <div className="flex flex-row items-center justify-between px-2 w-full mt-2">
              <div className="relative mt-4">
                <button
                  className="flex flex-row items-center justify-between text-sm text-gray-700 w-15 hover:cursor-pointer hover:text-black"
                  onClick={() => setIsPopoverOpen((prev) => !prev)}
                >
                  <IoMdPricetag className="w-4 h-4 mr-2" />
                  برچسب
                </button>

                <Popover
                  isOpen={isPopoverOpen}
                  onClose={() => setIsPopoverOpen(false)}
                  onAddTag={handleAddTag}
                  tags={tags}
                />
              </div>

              <button className="flex flex-row items-center justify-between text-sm text-gray-700 w-15 hover:cursor-pointer hover:text-black">
                <FaCalendarAlt className="w-3 h-3" />
                سررسید
              </button>

              <div className="flex flex-row items-center justify-between w-12">
                <button
                  type="button"
                  onClick={() => handleColorSelect("green")}
                  className={`w-3 h-3 rounded-full bg-green-500 transition-opacity duration-150 ${
                    selectedColor === "green" ? "opacity-100" : "opacity-50"
                  } hover:opacity-100 hover:cursor-pointer`}
                ></button>

                <button
                  type="button"
                  onClick={() => handleColorSelect("yellow")}
                  className={`w-3 h-3 rounded-full bg-yellow-500 transition-opacity duration-150 ${
                    selectedColor === "yellow" ? "opacity-100" : "opacity-50"
                  } hover:opacity-100 hover:cursor-pointer`}
                ></button>

                <button
                  type="button"
                  onClick={() => handleColorSelect("red")}
                  className={`w-3 h-3 rounded-full bg-red-500 transition-opacity duration-150 ${
                    selectedColor === "red" ? "opacity-100" : "opacity-50"
                  } hover:opacity-100 hover:cursor-pointer`}
                ></button>
              </div>
            </div>
          </div>
        </div>

        <button
          className={`flex items-center justify-center w-[15%] transition hover:cursor-pointer hover:-translate-y-1 rounded-md custom-blue-bg ${
            isDetailsVisible ? "h-[100%]" : "h-[40%]"
          }`}
        >
          <IoIosAdd className="w-6 h-6 custom-white-color" />
        </button>
      </div>
    </section>
  );
};

export default ToDo;
