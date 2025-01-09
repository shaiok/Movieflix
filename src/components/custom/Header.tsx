import React, { useState } from "react";
import { Search } from "lucide-react";
import { useTheme } from "@/Context/ThemeContsxt";
import { Link, useLocation } from "react-router-dom";

interface HeaderProps {
  title: string;
  onSearch?: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ title, onSearch }) => {
  const { theme, toggleTheme } = useTheme();
  const [searchInput, setSearchInput] = useState("");
  const location = useLocation();

  const handleSearchSubmit = () => {
    if (onSearch && searchInput.trim()) {
      onSearch(searchInput.trim());
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  return (
    <header className="fixed w-full z-50 p-4 flex items-center gap-4 bg-gray-100 dark:bg-gray-900">
      {/* Title */}
      <Link to="/" className="text-2xl font-bold text-gray-900 dark:text-white">
        {title}
      </Link>

    {/* Search Bar */}
<div className="relative flex-grow mx-4">
  <input
    type="text"
    placeholder="Search"
    value={searchInput}
    onChange={(e) => setSearchInput(e.target.value)}
    onKeyPress={handleKeyPress}
    className="w-full pl-12 pr-12 py-2 bg-gray-100 text-gray-900 rounded-full border border-gray-300 placeholder-gray-400 focus:outline-none dark:bg-gray-800 dark:text-white dark:border-gray-700"
  />
  <button
    onClick={handleSearchSubmit}
    className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 p-2 rounded-full transition-colors"
    aria-label="Search"
  >
    <Search size={20} />
  </button>
</div>

      {/* Navigation Links */}
      <nav className="hidden md:flex gap-6 text-gray-600 dark:text-gray-300">
        <Link
          to="/home"
          className={`hover:text-gray-900 dark:hover:text-white ${
            location.pathname === "/" ? "text-gray-900 dark:text-white" : ""
          }`}
        >
          Home
        </Link>
        <Link
          to="/favorites"
          className={`hover:text-gray-900 dark:hover:text-white ${
            location.pathname === "/favorites" ? "text-gray-900 dark:text-white" : ""
          }`}
        >
          Favorites
        </Link>
        <Link
          to="/search-history"
          className={`hover:text-gray-900 dark:hover:text-white ${
            location.pathname === "/search-history" ? "text-gray-900 dark:text-white" : ""
          }`}
        >
          Search History
        </Link>
      </nav>

      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className={`p-2 rounded-full transition-all duration-200 
        ${theme === "light" ? "bg-gray-200 text-gray-900" : "bg-gray-700 text-white"} 
         hover:bg-gray-300 dark:hover:bg-gray-600 hover:scale-110`}
         aria-label="Toggle Theme"
         >
        {theme === "light" ? "🌙" : "☀️"}
      </button>
    </header>
  );
};

export default Header;