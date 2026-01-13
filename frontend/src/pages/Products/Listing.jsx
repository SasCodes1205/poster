import { useState } from 'react';
import { Grid, List, Filter, Search, MapPin, Calendar, Star, Eye, Heart, ChevronDown, X } from 'lucide-react';

export default function CategoryListingsPage() {
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [selectedCondition, setSelectedCondition] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const subcategories = [
    'Sedans', 'SUVs', 'Trucks', 'Motorcycles', 'RVs', 'Boats', 'Parts & Accessories', 'Classic Cars'
  ];

  const listings = [
    {
      id: 1,
      title: '2023 Tesla Model 3 Performance - Low Miles',
      price: 45000,
      location: 'San Francisco, CA',
      condition: 'Excellent',
      posted: '2 days ago',
      images: ['https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400&h=300&fit=crop'],
      views: 1250,
      featured: true,
      saved: false
    },
    {
      id: 2,
      title: '2020 Honda Civic LX - One Owner',
      price: 18500,
      location: 'Los Angeles, CA',
      condition: 'Good',
      posted: '1 week ago',
      images: ['https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=400&h=300&fit=crop'],
      views: 890,
      featured: false,
      saved: true
    },
    {
      id: 3,
      title: '2019 Ford F-150 XLT Crew Cab',
      price: 32000,
      location: 'Phoenix, AZ',
      condition: 'Very Good',
      posted: '3 days ago',
      images: ['https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400&h=300&fit=crop'],
      views: 567,
      featured: false,
      saved: false
    },
    {
      id: 4,
      title: '2021 BMW X3 xDrive30i - Premium Package',
      price: 38900,
      location: 'Chicago, IL',
      condition: 'Excellent',
      posted: '5 days ago',
      images: ['https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop'],
      views: 734,
      featured: true,
      saved: false
    },
    {
      id: 5,
      title: '2018 Jeep Wrangler Unlimited Sport',
      price: 28500,
      location: 'Denver, CO',
      condition: 'Good',
      posted: '1 day ago',
      images: ['https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop'],
      views: 245,
      featured: false,
      saved: false
    },
    {
      id: 6,
      title: '2022 Toyota Camry Hybrid LE',
      price: 26800,
      location: 'Seattle, WA',
      condition: 'Like New',
      posted: '4 days ago',
      images: ['https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=300&fit=crop'],
      views: 412,
      featured: false,
      saved: true
    }
  ];

  const toggleSaved = (id) => {
    // Toggle saved state logic here
    console.log('Toggle saved for listing:', id);
  };

  const filteredListings = listings.filter(listing => {
    const matchesSearch = listing.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = listing.price >= priceRange[0] && listing.price <= priceRange[1];
    const matchesCondition = !selectedCondition || listing.condition === selectedCondition;
    const matchesLocation = !selectedLocation || listing.location.includes(selectedLocation);
    
    return matchesSearch && matchesPrice && matchesCondition && matchesLocation;
  });

  const sortedListings = [...filteredListings].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'popular':
        return b.views - a.views;
      case 'newest':
      default:
        return new Date(b.posted) - new Date(a.posted);
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Vehicles</h1>
              <p className="text-gray-600">{filteredListings.length} listings found</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="popular">Most Popular</option>
              </select>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
          {/* Sidebar Filters */}
          <div className={`lg:block ${showFilters ? 'block' : 'hidden'} w-full lg:w-80 bg-white rounded-xl shadow-sm p-6 h-fit`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Filters</h3>
              <button
                onClick={() => setShowFilters(false)}
                className="lg:hidden p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search in vehicles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Subcategories */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Vehicle Type</h4>
              <div className="space-y-2">
                {subcategories.map((category) => (
                  <label key={category} className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <span className="ml-2 text-sm text-gray-600">{category}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Price Range</h4>
              <div className="space-y-3">
                <input
                  type="range"
                  min="0"
                  max="100000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>${priceRange[0].toLocaleString()}</span>
                  <span>${priceRange[1].toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Condition */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Condition</h4>
              <select
                value={selectedCondition}
                onChange={(e) => setSelectedCondition(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Conditions</option>
                <option value="Like New">Like New</option>
                <option value="Excellent">Excellent</option>
                <option value="Very Good">Very Good</option>
                <option value="Good">Good</option>
                <option value="Fair">Fair</option>
              </select>
            </div>

            {/* Location */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Location</h4>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Locations</option>
                  <option value="California">California</option>
                  <option value="Arizona">Arizona</option>
                  <option value="Illinois">Illinois</option>
                  <option value="Colorado">Colorado</option>
                  <option value="Washington">Washington</option>
                </select>
              </div>
            </div>

            <button className="w-full bg-gray-100 text-gray-600 py-2 rounded-lg hover:bg-gray-200 transition-colors">
              Clear All Filters
            </button>
          </div>

          {/* Listings */}
          <div className="flex-1">
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {sortedListings.map((listing) => (
                  <div key={listing.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all group border border-gray-100">
                    <div className="relative">
                      <img
                        src={listing.images[0]}
                        alt={listing.title}
                        className="w-full h-48 object-cover rounded-t-xl group-hover:scale-105 transition-transform duration-300"
                      />
                      {listing.featured && (
                        <div className="absolute top-3 left-3 bg-yellow-400 text-black px-2 py-1 rounded-lg text-xs font-semibold flex items-center">
                          <Star className="w-3 h-3 mr-1" />
                          Featured
                        </div>
                      )}
                      <button
                        onClick={() => toggleSaved(listing.id)}
                        className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors"
                      >
                        <Heart className={`w-4 h-4 ${listing.saved ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                      </button>
                      <div className="absolute bottom-3 right-3 bg-black bg-opacity-60 text-white px-2 py-1 rounded text-xs flex items-center">
                        <Eye className="w-3 h-3 mr-1" />
                        {listing.views}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {listing.title}
                      </h3>
                      <p className="text-2xl font-bold text-blue-600 mb-2">${listing.price.toLocaleString()}</p>
                      <div className="flex items-center text-sm text-gray-600 mb-1">
                        <MapPin className="w-4 h-4 mr-1" />
                        {listing.location}
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {listing.posted}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          listing.condition === 'Excellent' || listing.condition === 'Like New' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {listing.condition}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {sortedListings.map((listing) => (
                  <div key={listing.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all p-6 border border-gray-100">
                    <div className="flex gap-6">
                      <div className="relative flex-shrink-0">
                        <img
                          src={listing.images[0]}
                          alt={listing.title}
                          className="w-48 h-32 object-cover rounded-xl"
                        />
                        {listing.featured && (
                          <div className="absolute top-2 left-2 bg-yellow-400 text-black px-2 py-1 rounded text-xs font-semibold flex items-center">
                            <Star className="w-3 h-3 mr-1" />
                            Featured
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                            {listing.title}
                          </h3>
                          <button
                            onClick={() => toggleSaved(listing.id)}
                            className="p-2 hover:bg-gray-50 rounded-full transition-colors"
                          >
                            <Heart className={`w-5 h-5 ${listing.saved ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                          </button>
                        </div>
                        <p className="text-3xl font-bold text-blue-600 mb-3">${listing.price.toLocaleString()}</p>
                        <div className="flex items-center text-gray-600 mb-2">
                          <MapPin className="w-4 h-4 mr-2" />
                          {listing.location}
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {listing.posted}
                            </span>
                            <span className="flex items-center">
                              <Eye className="w-4 h-4 mr-1" />
                              {listing.views} views
                            </span>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm ${
                            listing.condition === 'Excellent' || listing.condition === 'Like New' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {listing.condition}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}