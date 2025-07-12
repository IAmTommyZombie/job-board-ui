import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import jobs from "../data/jobs.json";

export default function JobDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const job = jobs.find((j) => j.id === parseInt(id));

  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    if (!job) return;

    // Calculate if postedAt is within last 3 days to show "New" badge
    const postedDate = new Date(job.stats.postedAt);
    const now = new Date();
    const diffTime = Math.abs(now - postedDate);
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    setIsNew(diffDays <= 3);
  }, [job]);

  if (!job) return <div className="p-6 text-center">Job not found.</div>;

  const renderSection = (title, content) => {
    if (!content) return null;
    if (Array.isArray(content)) {
      return (
        <section className="mb-6">
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <ul className="list-disc list-inside space-y-1 text-sm">
            {content.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </section>
      );
    }
    return (
      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm">{content}</p>
      </section>
    );
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-blue-600 hover:underline text-sm"
      >
        ← Back
      </button>

      <div className="flex items-center space-x-3 mb-2">
        <h1 className="text-3xl font-bold">{job.title}</h1>
        {isNew && (
          <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full font-semibold">
            🆕 New
          </span>
        )}
      </div>

      <p className="text-gray-600 dark:text-gray-300 mb-2">
        {job.company} — {job.location}
      </p>

      <p className="text-sm font-semibold mb-4">Salary: {job.salary}</p>

      <div className="flex flex-wrap gap-2 mb-6">
        {job.tags.map((tag, i) => (
          <span
            key={i}
            className="bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-100 text-xs font-semibold px-2 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mb-6 flex space-x-6 text-sm text-gray-600 dark:text-gray-400">
        <div>
          <span className="font-semibold">{job.stats.applicantsToday}</span>{" "}
          applicants today
        </div>
        <div>
          <span className="font-semibold">
            {Math.floor(
              (new Date() - new Date(job.stats.postedAt)) /
                (1000 * 60 * 60 * 24)
            )}
          </span>{" "}
          days posted
        </div>
        <div>
          <span className="font-semibold">{job.stats.views}</span> views
        </div>
      </div>

      {renderSection("Job Description", job.description)}
      {renderSection(`About ${job.company}`, job.about)}
      {renderSection("Responsibilities", job.responsibilities)}
      {renderSection("Requirements", job.requirements)}
      {renderSection("Benefits", job.benefits)}

      <a
        href={job.applyLink}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-block bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors"
      >
        Apply Now
      </a>
    </div>
  );
}
