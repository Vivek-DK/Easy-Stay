import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Calendar, Home, Users, Star, Edit, Trash2, Eye } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { format } from 'date-fns';
import Footer from '../components/Footer';

const DashboardPage = () => {
  const { user } = useAuth();
  const { properties, bookings, deleteProperty } = useData();
  const [activeTab, setActiveTab] = useState('bookings');

  const userProperties = properties.filter(p => p.hostId === user?.id);
  const userBookings = bookings.filter(b => b.guestId === user?.id);
  const propertyBookings = bookings.filter(b =>
    userProperties.some(p => p.id === b.propertyId)
  );

  const handleDeleteProperty = (propertyId) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      deleteProperty(propertyId);
    }
  };

  const getPropertyById = (id) => properties.find(p => p.id === id);

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">
            Welcome back, {user?.firstName}!
          </h1>
          <p className="text-neutral-600">
            Manage your bookings and properties from your dashboard
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-600">Total Bookings</p>
                <p className="text-2xl font-bold text-primary-500">{userBookings.length}</p>
              </div>
              <Calendar className="h-8 w-8 text-primary-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-600">Properties Listed</p>
                <p className="text-2xl font-bold text-secondary-500">{userProperties.length}</p>
              </div>
              <Home className="h-8 w-8 text-secondary-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-600">Property Bookings</p>
                <p className="text-2xl font-bold text-accent-500">{propertyBookings.length}</p>
              </div>
              <Users className="h-8 w-8 text-accent-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-600">Average Rating</p>
                <p className="text-2xl font-bold text-yellow-500">
                  {userProperties.length > 0
                    ? (
                        userProperties.reduce((sum, p) => sum + p.rating, 0) / userProperties.length
                      ).toFixed(1)
                    : '0.0'}
                </p>
              </div>
              <Star className="h-8 w-8 text-yellow-500" />
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex space-x-4 mb-8">
          <Link
            to="/host/add-property"
            className="flex items-center space-x-2 bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 transition-colors"
          >
            <Plus className="h-5 w-5" />
            <span>Add New Property</span>
          </Link>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="border-b border-neutral-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('bookings')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'bookings'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
                }`}
              >
                My Bookings ({userBookings.length})
              </button>
              <button
                onClick={() => setActiveTab('properties')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'properties'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
                }`}
              >
                My Properties ({userProperties.length})
              </button>
            </nav>
          </div>

          <div className="p-6">
            {/* Bookings Tab */}
            {activeTab === 'bookings' && (
              <div className="space-y-4">
                {userBookings.length === 0 ? (
                  <div className="text-center py-12">
                    <Calendar className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-neutral-900 mb-2">No bookings yet</h3>
                    <p className="text-neutral-600 mb-4">Start exploring amazing places to stay</p>
                    <Link
                      to="/search"
                      className="bg-primary-500 text-white px-6 py-2 rounded-lg hover:bg-primary-600 transition-colors"
                    >
                      Browse Properties
                    </Link>
                  </div>
                ) : (
                  userBookings.map((booking) => {
                    const property = getPropertyById(booking.propertyId);
                    if (!property) return null;

                    return (
                      <div key={booking.id} className="border border-neutral-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between">
                          <div className="flex space-x-4">
                            <img
                              src={property.images[0]}
                              alt={property.title}
                              className="w-20 h-20 rounded-lg object-cover"
                            />
                            <div>
                              <h4 className="text-lg font-semibold text-neutral-900 mb-1">
                                {property.title}
                              </h4>
                              <p className="text-sm text-neutral-600 mb-2">
                                {property.location.city}, {property.location.country}
                              </p>
                              <div className="flex items-center space-x-4 text-sm text-neutral-600">
                                <span>Check-in: {format(new Date(booking.checkIn), 'MMM dd, yyyy')}</span>
                                <span>Check-out: {format(new Date(booking.checkOut), 'MMM dd, yyyy')}</span>
                                <span>{booking.guests} guests</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-semibold text-neutral-900">
                              ${booking.totalPrice}
                            </div>
                            <div className={`text-sm px-2 py-1 rounded-full ${
                              booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                              booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              booking.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                              'bg-neutral-100 text-neutral-800'
                            }`}>
                              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            )}

            {/* Properties Tab */}
            {activeTab === 'properties' && (
              <div className="space-y-4">
                {userProperties.length === 0 ? (
                  <div className="text-center py-12">
                    <Home className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-neutral-900 mb-2">No properties listed</h3>
                    <p className="text-neutral-600 mb-4">Start earning by listing your space</p>
                    <Link
                      to="/host/add-property"
                      className="bg-primary-500 text-white px-6 py-2 rounded-lg hover:bg-primary-600 transition-colors"
                    >
                      Add Your First Property
                    </Link>
                  </div>
                ) : (
                  userProperties.map((property) => (
                    <div key={property.id} className="border border-neutral-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div className="flex space-x-4">
                          <img
                            src={property.images[0]}
                            alt={property.title}
                            className="w-20 h-20 rounded-lg object-cover"
                          />
                          <div>
                            <h4 className="text-lg font-semibold text-neutral-900 mb-1">
                              {property.title}
                            </h4>
                            <p className="text-sm text-neutral-600 mb-2">
                              {property.location.city}, {property.location.country}
                            </p>
                            <div className="flex items-center space-x-4 text-sm text-neutral-600">
                              <span>${property.price}/night</span>
                              <span className="flex items-center">
                                <Star className="h-4 w-4 text-yellow-400 mr-1" />
                                {property.rating} ({property.reviewCount} reviews)
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Link
                            to={`/property/${property.id}`}
                            className="flex items-center space-x-1 text-neutral-600 hover:text-primary-500 transition-colors"
                          >
                            <Eye className="h-4 w-4" />
                            <span>View</span>
                          </Link>
                          <button className="flex items-center space-x-1 text-neutral-600 hover:text-secondary-500 transition-colors">
                            <Edit className="h-4 w-4" />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => handleDeleteProperty(property.id)}
                            className="flex items-center space-x-1 text-neutral-600 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardPage;
