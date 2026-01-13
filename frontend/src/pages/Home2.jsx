import { useState } from 'react';
import { Search, MapPin, Car, Home, Smartphone, Briefcase, Heart, Gift, ChevronLeft, ChevronRight, Star, Eye } from 'lucide-react';

export default function Home2() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);

  const categories = [
    { icon: Car, name: 'Vehicles', color: 'bg-blue-100 text-blue-600' },
    { icon: Home, name: 'Real Estate', color: 'bg-green-100 text-green-600' },
    { icon: Smartphone, name: 'Electronics', color: 'bg-purple-100 text-purple-600' },
    { icon: Briefcase, name: 'Jobs', color: 'bg-orange-100 text-orange-600' },
    { icon: Heart, name: 'Services', color: 'bg-pink-100 text-pink-600' },
    { icon: Gift, name: 'For Sale', color: 'bg-indigo-100 text-indigo-600' },
  ];

  const featuredAds = [
    {
      id: 1,
      title: '2023 Tesla Model 3 - Excellent Condition',
      price: '$45,000',
      location: 'San Francisco, CA',
      image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400&h=300&fit=crop',
      views: 1250,
      featured: true
    },
    {
      id: 2,
      title: 'Modern 2BR Apartment Downtown',
      price: '$2,800/month',
      location: 'New York, NY',
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop',
      views: 890,
      featured: true
    },
    {
      id: 3,
      title: 'iPhone 15 Pro Max - Like New',
      price: '$999',
      location: 'Los Angeles, CA',
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop',
      views: 567,
      featured: true
    },
    {
      id: 4,
      title: 'Professional Photography Services',
      price: '$150/hour',
      location: 'Chicago, IL',
      image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop',
      views: 234,
      featured: false
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(featuredAds.length / 3));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(featuredAds.length / 3)) % Math.ceil(featuredAds.length / 3));
  };

  const handleSearch = (e) => {
    console.log('Searching for:', searchQuery, 'in', selectedLocation);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ClassiFind
              </h1>
            </div>
            <nav className="hidden md:block">
              <div className="flex items-center space-x-6">
                <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Home</a>
                <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Browse</a>
                <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">My Ads</a>
                <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Help</a>
              </div>
            </nav>
            <div className="flex items-center space-x-4">
              <button className="text-gray-700 hover:text-blue-600 transition-colors p-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </button>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-all transform hover:scale-105 font-semibold shadow-lg">
                Sign In
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20">
          <div className="text-center">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
              Find Everything
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                You're Looking For
              </span>
            </h2>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              Discover amazing deals, connect with local sellers, and find exactly what you need in your area.
            </p>

            {/* Search Bar */}
            <div className="max-w-4xl mx-auto mb-8">
              <div className="flex flex-col md:flex-row gap-4 bg-white rounded-2xl shadow-2xl p-6 border border-gray-100">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="What are you looking for?"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 text-lg border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="relative md:w-64">
                  <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 text-lg border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                  >
                    <option value="">All Locations</option>
                    <option value="new-york">New York, NY</option>
                    <option value="los-angeles">Los Angeles, CA</option>
                    <option value="chicago">Chicago, IL</option>
                    <option value="houston">Houston, TX</option>
                    <option value="phoenix">Phoenix, AZ</option>
                  </select>
                </div>
                <button
                  onClick={handleSearch}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 font-semibold shadow-lg"
                >
                  Search
                </button>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-green-500 to-teal-600 text-white px-8 py-4 rounded-xl hover:from-green-600 hover:to-teal-700 transition-all transform hover:scale-105 font-semibold shadow-lg">
                Post Your Ad
              </button>
              <button className="bg-white text-gray-700 px-8 py-4 rounded-xl hover:bg-gray-50 transition-all transform hover:scale-105 font-semibold shadow-lg border border-gray-200">
                Browse All Ads
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Browse by Category</h3>
            <p className="text-gray-600">Find exactly what you're looking for</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <button
                  key={index}
                  className="group p-6 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-xl transition-all transform hover:scale-105 border border-gray-100"
                >
                  <div className={`w-16 h-16 ${category.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                    <IconComponent className="w-8 h-8" />
                  </div>
                  <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {category.name}
                  </h4>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Ads */}
      <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Featured & Trending</h3>
              <p className="text-gray-600">Discover the most popular listings</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={prevSlide}
                className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={nextSlide}
                className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredAds.map((ad) => (
              <div
                key={ad.id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 overflow-hidden border border-gray-100"
              >
                <div className="relative">
                  <img
                    src={ad.image}
                    alt={ad.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {ad.featured && (
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                      <Star className="w-4 h-4 mr-1" />
                      Featured
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded-lg text-sm flex items-center">
                    <Eye className="w-4 h-4 mr-1" />
                    {ad.views}
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {ad.title}
                  </h4>
                  <p className="text-2xl font-bold text-blue-600 mb-2">{ad.price}</p>
                  <p className="text-gray-600 flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {ad.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
                ClassiFind
              </h4>
              <p className="text-gray-400">
                Your trusted local marketplace for buying and selling anything.
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Categories</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Vehicles</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Real Estate</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Electronics</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Jobs</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Support</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Safety Tips</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Connect</h5>
              <div className="flex space-x-4">
                <button className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </button>
                <button className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 ClassiFind. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}