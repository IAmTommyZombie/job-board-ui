import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import JobDetail from "./pages/JobDetail";
import SavedJobs from "./pages/SavedJobs";
import { useDarkMode } from "./hooks/useDarkMode";

function App() {
  const [darkMode, setDarkMode] = useDarkMode();

  return (
    <Router basename="/job-board-ui">
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <header className="bg-white dark:bg-gray-800 shadow p-4">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <Link to="/" className="text-xl font-bold">
              Looking for Work
            </Link>
            <div className="space-x-4 text-sm">
              <Link to="/" className="hover:underline">
                Home
              </Link>
              <Link to="/saved" className="hover:underline">
                Saved Jobs
              </Link>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="border px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {darkMode ? "☀️" : "🌙"}
              </button>
            </div>
          </div>
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobs/:id" element={<JobDetail />} />
          <Route path="/saved" element={<SavedJobs />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
