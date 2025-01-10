import React, { useState, useEffect } from "react";
import Header from "@/components/custom/Header";
import ShowGrid from "@/components/custom/ShowGrid";
import Filter from "@/components/custom/Filter";
import { fetchAllShows, fetchShows } from "@/lib/api";
import { Filters, Show } from "@/lib/interfaces";



const HomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>(""); // User-entered query
  const [filters, setFilters] = useState<Filters>({
    rating: [],
    languages: [],
    genres: [],
  });
  const [shows, setShows] = useState<Show[]>([]); // List of all shows
  const [filteredShows, setFilteredShows] = useState<Show[]>([]); // Filtered shows
  const [isLoading, setIsLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  const saveSearchHistory = (query: string, appliedFilters: Filters) => {
    const timestamp = new Date().toISOString();
    const searchHistory = JSON.parse(localStorage.getItem("searchHistory") || "[]");
    const newSearch = { id: Date.now(), query, filters: appliedFilters, timestamp };
    const updatedHistory = [newSearch, ...searchHistory];
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
  };

  const applyFilters = (allShows: Show[], activeFilters: Filters): Show[] => {
    return allShows.filter((show) => {
      const matchesRating = activeFilters.rating.length === 0 || activeFilters.rating.some((r) => show.rating >= r);
      const matchesLanguage = activeFilters.languages.length === 0 || activeFilters.languages.includes(show.language);
      const matchesGenre = activeFilters.genres.length === 0 || show.genres.some((genre) => activeFilters.genres.includes(genre));
      return matchesRating && matchesLanguage && matchesGenre;
    });
  };

  useEffect(() => {
    const fetchTVShows = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const results = searchQuery.trim()
          ? await fetchShows(searchQuery, filters)
          : await fetchAllShows();
        setShows(results);
        setFilteredShows(applyFilters(results, filters)); // Apply filters immediately
        if (searchQuery.trim()) {
          saveSearchHistory(searchQuery, filters); // Save search history
        }
      } catch (err) {
        console.error("Failed to fetch shows:", err);
        setError("Failed to fetch shows. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchTVShows();
  }, [searchQuery]);

  useEffect(() => {
    // Apply filters to the current list of shows whenever filters change
    setFilteredShows(applyFilters(shows, filters));
  }, [filters, shows]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (updatedFilters: Filters) => {
    setFilters(updatedFilters);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <Header title="MovieFlix" onSearch={handleSearch} />

      <section className="pb-8 px-4 pt-20">
        <div className="relative flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">
            {searchQuery ? `Search Results for: ${searchQuery}` : "Trending Now"}
          </h2>
          <Filter onFilterChange={handleFilterChange} />
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-gray-400">Loading...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500">{error}</p>
          </div>
        ) : (
          <>
            <ShowGrid
              shows={filteredShows}
              onFavoriteToggle={(id) =>
                console.log(`Favorite toggled for show ID: ${id}`)
              }
              onShowInfo={(id) =>
                console.log(`Showing info for show ID: ${id}`)
              }
            />
            {filteredShows.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-400">No shows found matching your criteria.</p>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
};

export default HomePage;
