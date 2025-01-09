import { Router } from "express";
import { searchShows, getEpisodes, getShowById, getAllShows, getSeasonsByShow } from "../controllers/showController";
import { Logger } from "../utils/logger";

const router = Router();

// Middleware to log all incoming requests for this route
router.use((req, res, next) => {
  Logger.info(`Incoming request`, {
    method: req.method,
    url: req.originalUrl,
    params: req.params,
    query: req.query,
  });
  next();
});

// Search for shows with filters
router.get("/search", searchShows);

// Get details for a specific show
router.get("/shows/:id", getShowById);

// Get episodes for a specific show
router.get("/shows/:id/episodes", getEpisodes);

// Get all shows
router.get("/shows", getAllShows);

// Get seasons for a specific show
router.get("/shows/:id/seasons", getSeasonsByShow);




export default router;
