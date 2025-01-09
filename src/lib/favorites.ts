import { Show } from "@/pages/HomePage";

const FAVORITES_KEY = "favoriteShows";

// Save a favorite show to local storage
export const addFavoriteShow = (show: Show ) => {
  const favorites = getFavoriteShows();
  if (!favorites.find((fav) => fav.id === show.id)) {
    favorites.push(show);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }
};

// Remove a show from favorites
export const removeFavoriteShow = (showId: number) => {
  const favorites = getFavoriteShows().filter((fav) => fav.id !== showId);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
};

// Retrieve all favorite shows
export const getFavoriteShows = (): Show[] => {
  const favorites = localStorage.getItem(FAVORITES_KEY);
  return favorites ? JSON.parse(favorites) : [];
};

// Check if a show is in favorites
export const isFavoriteShow = (showId: number) => {
  const favorites = getFavoriteShows();
  return favorites.some((fav) => fav.id === showId);
};
