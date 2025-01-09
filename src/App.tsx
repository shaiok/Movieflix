import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/Context/ThemeContsxt";
import HomePage from "@/pages/HomePage";
import FavoritesPage from "@/pages/FavoritesPage";
import SearchHistoryPage from "@/pages/SearchHistoryPage";
import ShowPage from "@/pages/ShowPage";

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <div className="w-[100vw] min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
        <Router>
          <Routes>
            {/* Home Page */}
            <Route path="/home" element={<HomePage />} />

            {/* Favorites Page */}
            <Route path="/favorites" element={<FavoritesPage/>} />
             
            {/* Search History Page */}
            <Route path="/search-history" element={<SearchHistoryPage  />} />

            {/* Show Page */}
            <Route
             path="/shows/:id"
              element={<ShowPage  />}
              />
              </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
};

export default App;
