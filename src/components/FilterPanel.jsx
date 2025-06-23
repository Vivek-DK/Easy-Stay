import React, { useState } from 'react';
import { Filter, X } from 'lucide-react';
import { useData } from '../context/DataContext';

const FilterPanel = () => {
  const { searchFilters, setSearchFilters } = useData();
  const [isOpen, setIsOpen] = useState(false);
  const [localFilters, setLocalFilters] = useState(searchFilters);

  const propertyTypes = [
    { id: 'apartment', label: 'Apartment' },
    { id: 'house', label: 'House' },
    { id: 'villa', label: 'Villa' },
    { id: 'condo', label: 'Condo' },
    { id: 'cabin', label: 'Cabin' },
    { id: 'other', label: 'Other' },
  ];

  const amenities = [
    'WiFi',
    'Pool',
    'Kitchen',
    'Parking',
    'Air Conditioning',
    'Heating',
    'Fireplace',
    'Hot Tub',
    'Gym',
    'Beach Access',
    'Concierge',
  ];

  const handleApplyFilters = () => {
    setSearchFilters(localFilters);
    setIsOpen(false);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      ...localFilters,
      minPrice: 0,
      maxPrice: 1000,
      propertyType: '',
      amenities: [],
    };
    setLocalFilters(clearedFilters);
    setSearchFilters(clearedFilters);
  };

  const toggleAmenity = (amenity) => {
    setLocalFilters((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center space-x-2 px-4 py-2 border border-neutral-300 rounded-lg hover:shadow-md transition-shadow"
      >
        <Filter className="h-4 w-4" />
        <span>Filters</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
            <div className="flex items-center justify-between p-6 border-b border-neutral-200">
              <h2 className="text-xl font-semibold text-neutral-900">Filters</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-neutral-100 rounded-full"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-medium text-neutral-900 mb-4">Price Range</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Min Price
                    </label>
                    <input
                      type="number"
                      value={localFilters.minPrice}
                      onChange={(e) =>
                        setLocalFilters((prev) => ({
                          ...prev,
                          minPrice: parseInt(e.target.value) || 0,
                        }))
                      }
                      className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Max Price
                    </label>
                    <input
                      type="number"
                      value={localFilters.maxPrice}
                      onChange={(e) =>
                        setLocalFilters((prev) => ({
                          ...prev,
                          maxPrice: parseInt(e.target.value) || 1000,
                        }))
                      }
                      className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      min="0"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-neutral-900 mb-4">Property Type</h3>
                <div className="grid grid-cols-2 gap-3">
                  {propertyTypes.map((type) => (
                    <label key={type.id} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="propertyType"
                        value={type.id}
                        checked={localFilters.propertyType === type.id}
                        onChange={(e) =>
                          setLocalFilters((prev) => ({
                            ...prev,
                            propertyType: e.target.value,
                          }))
                        }
                        className="text-primary-500 focus:ring-primary-500"
                      />
                      <span className="text-sm text-neutral-700">{type.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-neutral-900 mb-4">Amenities</h3>
                <div className="grid grid-cols-2 gap-3">
                  {amenities.map((amenity) => (
                    <label key={amenity} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={localFilters.amenities.includes(amenity)}
                        onChange={() => toggleAmenity(amenity)}
                        className="text-primary-500 focus:ring-primary-500"
                      />
                      <span className="text-sm text-neutral-700">{amenity}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-6 border-t border-neutral-200">
              <button
                onClick={handleClearFilters}
                className="text-primary-500 hover:text-primary-600 font-medium"
              >
                Clear All
              </button>
              <div className="flex space-x-3">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 border border-neutral-300 rounded-lg hover:bg-neutral-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleApplyFilters}
                  className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FilterPanel;
