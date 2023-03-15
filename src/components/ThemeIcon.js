import React, { useContext } from "react";
import { MoonIcon } from "@heroicons/react/solid";
import ThemeContext from "../context/ThemeContext";
const ThemeIcon = () => {
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  return (
    <button
      className={`rounded-lg border-neutral-400 border-1 p-2 absolute right-12 shadow-md ${
        darkMode ? "shadow-gray-100" : null
      }`}
      onClick={toggleDarkMode}
    >
      <MoonIcon
        className={`h-4 w-4 cursor-pointer stroke-1 fill-none stroke-neutral-400 ${
          darkMode
            ? "fill-yellow-300 stroke-yellow-400"
            : "fill-none stroke-neutral-400"
        }`}
      />
    </button>
  );
};

export default ThemeIcon;
