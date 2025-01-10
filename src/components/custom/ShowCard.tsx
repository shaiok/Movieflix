import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Star } from "lucide-react";
import { addFavoriteShow, removeFavoriteShow, isFavoriteShow } from "@/lib/favorites";
import { Show } from "@/lib/interfaces";


interface ShowCardProps {
  show: Show; // Pass the full show object
}

const ShowCard: React.FC<ShowCardProps> = ({ show }) => {
  const [isFavorite, setIsFavorite] = useState(false); // Default to false
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the show is a favorite
    setIsFavorite(isFavoriteShow(show.id));
  }, [show.id]);

  const handleFavoriteClick = () => {
    if (isFavorite) {
      removeFavoriteShow(show.id);
    } else {
      addFavoriteShow(show);
    }
    setIsFavorite(!isFavorite);
  };

  const handleImageClick = () => {
    navigate(`/shows/${show.id}`);
  };

  return (
    <div
      className="relative rounded-lg overflow-hidden group cursor-pointer bg-gray-100 dark:bg-gray-800 shadow-md hover:shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105"
    >
      {/* Image Section */}
      <div
        className="relative transition-transform duration-300"
        onClick={handleImageClick}
      >
        <img
          src={show.image}
          alt={show.title || "No Title"}
          className="w-full h-[200px] object-cover rounded-t-lg"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-4">
          <h3 className="text-lg font-bold text-white truncate">{show.title}</h3>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="text-sm text-white flex items-center gap-1">
                <Star size={14} className="fill-teal-400" /> {show.rating}
              </span>
              <span className="text-sm text-gray-300">{show.year}</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {show.genres.map((genre, index) => (
                <span
                  key={index}
                  className="text-xs text-gray-300 bg-gray-900/50 dark:bg-gray-800/50 px-2 py-0.5 rounded-full"
                >
                  {genre}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Favorite Button (Visible on Hover) */}
      <div
        className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleFavoriteClick();
          }}
          className={`p-2 rounded-full transition-colors shadow-md ${
            isFavorite
              ? "bg-teal-600 dark:bg-teal-500"
              : "bg-gray-300 dark:bg-gray-700"
          } hover:bg-teal-500 dark:hover:bg-teal-400`}
        >
          <Star
            size={20}
            className={isFavorite ? "text-white fill-white" : ""}
          />
        </button>
      </div>
    </div>
  );
};

export default ShowCard;
