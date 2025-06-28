import React from 'react';
import SearchBar from '../components/SearchBar';
import PropertyCard from '../components/PropertyCard';
import { useData } from '../context/DataContext';
import { ArrowRight, Star, Shield, Heart } from 'lucide-react';
import Footer from '../components/Footer';

const HomePage = () => {
  const { properties } = useData();
  const featuredProperties = properties.slice(0, 6);

  return (
    <div className="min-h-screen bg-neutral-50">
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-secondary-500 opacity-90"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg')`
          }}
        ></div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            Find Your Perfect Stay
          </h1>
          <p className="text-xl md:text-2xl mb-12 opacity-90 animate-slide-up">
            Discover unique places to stay, from luxury villas to cozy cabins
          </p>
          
          <div className="animate-slide-up">
            <SearchBar />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Why Choose Our Platform
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Experience the best in hospitality with our carefully curated selection of properties
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-primary-500" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">Premium Quality</h3>
              <p className="text-neutral-600">
                Every property is verified and meets our high standards for comfort and cleanliness
              </p>
            </div>

            <div className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-secondary-500" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">Secure Booking</h3>
              <p className="text-neutral-600">
                Your payments and personal information are protected with enterprise-grade security
              </p>
            </div>

            <div className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-accent-500" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">24/7 Support</h3>
              <p className="text-neutral-600">
                Our dedicated support team is always ready to help make your stay perfect
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                Featured Properties
              </h2>
              <p className="text-lg text-neutral-600">
                Discover our most popular destinations
              </p>
            </div>
            <button className="flex items-center space-x-2 text-primary-500 hover:text-primary-600 font-medium">
              <span>View All</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
