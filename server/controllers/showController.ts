import { Request, Response } from "express";
import { getAllShowsFromAPI, getSeasons, getShowDetails, getShowEpisodes, searchTVShowsWithFilters } from "../services/showServie";
import { RequestHandler } from "express";
import { Logger } from "../utils/logger";

export const searchShows: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const query = req.query.q as string;

    // Log the incoming request
    Logger.info(`Received search request`, { query, filters: req.query });
    Logger.info(`Received search request`, {  query, filters: req.query.ratings});
    // Validate query parameter
    if (!query) {
      res.status(400).json({ error: "Query parameter 'q' is required." });
      return;
    }

     // Extract optional filters and map them properly
     const genre = req.query.genres as string; // Extract `genres`
     const language = req.query.languages as string; // Extract `languages`
     const rating = req.query.ratings ? parseFloat(req.query.ratings as string) : undefined; // Correctly extract `ratings`
 
    console.log("here is rating int the cntroller ",rating);
    // Construct filters object
    const filters = {
      genre,
      rating,
      language,
    };

    // Log filters for debugging
    Logger.info("Fetching shows from TVmaze API", { query, filters });

    // Call the service to fetch data
    const results = await searchTVShowsWithFilters(query, filters);

    Logger.info("Search results fetched successfully", { resultsCount: results.length });

    // Send the results
    res.json(results);
  } catch (error) {
    Logger.error("Error fetching TV shows", { error });
    res.status(500).json({ error: "Error fetching TV shows" });
  }
};

// given a tv-show id we want to get a list of all episodes
export const getEpisodes: RequestHandler = async (req, res): Promise<void> => {
  try {
    const showId = parseInt(req.params.id);

    Logger.info(`Fetching episodes for show`, { showId });

    // Validate the show ID
    if (isNaN(showId)) {
      res.status(400).json({ error: "Invalid show ID" });
      return;
    }

    // Fetch episodes using the service
    const episodes = await getShowEpisodes(showId);

    Logger.info(`Episodes fetched successfully`, { showId, episodesCount: episodes.length });

    // Send the response
    res.json(episodes);
  } catch (error) {
     Logger.error("Error in getEpisodes", { error });
    res.status(500).json({ error: "Error fetching episodes" });
  }
};

export const getShowById: RequestHandler = async (req, res): Promise<void> => {
  try {
    const showId = parseInt(req.params.id);

    Logger.info(`Fetching details for show`, { showId });

    // Validate the show ID
    if (isNaN(showId)) {
      res.status(400).json({ error: "Invalid show ID" });
      return;
    }

    // Fetch show details using the service
    const showDetails = await getShowDetails(showId);

    Logger.info(`Show details fetched successfully`, { showId });

    // Send the response
    res.json(showDetails);
  } catch (error) {
    Logger.error("Error in getShowById", { error });
    res.status(500).json({ error: "Error fetching show details" });
  }
};

// Fetch all shows
export const getAllShows: RequestHandler = async (req, res): Promise<void> => {
  try {
    Logger.info("Fetching all shows");

    const page = parseInt(req.query.page as string) || 0; // Default to page 0
    const shows = await getAllShowsFromAPI(page);

    Logger.info("Shows fetched successfully", { count: shows.length });

    // Send the response
    res.json(shows);
  } catch (error) {
    Logger.error("Error in getAllShows", { error });
    res.status(500).json({ error: "Failed to fetch all shows" });
  }
};

// Get seasons for a specific show
export const getSeasonsByShow = async (req: Request, res: Response): Promise<void> => {
  try {
    const showId = parseInt(req.params.id);
    Logger.info(`Fetching seasons for show`, { showId });

    if (isNaN(showId)) {
      res.status(400).json({ error: "Invalid show ID" });
      return;
    }

    const seasons = await getSeasons(showId);
    res.json(seasons);
  } catch (error) {
    Logger.error("Error in getSeasonsByShow", { error });
    res.status(500).json({ error: "Failed to fetch seasons" });
  }
};

