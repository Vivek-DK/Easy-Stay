import React, { useState } from 'react';
import { Search, MapPin, Calendar, Users } from 'lucide-react';
import { useData } from '../context/DataContext';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const { searchFilters, setSearchFilters } = useData();
  const navigate = useNavigate();
  const [localFilters, setLocalFilters] = useState(searchFilters);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchFilters(localFilters);
    navigate('/search');
  };

  const updateFilter = (key, value) => {
    setLocalFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <form
      onSubmit={handleSearch}
      className="bg-white rounded-full shadow-lg border border-neutral-200 p-2 max-w-4xl mx-auto"
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
        {/* Location */}
        <div className="relative flex items-center">
          <MapPin className="h-5 w-5 text-neutral-400 absolute left-4" />
          <input
            type="text"
            placeholder="Where are you going?"
            value={localFilters.location}
            onChange={(e) => updateFilter('location', e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-full border-0 focus:outline-none focus:ring-2 focus:ring-primary-500 text-neutral-700"
          />
        </div>

        {/* Check-in */}
        <div className="relative flex items-center">
          <Calendar className="h-5 w-5 text-neutral-400 absolute left-4" />
          <input
            type="date"
            value={localFilters.checkIn}
            onChange={(e) => updateFilter('checkIn', e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-full border-0 focus:outline-none focus:ring-2 focus:ring-primary-500 text-neutral-700"
          />
        </div>

        {/* Check-out */}
        <div className="relative flex items-center">
          <Calendar className="h-5 w-5 text-neutral-400 absolute left-4" />
          <input
            type="date"
            value={localFilters.checkOut}
            onChange={(e) => updateFilter('checkOut', e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-full border-0 focus:outline-none focus:ring-2 focus:ring-primary-500 text-neutral-700"
          />
        </div>

        {/* Guests & Search */}
        <div className="flex items-center space-x-2">
          <div className="relative flex items-center flex-1">
            <Users className="h-5 w-5 text-neutral-400 absolute left-4" />
            <select
              value={localFilters.guests}
              onChange={(e) => updateFilter('guests', parseInt(e.target.value))}
              className="w-full pl-12 pr-4 py-3 rounded-full border-0 focus:outline-none focus:ring-2 focus:ring-primary-500 text-neutral-700 appearance-none"
            >
              {[...Array(10)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1} {i === 0 ? 'Guest' : 'Guests'}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="bg-primary-500 text-white p-3 rounded-full hover:bg-primary-600 transition-colors flex-shrink-0"
          >
            <Search className="h-5 w-5" />
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
