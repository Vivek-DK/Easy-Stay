// User Object Structure
export const exampleUser = {
  id: '',            
  email: '',          
  firstName: '',      
  lastName: '',       
  avatar: '',         
  role: 'guest',      
  createdAt: '',     
};

// Property Object Structure
export const exampleProperty = {
  id: '',
  title: '',
  description: '',
  location: {
    address: '',
    city: '',
    country: '',
    coordinates: {
      lat: 0,       
      lng: 0         
    }
  },
  price: 0,
  images: [],         
  amenities: [],     
  propertyType: 'house',
  bedrooms: 0,
  bathrooms: 0,
  maxGuests: 0,
  hostId: '',
  rating: 0,            
  reviewCount: 0,
  availableDates: [],   
  createdAt: '',
};

// Booking Object Structure
export const exampleBooking = {
  id: '',
  propertyId: '',
  guestId: '',
  checkIn: '',        
  checkOut: '',       
  guests: 1,
  totalPrice: 0,
  status: 'pending',   
  createdAt: '',
};

// Search Filter Structure
export const exampleSearchFilters = {
  location: '',
  checkIn: '',
  checkOut: '',
  guests: 1,
  minPrice: 0,
  maxPrice: 1000,
  propertyType: '',    
  amenities: [],      
};
