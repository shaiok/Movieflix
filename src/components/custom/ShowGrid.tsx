import React, { useState } from "react";
import ShowCard from "./ShowCard";
import { Show } from "@/pages/HomePage";

interface ShowGridProps {
  shows: Show[];
  onFavoriteToggle: (id: number) => void;
  onShowInfo: (id: number) => void;
}

const ShowGrid: React.FC<ShowGridProps> = ({
  shows,
  onShowInfo,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const showsPerPage = 20;

  const totalPages = Math.ceil(shows.length / showsPerPage);
  const startIndex = (currentPage - 1) * showsPerPage;
  const currentShows = shows.slice(startIndex, startIndex + showsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-900">
      {/* Shows */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {currentShows.map((show) => (
          <ShowCard
            key={show.id}
            show={show}
            
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-6">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="px-4 py-2 mr-2 bg-gray-300 dark:bg-gray-700 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-4 py-2">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 ml-2 bg-gray-300 dark:bg-gray-700 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ShowGrid;
