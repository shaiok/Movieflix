import express, { Request, Response } from "express";
import cors from "cors";
import showRoutes from "./routes/showRoute"; // Import routes

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Mount routes
app.use("/api", showRoutes); // All routes under "/api" prefix

app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

// Catch-All for unmatched routes
app.use((req: Request, res: Response) => {
  console.error(`404 - Route not found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({ error: "Route not found" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
