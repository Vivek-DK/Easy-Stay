import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Star, MapPin, Users, Bed, Bath, Wifi, Car, Waves,
  ChevronLeft, ChevronRight, Calendar, Heart
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import Footer from '../components/Footer';

const PropertyDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { properties, createBooking } = useData();
  const { user } = useAuth();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [isBooking, setIsBooking] = useState(false);

  const property = properties.find(p => p.id === id);

  if (!property) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">Property Not Found</h2>
          <button
            onClick={() => navigate('/search')}
            className="bg-primary-500 text-white px-6 py-2 rounded-lg hover:bg-primary-600"
          >
            Back to Search
          </button>
        </div>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  const handleBooking = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (!checkIn || !checkOut) {
      alert('Please select check-in and check-out dates');
      return;
    }

    setIsBooking(true);

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
    const totalPrice = nights * property.price;

    try {
      createBooking({
        propertyId: property.id,
        guestId: user.id,
        checkIn,
        checkOut,
        guests,
        totalPrice,
        status: 'confirmed',
      });

      await new Promise(resolve => setTimeout(resolve, 1500));

      alert('Booking confirmed! Check your dashboard for details.');
      navigate('/dashboard');
    } catch (error) {
      alert('Booking failed. Please try again.');
    } finally {
      setIsBooking(false);
    }
  };

  const amenityIcons = {
    'WiFi': <Wifi className="h-5 w-5" />,
    'Parking': <Car className="h-5 w-5" />,
    'Beach Access': <Waves className="h-5 w-5" />,
  };

  const nights = checkIn && checkOut
    ? Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24))
    : 0;
  const totalPrice = nights * property.price;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-neutral-900">{property.title}</h1>
            <button className="flex items-center space-x-2 text-neutral-600 hover:text-primary-500">
              <Heart className="h-5 w-5" />
              <span>Save</span>
            </button>
          </div>
          <div className="flex items-center space-x-4 text-neutral-600">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
              <span className="font-medium">{property.rating}</span>
              <span className="ml-1">({property.reviewCount} reviews)</span>
            </div>
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{property.location.city}, {property.location.country}</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="relative mb-8">
              <div className="relative h-96 rounded-lg overflow-hidden">
                <img
                  src={property.images[currentImageIndex]}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
                {property.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnails */}
              {property.images.length > 1 && (
                <div className="flex space-x-2 mt-4">
                  {property.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                        index === currentImageIndex ? 'border-primary-500' : 'border-transparent'
                      }`}
                    >
                      <img src={image} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Property Details */}
            <div className="space-y-8">
              <div className="pb-8 border-b border-neutral-200">
                <div className="flex items-center space-x-6 mb-4">
                  <div className="flex items-center text-neutral-600">
                    <Users className="h-5 w-5 mr-2" />
                    <span>{property.maxGuests} guests</span>
                  </div>
                  <div className="flex items-center text-neutral-600">
                    <Bed className="h-5 w-5 mr-2" />
                    <span>{property.bedrooms} bedrooms</span>
                  </div>
                  <div className="flex items-center text-neutral-600">
                    <Bath className="h-5 w-5 mr-2" />
                    <span>{property.bathrooms} bathrooms</span>
                  </div>
                </div>
                <p className="text-neutral-700 leading-relaxed">{property.description}</p>
              </div>

              {/* Amenities */}
              <div className="pb-8 border-b border-neutral-200">
                <h3 className="text-xl font-semibold text-neutral-900 mb-4">Amenities</h3>
                <div className="grid grid-cols-2 gap-4">
                  {property.amenities.map((amenity) => (
                    <div key={amenity} className="flex items-center space-x-3">
                      <div className="text-primary-500">
                        {amenityIcons[amenity] || <span className="w-5 h-5 bg-primary-500 rounded-full" />}
                      </div>
                      <span className="text-neutral-700">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-4">Location</h3>
                <div className="bg-neutral-100 rounded-lg p-8 text-center">
                  <MapPin className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
                  <p className="text-neutral-700">
                    {property.location.address}<br />
                    {property.location.city}, {property.location.country}
                  </p>
                  <p className="text-sm text-neutral-500 mt-2">Interactive map coming soon</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Booking */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-white border border-neutral-200 rounded-lg shadow-lg p-6">
                <div className="flex items-baseline justify-between mb-6">
                  <div>
                    <span className="text-3xl font-bold text-primary-500">${property.price}</span>
                    <span className="text-neutral-600 ml-1">per night</span>
                  </div>
                  <div className="flex items-center text-sm text-neutral-600">
                    <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                    <span>{property.rating}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Dates */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1">Check-in</label>
                      <input
                        type="date"
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500"
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1">Check-out</label>
                      <input
                        type="date"
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500"
                        min={checkIn || new Date().toISOString().split('T')[0]}
                      />
                    </div>
                  </div>

                  {/* Guests */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Guests</label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500"
                    >
                      {[...Array(property.maxGuests)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1} {i === 0 ? 'guest' : 'guests'}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Price Summary */}
                  {nights > 0 && (
                    <div className="pt-4 border-t border-neutral-200">
                      <div className="flex justify-between text-sm text-neutral-600 mb-2">
                        <span>${property.price} × {nights} nights</span>
                        <span>${property.price * nights}</span>
                      </div>
                      <div className="flex justify-between font-semibold text-neutral-900">
                        <span>Total</span>
                        <span>${totalPrice}</span>
                      </div>
                    </div>
                  )}

                  {/* Book Now Button */}
                  <button
                    onClick={handleBooking}
                    disabled={isBooking || !checkIn || !checkOut}
                    className="w-full bg-primary-500 text-white py-3 rounded-lg font-semibold hover:bg-primary-600 disabled:bg-neutral-400 disabled:cursor-not-allowed"
                  >
                    {isBooking ? 'Booking...' : user ? 'Book Now' : 'Login to Book'}
                  </button>

                  {!user && (
                    <p className="text-sm text-neutral-500 text-center">
                      You need to be logged in to make a booking
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PropertyDetailPage;
