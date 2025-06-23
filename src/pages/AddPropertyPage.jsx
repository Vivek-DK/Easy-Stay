import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, X, MapPin, Home, DollarSign, Users, Bed, Bath } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import Footer from '../components/Footer';

const AddPropertyPage = () => {
  const { user } = useAuth();
  const { addProperty } = useData();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    address: '',
    city: '',
    country: '',
    price: '',
    propertyType: 'apartment',
    bedrooms: '1',
    bathrooms: '1',
    maxGuests: '1',
  });

  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [imageUrls, setImageUrls] = useState(['']);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    'Laundry',
    'TV',
    'Balcony',
    'Garden',
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAmenityToggle = (amenity) => {
    setSelectedAmenities(prev =>
      prev.includes(amenity)
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    );
  };

  const handleImageUrlChange = (index, value) => {
    const newImageUrls = [...imageUrls];
    newImageUrls[index] = value;
    setImageUrls(newImageUrls);
  };

  const addImageUrl = () => {
    setImageUrls(prev => [...prev, '']);
  };

  const removeImageUrl = (index) => {
    if (imageUrls.length > 1) {
      setImageUrls(prev => prev.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    setIsSubmitting(true);

    try {
      const validImageUrls = imageUrls.filter(url => url.trim() !== '');
      if (validImageUrls.length === 0) {
        alert('Please add at least one image URL');
        return;
      }

      const property = {
        title: formData.title,
        description: formData.description,
        location: {
          address: formData.address,
          city: formData.city,
          country: formData.country,
          coordinates: { lat: 0, lng: 0 }
        },
        price: parseInt(formData.price),
        images: validImageUrls,
        amenities: selectedAmenities,
        propertyType: formData.propertyType,
        bedrooms: parseInt(formData.bedrooms),
        bathrooms: parseInt(formData.bathrooms),
        maxGuests: parseInt(formData.maxGuests),
        hostId: user.id,
        rating: 0,
        reviewCount: 0,
        availableDates: []
      };

      addProperty(property);
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Property added successfully!');
      navigate('/dashboard');
    } catch (error) {
      alert('Failed to add property. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center space-x-2 text-neutral-600 hover:text-primary-500 transition-colors mr-4"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Dashboard</span>
          </button>
          <div>
            <h1 className="text-3xl font-bold text-neutral-900">Add New Property</h1>
            <p className="text-neutral-600 mt-2">List your space and start earning</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-8 space-y-8">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="w-full border border-neutral-300 rounded-md px-4 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows="4"
              className="w-full border border-neutral-300 rounded-md px-4 py-2"
            />
          </div>

          {/* Address */}
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
                className="w-full border border-neutral-300 rounded-md px-4 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                required
                className="w-full border border-neutral-300 rounded-md px-4 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Country</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                required
                className="w-full border border-neutral-300 rounded-md px-4 py-2"
              />
            </div>
          </div>

          {/* Property Details */}
          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Price (per night)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
                className="w-full border border-neutral-300 rounded-md px-4 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Bedrooms</label>
              <input
                type="number"
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleInputChange}
                required
                className="w-full border border-neutral-300 rounded-md px-4 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Bathrooms</label>
              <input
                type="number"
                name="bathrooms"
                value={formData.bathrooms}
                onChange={handleInputChange}
                required
                className="w-full border border-neutral-300 rounded-md px-4 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Max Guests</label>
              <input
                type="number"
                name="maxGuests"
                value={formData.maxGuests}
                onChange={handleInputChange}
                required
                className="w-full border border-neutral-300 rounded-md px-4 py-2"
              />
            </div>
          </div>

          {/* Property Type */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Property Type</label>
            <select
              name="propertyType"
              value={formData.propertyType}
              onChange={handleInputChange}
              className="w-full border border-neutral-300 rounded-md px-4 py-2"
            >
              {propertyTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          {/* Amenities */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">Amenities</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {amenities.map((amenity) => (
                <label key={amenity} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedAmenities.includes(amenity)}
                    onChange={() => handleAmenityToggle(amenity)}
                  />
                  <span className="text-sm text-neutral-700">{amenity}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Image URLs */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">Image URLs</label>
            <div className="space-y-2">
              {imageUrls.map((url, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => handleImageUrlChange(index, e.target.value)}
                    className="w-full border border-neutral-300 rounded-md px-4 py-2"
                  />
                  <button
                    type="button"
                    onClick={() => removeImageUrl(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addImageUrl}
                className="text-sm text-primary-600 hover:underline"
              >
                + Add another image
              </button>
            </div>
          </div>

          {/* Submit */}
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 transition-colors"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Property'}
            </button>
          </div>

        </form>
      </div>
      <Footer />
    </div>
  );
};

export default AddPropertyPage;
