import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Users, Bed, Bath } from 'lucide-react';

const PropertyCard = ({ property }) => {
  return (
    <Link to={`/property/${property.id}`} className="group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 animate-fade-in">
        {/* Image Carousel */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={property.images[0]}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium text-neutral-700">
              {property.rating}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-lg font-semibold text-neutral-900 group-hover:text-primary-500 transition-colors line-clamp-2">
              {property.title}
            </h3>
          </div>

          <div className="flex items-center text-neutral-600 mb-3">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="text-sm">
              {property.location.city}, {property.location.country}
            </span>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4 text-sm text-neutral-600">
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                <span>{property.maxGuests}</span>
              </div>
              <div className="flex items-center">
                <Bed className="h-4 w-4 mr-1" />
                <span>{property.bedrooms}</span>
              </div>
              <div className="flex items-center">
                <Bath className="h-4 w-4 mr-1" />
                <span>{property.bathrooms}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-primary-500">
                ${property.price}
              </span>
              <span className="text-neutral-600 ml-1">/night</span>
            </div>
            <div className="flex items-center text-sm text-neutral-500">
              <span>{property.reviewCount} reviews</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
