import React, { useMemo } from "react";
import jobs from "../data/jobs.json";
import JobCard from "../components/JobCard";

const SavedJobs = () => {
  const savedIds = JSON.parse(localStorage.getItem("savedJobs") || "[]");

  const savedJobs = useMemo(() => {
    return jobs.filter((job) => savedIds.includes(job.id));
  }, [savedIds]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Saved Jobs</h1>
      {savedJobs.length ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {savedJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">You haven't saved any jobs yet.</p>
      )}
    </div>
  );
};

export default SavedJobs;
