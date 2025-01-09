import axios from "axios";

// Fetch shows with filters
export const fetchShows = async (
  query: string,
  filters: { genres?: string[]; rating?: number[]; languages?: string[] }
) => {
  // Convert arrays to strings or omit them if empty
  const params: { q: string; genres?: string; ratings?: string; languages?: string } = {
    q: query,
  };

  console.log("Filters before params transformation:", filters); // Debug log

  if (filters.genres && filters.genres.length > 0) {
    params.genres = filters.genres.join(","); // Convert array to comma-separated string
  }
  console.log("logginh rating if "  , filters.rating );
  if (filters.rating && filters.rating.length > 0) {
    console.log("Max rating to be added:", Math.max(...filters.rating));
    params.ratings = String(Math.max(...filters.rating)); // Convert to string
  }

  if (filters.languages && filters.languages.length > 0) {
    params.languages = filters.languages.join(","); // Convert array to comma-separated string
  }

  console.log("Final API Parameters:", params); // Debug log

  const response = await axios.get("http://localhost:5000/api/search", {
    params, // Send the processed params
  });

  return response.data.map((show: any) => ({
    id: show.id,
    image: show.image || "", // Use medium-sized image
    title: show.name, // Map `name` to `title`
    year: show.premiered && show.premiered.length >= 4 ? show.premiered.slice(0, 4) : "",
    rating: show.rating?.average || "N/A", // Use `rating.average`
    genres: show.genres || [],
    language: show.language || "Unknown",
    isFavorite: false, // Default to not favorite
  }));
};

// Fetch episodes for a show
export const fetchEpisodes = async (showId: number) => {
  const response = await axios.get(`http://localhost:5000/api/shows/${showId}/episodes`);

  // Ensure all required fields are mapped correctly
  return response.data.map((episode: any) => ({
    id: episode.id,
    name: episode.name,
    season: episode.season,
    number: episode.number,
    airdate: episode.airdate,
    runtime: episode.runtime,
    image: episode.image || null,
    summary: episode.summary || "",
  }));
};

// Fetch a specific show by its ID
export const fetchShowById = async (showId: number) => {
  const response = await axios.get(`http://localhost:5000/api/shows/${showId}`);

  // Map API response to match the expected structure
  const show = response.data;
  return {
    id: show.id,
    title: show.name,
    year: show.premiered ? show.premiered.split("-")[0] : "",
    rating: show.rating || "N/A",
    language: show.language || "Unknown",
    genres: show.genres || [],
    description: show.summary || "No description available",
    cast: [], // Add cast logic if available in API
    creator: show.network || "Unknown", // Use network name as creator for now
    episodes: [], // Fetch separately if needed
    coverImage: show.image || "", // Use original-sized image
    isFavorite: false, // Default to not favorite
  };
};

// Fetch all shows (default)
export const fetchAllShows = async () => {
  const response = await axios.get("http://localhost:5000/api/shows");
  
  // Map API response to match the expected structure
  return response.data.map((show: any) => ({
    id: show.id,
    image: show.image?.medium || "", // Use medium-sized image
    title: show.name, // Map `name` to `title`
    year: show.premiered && show.premiered.length >= 4 ? show.premiered.slice(0, 4) : "Unknown",
    rating: show.rating || "N/A", // Use average rating
    genres: show.genres || [],
    language: show.language || "Unknown",
    isFavorite: false, // Default to not favorite
  }));
};

// Fetch seasons for a specific show
export const fetchSeasons = async (showId: number) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/shows/${showId}/seasons`);
    return response.data.map((season: any) => ({
      id: season.id,
      seasonNumber: season.seasonNumber,
      episodeCount: season.episodeCount,
      premiereDate: season.premiereDate,
      endDate: season.endDate,
    }));
  } catch (error) {
    console.error("Error fetching seasons:", error);
    throw new Error("Failed to fetch seasons");
  }
};

