import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateProductMutation, useUploadProductImageMutation } from '../../redux/api/productApiSlice';
import { useFetchCategoriesQuery } from '../../redux/api/categoryApiSlice';
import { toast } from 'react-toastify';
import { Search, MapPin, Car, Home, Smartphone, Briefcase, Heart, Gift, ChevronLeft, ChevronRight, Star, Eye, Upload, X } from 'lucide-react';

const categories = [
  'Vehicles',
  'Property',
  'Electronics',
  'Jobs',
  'Services',
  'Home & Living',
  'Fashion',
  'Pets',
  'Business Equipment',
  'Education'
];

export default function PostAdPage({ onBack }) {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const fileInputRef = useRef(null);

  const [uploadProductImage] = useUploadProductImageMutation();
  const [createProduct] = useCreateProductMutation();
  const { data: dbCategories } = useFetchCategoriesQuery();

  const [formData, setFormData] = useState({
    category: '',
    title: '',
    description: '',
    price: '',
    location: '',
    contact: '',
    quantity: '',
    brand: '',
    countInStock: 0,
    images: []
  });

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    const formData = new FormData();
    formData.append('image', files[0]);

    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
      setImageUrl(res.image);
      setFormData(prev => ({
        ...prev,
        images: [res.image]
      }));
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = async () => {
    try {
      const productData = new FormData();
      if (image) productData.append('image', image);
      productData.append('name', formData.title);
      productData.append('description', formData.description);
      productData.append('price', formData.price);
      productData.append('category', formData.category);
      productData.append('quantity', formData.quantity);
      productData.append('brand', formData.brand);
      productData.append('countInStock', formData.countInStock);
      productData.append('location', formData.location);
      productData.append('contact', formData.contact);

      const { data } = await createProduct(productData);

      if (data.error) {
        toast.error('Ad creation failed. Try Again.');
      } else {
        toast.success(`${data.name} is created`);
        navigate('/');
      }
    } catch (error) {
      console.error(error);
      toast.error('Ad creation failed. Try Again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50">
      <div className="max-w-4xl mx-auto p-6">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-purple-600 hover:text-purple-800 mb-6 transition-colors"
        >
          <ChevronLeft size={20} />
          Back to Dashboard
        </button>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Post Your Ad</h1>
          
          {/* Progress Bar */}
          <div className="flex items-center justify-center mb-8">
            {[1, 2, 3, 4].map((stepNum) => (
              <div key={stepNum} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                  stepNum <= step ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {stepNum}
                </div>
                {stepNum < 4 && (
                  <div className={`w-16 h-1 mx-2 transition-colors ${
                    stepNum < step ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>

          {/* Step Content */}
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-900 text-center">Choose Category</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setFormData(prev => ({ ...prev, category }))}
                    className={`p-4 rounded-xl border-2 transition-all transform hover:scale-105 ${
                      formData.category === category
                        ? 'border-purple-500 bg-purple-50 text-purple-700'
                        : 'border-gray-200 hover:border-purple-300 text-gray-700'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-900 text-center">Ad Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-colors"
                    placeholder="Enter a catchy title for your ad"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    rows={6}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-colors"
                    placeholder="Describe your item in detail..."
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                    <input
                      type="text"
                      value={formData.price}
                      onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-colors"
                      placeholder="$0.00"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-colors"
                      placeholder="City, State"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                    <input
                      type="number"
                      value={formData.quantity}
                      onChange={(e) => setFormData(prev => ({ ...prev, quantity: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-colors"
                      placeholder="1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
                    <input
                      type="text"
                      value={formData.brand}
                      onChange={(e) => setFormData(prev => ({ ...prev, brand: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-colors"
                      placeholder="Brand name (optional)"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Stock Count</label>
                  <input
                    type="number"
                    value={formData.countInStock}
                    onChange={(e) => setFormData(prev => ({ ...prev, countInStock: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-colors"
                    placeholder="Available quantity"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-900 text-center">Upload Images</h2>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
                <Upload size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600 mb-4">Drag & drop images here or click to browse</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105"
                >
                  Choose Images
                </button>
              </div>
              
              {formData.images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {formData.images.map((image, index) => (
                    <div key={index} className="relative">
                      <img src={image} alt={`Upload ${index + 1}`} className="w-full h-32 object-cover rounded-xl" />
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-900 text-center">Contact Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contact Method</label>
                  <input
                    type="text"
                    value={formData.contact}
                    onChange={(e) => setFormData(prev => ({ ...prev, contact: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-colors"
                    placeholder="Phone number or email"
                  />
                </div>
                
                <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl">
                  <h3 className="font-semibold text-gray-900 mb-3">Review Your Ad</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Category:</span> {formData.category}</p>
                    <p><span className="font-medium">Title:</span> {formData.title}</p>
                    <p><span className="font-medium">Description:</span> {formData.description.substring(0, 50)}...</p>
                    <p><span className="font-medium">Price:</span> {formData.price}</p>
                    <p><span className="font-medium">Location:</span> {formData.location}</p>
                    <p><span className="font-medium">Quantity:</span> {formData.quantity}</p>
                    <p><span className="font-medium">Brand:</span> {formData.brand || 'Not specified'}</p>
                    <p><span className="font-medium">Stock:</span> {formData.countInStock}</p>
                    <p><span className="font-medium">Images:</span> {formData.images.length} uploaded</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={prevStep}
              disabled={step === 1}
              className="px-6 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            {step < 4 ? (
              <button
                onClick={nextStep}
                disabled={step === 1 && !formData.category}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            ) : (
              <button 
                onClick={handleSubmit}
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105"
              >
                Publish Ad
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};