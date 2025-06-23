import React, { useState } from 'react';
import { Grid, List, Map } from 'lucide-react';
import PropertyCard from '../components/PropertyCard';
import FilterPanel from '../components/FilterPanel';
import SearchBar from '../components/SearchBar';
import { useData } from '../context/DataContext';
import Footer from '../components/Footer';

const SearchPage = () => {
  const { getFilteredProperties } = useData();
  const [viewMode, setViewMode] = useState('grid');
  const filteredProperties = getFilteredProperties();

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Search Header */}
      <div className="bg-white shadow-sm py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SearchBar />
        </div>
      </div>

      {/* Filters and Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <FilterPanel />
            <div className="text-neutral-600">
              {filteredProperties.length} properties found
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md ${
                viewMode === 'grid'
                  ? 'bg-primary-500 text-white'
                  : 'bg-white text-neutral-600 hover:bg-neutral-100'
              }`}
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md ${
                viewMode === 'list'
                  ? 'bg-primary-500 text-white'
                  : 'bg-white text-neutral-600 hover:bg-neutral-100'
              }`}
            >
              <List className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`p-2 rounded-md ${
                viewMode === 'map'
                  ? 'bg-primary-500 text-white'
                  : 'bg-white text-neutral-600 hover:bg-neutral-100'
              }`}
            >
              <Map className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Results */}
        {viewMode === 'grid' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}

        {viewMode === 'list' && (
          <div className="space-y-6">
            {filteredProperties.map((property) => (
              <div key={property.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <img
                      src={property.images[0]}
                      alt={property.title}
                      className="w-full h-64 md:h-full object-cover"
                    />
                  </div>
                  <div className="md:w-2/3 p-6">
                    <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                      {property.title}
                    </h3>
                    <p className="text-neutral-600 mb-4 line-clamp-2">
                      {property.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-neutral-600">
                        <span>{property.maxGuests} guests</span>
                        <span>{property.bedrooms} bedrooms</span>
                        <span>{property.bathrooms} bathrooms</span>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary-500">
                          ${property.price}
                        </div>
                        <div className="text-sm text-neutral-600">per night</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {viewMode === 'map' && (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <Map className="h-16 w-16 text-neutral-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-neutral-900 mb-2">
              Map View Coming Soon
            </h3>
            <p className="text-neutral-600">
              Interactive map functionality will be available in the next update
            </p>
          </div>
        )}

        {filteredProperties.length === 0 && (
          <div className="text-center py-12">
            <div className="text-neutral-400 mb-4">
              <Grid className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-neutral-900 mb-2">
              No properties found
            </h3>
            <p className="text-neutral-600">
              Try adjusting your search criteria or filters
            </p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default SearchPage;
