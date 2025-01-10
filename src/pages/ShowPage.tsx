import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchShowById, fetchSeasons, fetchEpisodes } from "@/lib/api";
import { ArrowLeft, Star, Clock } from "lucide-react";
import { Episode, Season, ShowExtend as Show } from "@/lib/interfaces";



const DEFAULT_THUMBNAIL = "https://via.placeholder.com/150?text=No+Image";

const ShowPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [show, setShow] = useState<Show | null>(null);
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [selectedSeason, setSelectedSeason] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchShowData = async () => {
      if (!id) {
        setError("Invalid show ID");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const fetchedShow = await fetchShowById(Number(id));
        setShow(fetchedShow);

        const fetchedSeasons = await fetchSeasons(Number(id));
        setSeasons(fetchedSeasons);

        if (fetchedSeasons.length > 0) {
          setSelectedSeason(fetchedSeasons[0].seasonNumber);
          const fetchedEpisodes = await fetchEpisodes(Number(id));
          const seasonEpisodes = fetchedEpisodes
            .filter((episode: { season: any }) => episode.season === fetchedSeasons[0].seasonNumber)
            .map((episode: { id: any; name: any; summary: string; runtime: any; image: { medium: any; }; }, index: number) => ({
              id: episode.id,
              title: `${index + 1}. ${episode.name}`,
              description: episode.summary?.replace(/<\/?[^>]+(>|$)/g, "") || "No description",
              duration: `${episode.runtime || 0} minutes`,
              thumbnail: episode.image?.medium || DEFAULT_THUMBNAIL,
              number: index + 1,
            }));
          setEpisodes(seasonEpisodes);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch show details. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchShowData();
  }, [id]);

  const handleSeasonChange = async (seasonNumber: number) => {
    setSelectedSeason(seasonNumber);
    try {
      const fetchedEpisodes = await fetchEpisodes(Number(id));
      const seasonEpisodes = fetchedEpisodes
        .filter((episode: { season: any }) => episode.season === seasonNumber)
        .map((episode: { id: any; name: any; summary: string; runtime: any; image: { medium: any; }; }, index: number) => ({
          id: episode.id,
          title: `${index + 1}. ${episode.name}`,
          description: episode.summary?.replace(/<\/?[^>]+(>|$)/g, "") || "No description",
          duration: `${episode.runtime || 0} minutes`,
          thumbnail: episode.image?.medium || DEFAULT_THUMBNAIL,
          number: index + 1,
        }));
      setEpisodes(seasonEpisodes);
    } catch (err) {
      console.error("Error fetching episodes for the selected season:", err);
      setError("Failed to fetch episodes for the selected season.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500 dark:text-gray-400">Loading show details...</p>
      </div>
    );
  }

  if (error || !show) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">{error || "Show not found."}</p>
        <button
          onClick={() => navigate(-1)}
          className="ml-4 px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="relative h-[70vh]">
        <img src={show.coverImage} alt={show.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
        <button
          onClick={() => navigate(-1)}
          className="absolute top-24 left-8 text-gray-800 dark:text-white flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          <ArrowLeft size={24} />
          <span>Back</span>
        </button>
        <div className="absolute bottom-0 left-0 p-8 max-w-3xl">
          <h1 className="text-5xl font-bold text-white mb-4">{show.title}</h1>
          <div className="flex items-center gap-4 text-white mb-4">
            <span>{show.year}</span>
            <span className="text-teal-400 flex items-center gap-1">
              <Star size={16} className="fill-teal-400" /> {show.rating}
            </span>
            <span>{show.language}</span>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {show.genres.map((genre, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-800/60 rounded-full text-sm text-white"
              >
                {genre}
              </span>
            ))}
          </div >
          <p className="text-gray-200 text-lg mb-6 w-full line-clamp-6 ">{show.description}</p>
        </div>
      </div>

      <section className="px-8 py-12 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Episodes</h2>
            <select
              value={selectedSeason || ""}
              onChange={(e) => handleSeasonChange(Number(e.target.value))}
              className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-md text-gray-900 dark:text-white border-0"
            >
              {seasons.map((season) => (
                <option key={season.id} value={season.seasonNumber}>
                  Season {season.seasonNumber}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-4">
            {episodes.map((episode) => (
              <div
                key={episode.id}
                className="flex gap-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <img
                  src={episode.thumbnail}
                  alt={episode.title}
                  className="w-48 h-28 object-cover rounded"
                />
                <div className="flex-grow">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      {episode.title}
                    </h3>
                    <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                      <Clock size={14} />
                      {episode.duration}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mt-1">{episode.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ShowPage;
