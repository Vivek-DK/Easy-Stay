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
          {/* Sections from Basic Info to Submit are unchanged and JSX-friendly */}
          {/* ... [KEEP REST OF YOUR JSX CODE HERE] ... */}
          {/* Everything else stays the same because it's already valid JSX */}
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default AddPropertyPage;
