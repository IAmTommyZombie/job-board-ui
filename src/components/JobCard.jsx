import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";

const JobCard = ({ job }) => {
  const [savedJobs, setSavedJobs] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("savedJobs") || "[]");
    setSavedJobs(saved);
  }, []);

  const isSaved = savedJobs.includes(job.id);

  const toggleSave = (e) => {
    e.preventDefault();
    let updatedSaved;
    if (isSaved) {
      updatedSaved = savedJobs.filter((id) => id !== job.id);
    } else {
      updatedSaved = [...savedJobs, job.id];
    }
    setSavedJobs(updatedSaved);
    localStorage.setItem("savedJobs", JSON.stringify(updatedSaved));
  };

  const formatDate = (dateString) => {
    if (!dateString) return null;
    const options = { year: "numeric", month: "short", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  };

  // Check if job is new (posted within last 3 days)
  const isNewJob = (dateString) => {
    if (!dateString) return false;
    const postedDate = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - postedDate);
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    return diffDays <= 3;
  };

  return (
    <div
      className="relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 
                 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer p-6 mb-5"
    >
      {/* Save/Bookmark */}
      <button
        onClick={toggleSave}
        aria-label={isSaved ? "Unsave job" : "Save job"}
        className="absolute top-5 right-5 bg-gray-100 dark:bg-gray-800 rounded-full p-2 
                   text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 
                   shadow hover:shadow-lg transition"
      >
        {isSaved ? <FaBookmark size={22} /> : <FaRegBookmark size={22} />}
      </button>

      <Link to={`/jobs/${job.id}`} className="block space-y-2">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
          {job.title}
        </h2>
        <div className="flex flex-wrap items-center text-gray-600 dark:text-gray-400 text-sm font-medium space-x-2">
          <span>{job.company}</span>
          <span className="mx-1">·</span>
          <span>{job.location}</span>
        </div>

        {job.stats?.postedAt && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 select-none flex items-center gap-2">
            <span>Posted: {formatDate(job.stats.postedAt)}</span>
            {isNewJob(job.stats.postedAt) && (
              <span className="inline-block bg-green-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded uppercase select-none">
                🆕 New
              </span>
            )}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-3 mt-2">
          {job.salary && (
            <span className="bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 text-xs font-semibold px-3 py-1 rounded-full select-none">
              {job.salary}
            </span>
          )}
          {job.type && (
            <span className="bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 text-xs font-semibold px-3 py-1 rounded-full select-none">
              {job.type}
            </span>
          )}
        </div>

        {job.benefits && job.benefits.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {job.benefits.map((benefit, index) => (
              <span
                key={index}
                className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-medium px-2 py-1 rounded-full select-none"
              >
                {benefit}
              </span>
            ))}
          </div>
        )}
      </Link>
    </div>
  );
};

export default JobCard;
