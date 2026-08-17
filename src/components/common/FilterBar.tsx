import React from 'react';
import { Search, Filter, RotateCcw } from 'lucide-react';
import { useMeeting } from '../../context/MeetingContext';

interface FilterBarProps {
  categories?: string[];
  owners?: string[];
  showCategories?: boolean;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  categories = [],
  owners = [],
  showCategories = true
}) => {
  const {
    searchTerm,
    setSearchTerm,
    filterPriority,
    setFilterPriority,
    filterStatus,
    setFilterStatus,
    filterCategory,
    setFilterCategory,
    filterOwner,
    setFilterOwner
  } = useMeeting();

  const hasActiveFilters =
    searchTerm !== '' ||
    filterPriority !== 'all' ||
    filterStatus !== 'all' ||
    filterCategory !== 'all' ||
    filterOwner !== 'all';

  const resetFilters = () => {
    setSearchTerm('');
    setFilterPriority('all');
    setFilterStatus('all');
    setFilterCategory('all');
    setFilterOwner('all');
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl mb-4 text-xs">
      {/* Search Input */}
      <div className="relative flex-1 min-w-[200px]">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="Search by ID, keyword, description, owner..."
          className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-300 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-xs"
        />
      </div>

      {/* Filters Group */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="flex items-center gap-1 text-slate-500 font-medium mr-1">
          <Filter className="w-3.5 h-3.5" /> Filter:
        </span>

        {/* Priority Filter */}
        <select
          value={filterPriority}
          onChange={e => setFilterPriority(e.target.value)}
          className="px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs"
        >
          <option value="all">Priority: All</option>
          <option value="Critical">Critical</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        {/* Status Filter */}
        <select
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value)}
          className="px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs"
        >
          <option value="all">Status: All</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Pending">Pending</option>
          <option value="Proposed">Proposed</option>
          <option value="Rejected">Rejected</option>
          <option value="Open">Open</option>
          <option value="Answered">Answered</option>
          <option value="In Progress">In Progress</option>
        </select>

        {/* Category Filter */}
        {showCategories && categories.length > 0 && (
          <select
            value={filterCategory}
            onChange={e => setFilterCategory(e.target.value)}
            className="px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs"
          >
            <option value="all">Category: All</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        )}

        {/* Owner Filter */}
        {owners.length > 0 && (
          <select
            value={filterOwner}
            onChange={e => setFilterOwner(e.target.value)}
            className="px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs"
          >
            <option value="all">Owner: All</option>
            {owners.map(owner => (
              <option key={owner} value={owner}>
                {owner}
              </option>
            ))}
          </select>
        )}

        {/* Reset Button */}
        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 text-slate-600 bg-slate-200 hover:bg-slate-300 rounded-lg font-medium transition-colors"
          >
            <RotateCcw className="w-3 h-3" /> Reset
          </button>
        )}
      </div>
    </div>
  );
};
