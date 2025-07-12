import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const backdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const modal = {
  hidden: { y: 40, opacity: 0 },
  visible: { y: 0, opacity: 1 },
  exit: { y: 40, opacity: 0 },
};

const JobModal = ({ job, onClose }) => {
  return (
    <AnimatePresence>
      {job && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div
            variants={modal}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-white dark:bg-gray-800 p-6 rounded-xl max-w-2xl w-full shadow-lg relative overflow-y-auto max-h-[90vh]"
          >
            <button
              onClick={onClose}
              className="absolute top-2 right-3 text-xl font-bold text-gray-500 hover:text-gray-800 dark:hover:text-gray-100"
              aria-label="Close Job Modal"
            >
              &times;
            </button>

            <h2 className="text-2xl font-bold mb-1 text-gray-900 dark:text-white">
              {job.title}
            </h2>
            <p className="text-sm text-gray-500 mb-2">
              {job.company} — {job.location}
            </p>

            <div className="text-sm text-gray-700 dark:text-gray-300 mb-4 space-y-1">
              <p>
                <strong>Type:</strong> {job.type}
              </p>
              <p>
                <strong>Salary:</strong> {job.salary}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {job.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-100 text-xs font-medium px-2 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="prose dark:prose-invert text-sm max-w-none">
              <p className="mb-2">{job.description}</p>

              {job.about && (
                <>
                  <h3>About the Company</h3>
                  <p>{job.about}</p>
                </>
              )}

              {job.responsibilities && job.responsibilities.length > 0 && (
                <>
                  <h3>Responsibilities</h3>
                  <ul>
                    {job.responsibilities.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </>
              )}

              {job.requirements && job.requirements.length > 0 && (
                <>
                  <h3>Requirements</h3>
                  <ul>
                    {job.requirements.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </>
              )}

              {job.benefits && job.benefits.length > 0 && (
                <>
                  <h3>Benefits</h3>
                  <ul>
                    {job.benefits.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>

            {/* Sticky Apply Button */}
            <div className="sticky bottom-0 left-0 bg-white dark:bg-gray-800 border-t dark:border-gray-700 mt-6 pt-4 flex justify-end">
              <a
                href={job.applyLink || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-6 py-2 rounded-lg"
              >
                Apply Now
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default JobModal;
