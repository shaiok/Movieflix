import React, { useState } from "react";
import { ChevronDown, SlidersHorizontal } from "lucide-react";

interface FilterProps {
  onFilterChange: (filters: {
    rating: number[];
    languages: string[];
    genres: string[];
  }) => void;
}

const Filter: React.FC<FilterProps> = ({ onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  // Sample data
  const languages = ["English", "Spanish", "French", "German", "Japanese", "Korean"];
  const genres = ["Action", "Comedy", "Drama", "Horror", "Romance", "Science-Fiction", "Thriller"];
  const ratings = [9, 8, 7, 6, 5];

  const handleRatingToggle = (rating: number) => {
    setSelectedRatings((prev) => {
      const updatedRatings = prev.includes(rating)
        ? prev.filter((r) => r !== rating)
        : [...prev, rating];
      console.log("Updated Ratings:", updatedRatings); // Debug log
      return updatedRatings;
    });
  };

  const handleLanguageToggle = (language: string) => {
    setSelectedLanguages((prev) =>
      prev.includes(language) ? prev.filter((l) => l !== language) : [...prev, language]
    );
  };

  const handleGenreToggle = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  const applyFilters = () => {
    onFilterChange({
      rating: selectedRatings,
      languages: selectedLanguages,
      genres: selectedGenres,
    });
    setIsOpen(false);
  };

  const clearFilters = () => {
    setSelectedRatings([]);
    setSelectedLanguages([]);
    setSelectedGenres([]);
    onFilterChange({
      rating: [],
      languages: [],
      genres: [],
    });
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white hover:text-teal-400 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors rounded-md"
      >
        <SlidersHorizontal size={18} className="text-gray-500 dark:text-gray-300" />
        <span>Filters</span>
        <ChevronDown
          size={16}
          className={`transform transition-transform text-gray-500 dark:text-gray-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-80 bg-gray-100 dark:bg-gray-900 rounded-md shadow-lg z-50 border border-gray-300 dark:border-gray-800">
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Filters</h3>
              <button
                onClick={clearFilters}
                className="text-sm text-gray-500 dark:text-gray-400 hover:text-teal-400"
              >
                Clear all
              </button>
            </div>

            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Rating</h4>
              <div className="flex flex-wrap gap-2">
                {ratings.map((rating) => (
                  <button
                    key={rating}
                    onClick={() => handleRatingToggle(rating)}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      selectedRatings.includes(rating)
                        ? "bg-teal-500 text-white"
                        : "bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700"
                    }`}
                  >
                    {rating}+ ⭐
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Language
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {languages.map((language) => (
                  <button
                    key={language}
                    onClick={() => handleLanguageToggle(language)}
                    className={`px-3 py-1.5 rounded-md text-sm text-left transition-colors ${
                      selectedLanguages.includes(language)
                        ? "bg-teal-500 text-white"
                        : "bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700"
                    }`}
                  >
                    {language}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Genre</h4>
              <div className="flex flex-wrap gap-2">
                {genres.map((genre) => (
                  <button
                    key={genre}
                    onClick={() => handleGenreToggle(genre)}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      selectedGenres.includes(genre)
                        ? "bg-teal-500 text-white"
                        : "bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700"
                    }`}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={applyFilters}
              className="w-full py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition-colors"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Filter;
