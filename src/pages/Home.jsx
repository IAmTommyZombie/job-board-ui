import React, { useState, useMemo } from "react";
import jobs from "../data/jobs.json";
import JobCard from "../components/JobCard";
import SearchBar from "../components/SearchBar";
import FilterTags from "../components/FilterTags";
import JobModal from "../components/JobModal";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);

  const allTags = useMemo(() => {
    const tags = new Set();
    jobs.forEach((job) => job.tags.forEach((tag) => tags.add(tag)));
    return [...tags];
  }, []);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesTag = selectedTag ? job.tags.includes(selectedTag) : true;

      return matchesSearch && matchesTag;
    });
  }, [searchTerm, selectedTag]);

  return (
    <main className="p-6 max-w-6xl mx-auto">
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <FilterTags
        tags={allTags}
        selectedTag={selectedTag}
        setSelectedTag={setSelectedTag}
      />
      <JobModal job={selectedJob} onClose={() => setSelectedJob(null)} />

      <div className="grid gap-6 mt-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredJobs.length ? (
          filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} onClick={setSelectedJob} />
          ))
        ) : (
          <p className="text-gray-500">No matching jobs found.</p>
        )}
      </div>
    </main>
  );
};

export default Home;
