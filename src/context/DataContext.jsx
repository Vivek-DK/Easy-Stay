import React, { createContext, useContext, useState } from 'react';

const DataContext = createContext(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

// Mock data
const mockProperties = [
  {
    id: '1',
    title: 'Luxury Beachfront Villa',
    description: 'A stunning beachfront villa with panoramic ocean views, private beach access, and world-class amenities.',
    location: {
      address: '123 Ocean Drive',
      city: 'Malibu',
      country: 'United States',
      coordinates: { lat: 34.0259, lng: -118.7798 }
    },
    price: 450,
    images: [
      'https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg',
      'https://images.pexels.com/photos/2082087/pexels-photo-2082087.jpeg',
      'https://images.pexels.com/photos/2635038/pexels-photo-2635038.jpeg'
    ],
    amenities: ['WiFi', 'Pool', 'Beach Access', 'Parking', 'Kitchen', 'Air Conditioning'],
    propertyType: 'villa',
    bedrooms: 4,
    bathrooms: 3,
    maxGuests: 8,
    hostId: '1',
    rating: 4.9,
    reviewCount: 127,
    availableDates: [],
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Cozy Mountain Cabin',
    description: 'Perfect retreat in the mountains with fireplace, hot tub, and hiking trails right outside your door.',
    location: {
      address: '456 Pine Ridge Road',
      city: 'Aspen',
      country: 'United States',
      coordinates: { lat: 39.1911, lng: -106.8175 }
    },
    price: 220,
    images: [
      'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg',
      'https://images.pexels.com/photos/2724748/pexels-photo-2724748.jpeg',
      'https://images.pexels.com/photos/2343468/pexels-photo-2343468.jpeg'
    ],
    amenities: ['WiFi', 'Fireplace', 'Hot Tub', 'Parking', 'Kitchen', 'Heating'],
    propertyType: 'cabin',
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 4,
    hostId: '2',
    rating: 4.7,
    reviewCount: 89,
    availableDates: [],
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    title: 'Modern Downtown Apartment',
    description: 'Stylish apartment in the heart of the city with spectacular skyline views and premium amenities.',
    location: {
      address: '789 Urban Plaza',
      city: 'New York',
      country: 'United States',
      coordinates: { lat: 40.7128, lng: -74.0060 }
    },
    price: 180,
    images: [
      'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg',
      'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg',
      'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg'
    ],
    amenities: ['WiFi', 'Gym', 'Concierge', 'Parking', 'Kitchen', 'Air Conditioning'],
    propertyType: 'apartment',
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    hostId: '3',
    rating: 4.6,
    reviewCount: 203,
    availableDates: [],
    createdAt: new Date().toISOString()
  }
];

export const DataProvider = ({ children }) => {
  const [properties, setProperties] = useState(mockProperties);
  const [bookings, setBookings] = useState([]);
  const [searchFilters, setSearchFilters] = useState({
    location: '',
    checkIn: '',
    checkOut: '',
    guests: 1,
    minPrice: 0,
    maxPrice: 1000,
    propertyType: '',
    amenities: []
  });

  const addProperty = (property) => {
    const newProperty = {
      ...property,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setProperties(prev => [...prev, newProperty]);
  };

  const updateProperty = (id, updatedProperty) => {
    setProperties(prev => prev.map(p => p.id === id ? { ...p, ...updatedProperty } : p));
  };

  const deleteProperty = (id) => {
    setProperties(prev => prev.filter(p => p.id !== id));
  };

  const createBooking = (booking) => {
    const newBooking = {
      ...booking,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setBookings(prev => [...prev, newBooking]);
  };

  const cancelBooking = (id) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'cancelled' } : b));
  };

  const getFilteredProperties = () => {
    return properties.filter(property => {
      const matchesLocation = !searchFilters.location ||
        property.location.city.toLowerCase().includes(searchFilters.location.toLowerCase()) ||
        property.location.country.toLowerCase().includes(searchFilters.location.toLowerCase());

      const matchesGuests = property.maxGuests >= searchFilters.guests;

      const matchesPrice = property.price >= searchFilters.minPrice && property.price <= searchFilters.maxPrice;

      const matchesType = !searchFilters.propertyType || property.propertyType === searchFilters.propertyType;

      const matchesAmenities = searchFilters.amenities.length === 0 ||
        searchFilters.amenities.every(amenity => property.amenities.includes(amenity));

      return matchesLocation && matchesGuests && matchesPrice && matchesType && matchesAmenities;
    });
  };

  return (
    <DataContext.Provider value={{
      properties,
      bookings,
      searchFilters,
      setSearchFilters,
      addProperty,
      updateProperty,
      deleteProperty,
      createBooking,
      cancelBooking,
      getFilteredProperties
    }}>
      {children}
    </DataContext.Provider>
  );
};
