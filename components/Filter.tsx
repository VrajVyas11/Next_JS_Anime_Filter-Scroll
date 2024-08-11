"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const Filter = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState({
    name: "",
    kind: "",
    score: "",
    status: "",
    episodes: "",
    aired_on: "",
    released_on: "",
  });

  const router = useRouter();

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  const handleFilterToggle = () => {
    setShowFilter(!showFilter);
  };

  const handleApplyFilter = () => {
    const queryParams = new URLSearchParams(filters as any);
    router.push(`/?${queryParams.toString()}`);
  };

  const handleRemoveFilter = () => {
    router.push("/");
    setFilters({
      name: "",
      kind: "",
      score: "",
      status: "",
      episodes: "",
      aired_on: "",
      released_on: "",
    });
  };

  return (
    <div className="relative">
      <button
        onClick={handleFilterToggle}
        className="bg-[linear-gradient(220.55deg,#4643DF_0%,#0B0A47_100%)] text-white py-2 px-4 rounded text-sm"
      >
        {showFilter ? "Hide Filter" : "Show Filter"}
      </button>
      {showFilter && (
        <div className="absolute top-full right-0 bg-gray-900 text-white p-4 rounded mt-2 shadow-lg w-64 sm:w-80">
          <input
            type="text"
            placeholder="Name"
            value={filters.name}
            onChange={(e) => setFilters({ ...filters, name: e.target.value })}
            className="block mb-2 p-2 bg-gray-800 w-full rounded text-sm"
          />
          <input
            type="text"
            placeholder="Kind"
            value={filters.kind}
            onChange={(e) => setFilters({ ...filters, kind: e.target.value })}
            className="block mb-2 p-2 bg-gray-800 w-full rounded text-sm"
          />
          <input
            type="number"
            min={0}
            step="0.1"
            placeholder="Score (e.g., 8.0)"
            value={filters.score}
            onChange={(e) => setFilters({ ...filters, score: e.target.value })}
            className="block mb-2 p-2 bg-gray-800 w-full rounded text-sm"
          />
          <input
            type="text"
            placeholder="Status"
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="block mb-2 p-2 bg-gray-800 w-full rounded text-sm"
          />
          <input
            type="number"
            min={0}
            placeholder="Episodes"
            value={filters.episodes}
            onChange={(e) => setFilters({ ...filters, episodes: e.target.value })}
            className="block mb-2 p-2 bg-gray-800 w-full rounded text-sm"
          />
          <input
            type="date"
            max={today}
            placeholder="Aired On"
            value={filters.aired_on}
            onChange={(e) => setFilters({ ...filters, aired_on: e.target.value })}
            className="block mb-2 p-2 bg-gray-800 w-full rounded text-sm"
          />
          <input
            type="date"
            max={today}
            placeholder="Released On"
            value={filters.released_on}
            onChange={(e) => setFilters({ ...filters, released_on: e.target.value })}
            className="block mb-2 p-2 bg-gray-800 w-full rounded text-sm"
          />
          <div className="flex justify-center items-center gap-4 mt-4">
            <button
              onClick={handleApplyFilter}
              className="bg-blue-600 text-white py-2 px-4 rounded text-sm w-1/2"
            >
              Apply
            </button>
            <button
              onClick={handleRemoveFilter}
              className="bg-red-600 text-white py-2 px-4 rounded text-sm w-1/2"
            >
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Filter;
