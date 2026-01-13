import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from '../../redux/api/productApiSlice';
import { Heart, MapPin, Phone, Mail, MessageCircle, Flag, ChevronLeft, ChevronRight } from 'lucide-react';
import { FaBox, FaClock, FaShoppingCart, FaStar, FaStore } from 'react-icons/fa';
import moment from 'moment';
import HeartIcon from './HeartIcon';
import Ratings from './Ratings';
import ProductTabs from './ProductTabs';
import { addToCart } from '../../redux/features/cart/cartSlice';
import Loader from '../../components/Loader';
import Message from '../../components/Message';

const ProductDetails = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [currentImage, setCurrentImage] = useState(0);
  const [isSaved, setIsSaved] = useState(false);

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const { userInfo } = useSelector((state) => state.auth);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success("Review created successfully");
    } catch (error) {
      toast.error(error?.data || error.message);
    }
  };

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  if (isLoading) return <Loader />;
  if (error) return <Message variant="danger">{error?.data?.message || error.message}</Message>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-6xl mx-auto p-6">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6 transition-colors"
        >
          <ChevronLeft size={20} />
          Back to Search
        </button>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-white rounded-2xl overflow-hidden shadow-lg">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.images?.length > 1 && (
                <>
                  <button 
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button 
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                {product.images?.map((_, idx) => (
                  <div 
                    key={idx}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      idx === currentImage ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
              <HeartIcon product={product} />
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex justify-between items-start mb-4">
                <h1 className="text-3xl font-bold text-gray-900 leading-tight">{product.name}</h1>
                <button 
                  onClick={() => setIsSaved(!isSaved)}
                  className={`p-2 rounded-full transition-colors ${
                    isSaved ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-600'
                  }`}
                >
                  <Heart size={20} fill={isSaved ? 'currentColor' : 'none'} />
                </button>
              </div>
              
              <div className="text-4xl font-bold text-blue-600 mb-4">$ {product.price}</div>
              
              <div className="flex items-center gap-2 text-gray-600 mb-6">
                <MapPin size={16} />
                <span>Online Store</span>
                <span className="text-gray-400">•</span>
                <span>{moment(product.createAt).fromNow()}</span>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">Description</h3>
                <p className="text-gray-700 leading-relaxed">{product.description}</p>
                
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl">
                  <h4 className="font-semibold text-gray-900 mb-2">Product Details:</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li className="flex items-center">
                      <FaStore className="mr-2" /> Brand: {product.brand}
                    </li>
                    <li className="flex items-center">
                      <FaShoppingCart className="mr-2" /> Quantity: {product.quantity}
                    </li>
                    <li className="flex items-center">
                      <FaBox className="mr-2" /> In Stock: {product.countInStock}
                    </li>
                    <li className="flex items-center">
                      <FaStar className="mr-2" /> Ratings: {product.rating} ({product.numReviews} reviews)
                    </li>
                  </ul>
                </div>

                {product.countInStock > 0 && (
                  <div className="flex items-center gap-4">
                    <select
                      value={qty}
                      onChange={(e) => setQty(Number(e.target.value))}
                      className="p-2 border rounded-lg"
                    >
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={addToCartHandler}
                      className="bg-gradient-to-r from-pink-500 to-pink-600 text-white px-6 py-3 rounded-lg hover:from-pink-600 hover:to-pink-700 transition-all"
                    >
                      Add To Cart
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <ProductTabs
                loadingProductReview={loadingProductReview}
                userInfo={userInfo}
                submitHandler={submitHandler}
                rating={rating}
                setRating={setRating}
                comment={comment}
                setComment={setComment}
                product={product}
              />
            </div>
          </div>
        </div>

        {/* Similar Products (if available) */}
        {/* You can add similar products section here if needed */}
      </div>
    </div>
  );
};

export default ProductDetails;