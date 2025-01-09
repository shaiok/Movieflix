import axios from "axios";
import { Logger } from "../utils/logger";

const TVMAZE_API = "https://api.tvmaze.com";

export const searchTVShowsWithFilters = async (query: string, filters: any) => {
  try {
    Logger.info(`Fetching shows from TVmaze API`, { query, filters });

    const response = await axios.get(`${TVMAZE_API}/search/shows`, { params: { q: query } });
    Logger.debug(`TVmaze API response received`, { responseDataLength: response.data.length });

    // Map the response to extract relevant data
    let shows = response.data.map((item: any) => ({
      id: item.show.id,
      name: item.show.name,
      genres: item.show.genres,
      rating: item.show.rating  || null,
      image: item.show.image?.medium || null,
      language: item.show.language,
      summary: item.show.summary,
    }));

    // Apply filters locally
    if (filters.genre) {
      shows = shows.filter((show: { genres: string | string[]; }) => show.genres.includes(filters.genre));
      Logger.debug(`Filtered by genre`, { genre: filters.genre, filteredCount: shows.length });
    }
    console.log("becalc"  , filters.rating);
    if (filters.rating) {
      shows = shows.filter((show: { rating: { average: number | null } }) => {
        console.log("filter calc", show.rating?.average, filters.rating);
        // Ensure show.rating.average is a valid number before comparing
        return show.rating?.average !== null && show.rating.average > filters.rating;
      });
    }
    
     
    if (filters.language) {
      shows = shows.filter((show: { language: string; }) => show.language === filters.language);
      Logger.debug(`Filtered by language`, { language: filters.language, filteredCount: shows.length });
    }

    Logger.info(`Final filtered results`, { totalResults: shows.length });
    return shows;
  } catch (error) {
    Logger.error(`Error fetching TV shows`, { query, filters, error });
    throw new Error("Failed to fetch TV shows");
  }
};


export const getShowEpisodes = async (showId: number) => {
  try {
   
    const response = await axios.get(`${TVMAZE_API}/shows/${showId}/episodes`);

    // Format the response
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
  } catch (error) {
 
    throw new Error("Failed to fetch episodes");
  }
};

export const getShowDetails = async (showId: number) => {
  try {
    Logger.info(`Fetching details for show ID: ${showId}`);
    const response = await axios.get(`${TVMAZE_API}/shows/${showId}`);

    Logger.debug("Show details fetched successfully", response.data);

    // Format the response
    const show = response.data;
    return {
      id: show.id,
      name: show.name,
      genres: show.genres || [],
      rating: show.rating?.average || null,
      image: show.image?.medium || null,
      language: show.language || "Unknown",
      summary:cleanHtmlTags(show.summary)  || "No description available",
      premiered: show.premiered || "Unknown",
      runtime: show.runtime || 0,
      network: show.network?.name || "Unknown",
    };
  } catch (error) {
    Logger.error(`Error fetching details for show ID: ${showId}`, { error });
    throw new Error("Failed to fetch show details");
  }
};

// Fetch all shows
export const getAllShowsFromAPI = async (page: number) => {
  try {
    Logger.info(`Fetching all shows from page: ${page}`);
    const response = await axios.get(`${TVMAZE_API}/shows?page=${page}`);

    // Map API response to match the expected structure
    return response.data.map((show: any) => ({
      id: show.id,
      name: show.name,
      genres: show.genres || [],
      rating: show.rating?.average || "N/A",
      image: show.image || "",
      language: show.language || "Unknown",
      premiered: show.premiered || "Unknown",
      summary: show.summary || "No description available",
    }));
  } catch (error) {
    Logger.error("Error fetching all shows", { error });
    throw new Error("Failed to fetch all shows");
  }
};

function cleanHtmlTags(input: string): string {
  return input.replace(/<\/?[^>]+(>|$)/g, ""); // Removes all HTML tags
}

// Fetch seasons for a show
export const getSeasons = async (showId: number) => {
  try {
    Logger.info(`Fetching seasons from TVmaze API`, { showId });
    const response = await axios.get(`${TVMAZE_API}/shows/${showId}/seasons`);
    Logger.debug("Seasons fetched successfully", { showId, seasonsCount: response.data.length });

    return response.data.map((season: any) => ({
      id: season.id,
      seasonNumber: season.number,
      episodeCount: season.episodeOrder || "Unknown",
      premiereDate: season.premiereDate || "Unknown",
      endDate: season.endDate || "Unknown",
    }));
  } catch (error) {
    Logger.error(`Error fetching seasons for show ID: ${showId}`, { error });
    throw new Error("Failed to fetch seasons");
  }
};

// // Fetch episodes for a specific season
// export const getEpisodesForSeason = async (showId: number, seasonNumber: number) => {
//   try {
//     Logger.info(`Fetching episodes for season from TVmaze API`, { showId, seasonNumber });
//     const response = await axios.get(`${TVMAZE_API}/shows/${showId}/episodes`);
//     Logger.debug("Episodes fetched successfully", { showId, totalEpisodes: response.data.length });

//     const episodes = response.data.filter((episode: any) => episode.season === seasonNumber);
//     Logger.debug(`Filtered episodes by season`, { showId, seasonNumber, episodesCount: episodes.length });

//     return episodes.map((episode: any) => ({
//       id: episode.id,
//       name: episode.name,
//       airdate: episode.airdate || "Unknown",
//       runtime: episode.runtime || "Unknown",
//       image: episode.image?.medium || null,
//       summary: episode.summary?.replace(/<\/?[^>]+(>|$)/g, "") || "No description available", // Remove HTML tags
//     }));
//   } catch (error) {
//     Logger.error(`Error fetching episodes for season ${seasonNumber} of show ID: ${showId}`, { error });
//     throw new Error("Failed to fetch episodes for the season");
//   }
// };