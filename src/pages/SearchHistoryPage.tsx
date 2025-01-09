import React, { useEffect, useState } from "react";
import Header from "@/components/custom/Header";
import { Search, Clock, Trash2, Filter } from "lucide-react";

interface SearchHistoryItem {
  id: number;
  query: string;
  filters: Record<string, any>;
  timestamp: string;
}

const SearchHistoryPage: React.FC = () => {
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([]);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem("searchHistory") || "[]");
    setSearchHistory(history);
  }, []);

  const handleClearHistory = () => {
    localStorage.removeItem("searchHistory");
    setSearchHistory([]);
  };

  const formatFilters = (filters: Record<string, any>) => {
    return Object.entries(filters)
      .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(", ") : value}`)
      .join(" | ");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
      <Header title="Search History" />
      <div className="max-w-4xl mx-auto px-4 pt-20 pb-12">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-teal-100 dark:bg-teal-900 rounded-lg">
              <Clock size={28} className="text-teal-500 dark:text-teal-400" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-teal-400 bg-clip-text text-transparent dark:from-teal-400 dark:to-teal-200">
              Search History
            </h1>
          </div>
          {searchHistory.length > 0 && (
            <button
              onClick={handleClearHistory}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200"
            >
              <Trash2 size={16} />
              Clear All
            </button>
          )}
        </div>

        {searchHistory.length > 0 ? (
          <div className="space-y-4">
            {searchHistory.map((item) => (
              <div
                key={item.id}
                className="group p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-1"
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Search
                      size={20}
                      className={`text-gray-400 transition-colors duration-200 ${
                        hoveredItem === item.id ? "text-teal-500 dark:text-teal-400" : ""
                      }`}
                    />
                    <p className="text-gray-900 dark:text-white text-lg font-medium">
                      {item.query}
                    </p>
                  </div>
                  <span className="text-sm text-gray-400 dark:text-gray-500">
                    {new Date(item.timestamp).toLocaleString()}
                  </span>
                </div>
                {Object.keys(item.filters).length > 0 && (
                  <div className="mt-3 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <Filter size={14} />
                    <p className="font-mono bg-gray-50 dark:bg-gray-700/50 px-2 py-1 rounded">
                      {formatFilters(item.filters)}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
            <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
              <Search size={48} className="text-gray-400 dark:text-gray-500" />
            </div>
            <p className="text-xl font-medium text-gray-500 dark:text-gray-400">
              No search history yet
            </p>
            <p className="mt-2 text-sm text-gray-400 dark:text-gray-500">
              Your search history will appear here
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchHistoryPage;