import { useState } from "react";
import { FiBookmark, FiX, FiPlus } from "react-icons/fi";
import { CiSearch } from "react-icons/ci";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [bookmarks, setBookmarks] = useState([]);

  const handleAddBookmark = () => {
    if (searchQuery.trim() && bookmarks.length < 10) {
      setBookmarks([...bookmarks, searchQuery.trim()]);
      setSearchQuery("");
    }
  };

  const handleRemoveBookmark = (index) => {
    const newBookmarks = bookmarks.filter((_, i) => i !== index);
    setBookmarks(newBookmarks);
  };

  return (
    <section className="flex flex-col items-center justify-between w-full sm:h-[45%] h-[45%] sm:gap-0 gap-5">
      <div className="flex flex-row items-center w-full h-[40%]">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="جستجو کنید ..."
          className="w-full sm:h-[60%] h-xl pl-4 pr-5 py-5 font-semibold rounded-xl placeholder:text-gray-600 focus:outline-0 caret-[#9f0184] custom-whiteLess-bg custom-darkNavy-color"
        />

        <button className="sticky z-10 p-3 rounded-lg active:scale-95 transition cursor-pointer custom-mr-3 custom-purple-bg">
          <CiSearch className="sticky w-6 h-6 z-10 custom-purple-color" />
        </button>
      </div>
      <div className="w-full max-w-4xl">
        <div className="align-middle grid grid-cols-4 sm:grid-cols-3 md:grid-cols-5 gap-2">
          {[...Array(10)].map((_, index) => (
            <div
              key={index}
              className={`relative sm:px-2 px-1 sm:py-6 py-4 rounded-xl border transition-all duration-150 hover:scale-105 hover:cursor-pointer ${
                bookmarks[index]
                  ? "bg-blue-50 border-blue-200"
                  : "bg-gray-100 hover:bg-gray-200 border-gray-200"
              }`}
            >
              {bookmarks[index] ? (
                <>
                  <div className="flex items-center justify-between">
                    <FiBookmark className="text-blue-500" />
                    <button
                      onClick={() => handleRemoveBookmark(index)}
                      className="p-1 text-gray-500 hover:text-red-500"
                    >
                      <FiX />
                    </button>
                  </div>
                  <p className="mt-2 text-sm text-gray-700 truncate">
                    {bookmarks[index]}
                  </p>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full gap-2 custom-purple-color">
                  <FiPlus className="w-4 h-4" />
                  <span className="text-xs text-gray-600 font-bold">افزودن</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Search;
