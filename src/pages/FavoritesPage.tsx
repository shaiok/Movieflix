import React, { useState, useEffect } from "react";
import Header from "@/components/custom/Header";
import ShowGrid from "@/components/custom/ShowGrid";
import Filter from "@/components/custom/Filter";
import { getFavoriteShows, removeFavoriteShow } from "@/lib/favorites";

export interface Show {
  id: number;
  image: string;
  title: string; // Title of the show
  year: string; // Release year
  rating: number; // Average rating
  language: string; // Show language
  genres: string[]; // List of genres
  isFavorite?: boolean; // Optional favorite flag
}

interface Filters {
  rating: number[]; // Expect an array of numbers
  languages: string[]; // Expect an array of strings
  genres: string[]; // Expect an array of strings
}

const FavoritesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>(""); // User-entered query
  const [filters, setFilters] = useState<Filters>({
    rating: [],
    languages: [],
    genres: [],
  });
  const [favorites, setFavorites] = useState<Show[]>([]); // Favorite shows
  const [filteredFavorites, setFilteredFavorites] = useState<Show[]>([]); // Filtered shows
  const [isLoading, setIsLoading] = useState<boolean>(true); // Loading state

  // Fetch favorites from local storage
  useEffect(() => {
    const loadFavorites = () => {
      setIsLoading(true);
      const favoriteShows = getFavoriteShows();
      setFavorites(favoriteShows);
      setFilteredFavorites(favoriteShows); // Initially, no filters applied
      setIsLoading(false);
    };
    loadFavorites();
  }, []);

  // Apply search and filters
  useEffect(() => {
    let filtered = [...favorites];

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter((show) =>
        show.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by rating
    if (filters.rating.length > 0) {
      filtered = filtered.filter((show) =>
        filters.rating.includes(Math.round(show.rating))
      );
    }

    // Filter by language
    if (filters.languages.length > 0) {
      filtered = filtered.filter((show) =>
        filters.languages.includes(show.language)
      );
    }

    // Filter by genres
    if (filters.genres.length > 0) {
      filtered = filtered.filter((show) =>
        show.genres.some((genre) => filters.genres.includes(genre))
      );
    }

    setFilteredFavorites(filtered);
  }, [searchQuery, filters, favorites]);

  // Handle favorite toggle
  const handleFavoriteToggle = (id: number) => {
    removeFavoriteShow(id); // Remove show from local storage
    const updatedFavorites = getFavoriteShows();
    setFavorites(updatedFavorites);
    setFilteredFavorites(updatedFavorites); // Update filtered favorites
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (updatedFilters: Filters) => {
    setFilters(updatedFilters);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Header */}
      <Header title="MovieFlix - Favorites" onSearch={handleSearch} />

      {/* Main Content */}
      <section className="pb-8 px-4 pt-20">
        {/* Filter and Results Count */}
        <div className="relative flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">
            {searchQuery
              ? `Search Results for: ${searchQuery}`
              : "Your Favorite Shows"}
          </h2>
          <Filter onFilterChange={handleFilterChange} />
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-gray-400">Loading favorites...</p>
          </div>
        ) : filteredFavorites.length > 0 ? (
          <ShowGrid
            shows={filteredFavorites}
            onFavoriteToggle={handleFavoriteToggle}
            onShowInfo={(id) =>
              console.log(`Navigate to show details page for show ID: ${id}`)
            }
          />
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">
              {searchQuery || filters.rating.length || filters.languages.length || filters.genres.length
                ? "No favorites match your criteria."
                : "You have no favorite shows yet."}
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default FavoritesPage;
