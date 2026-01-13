// import { useState } from 'react';
// import { Search, MapPin, Car, Home, Smartphone, Briefcase, Heart, Gift, ChevronLeft, ChevronRight, Star, Eye } from 'lucide-react';


// const UserDashboard = ({ onPostAd, onBack }) => {
//   const [activeTab, setActiveTab] = useState('myads');
//   const [myAds] = useState(mockAds);

//   const tabs = [
//     { id: 'myads', label: 'My Ads', icon: Grid },
//     { id: 'messages', label: 'Messages', icon: MessageCircle },
//     { id: 'saved', label: 'Saved Ads', icon: Heart },
//     { id: 'settings', label: 'Settings', icon: Settings }
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
//       <div className="max-w-7xl mx-auto p-6">
//         <div className="flex justify-between items-center mb-8">
//           <div className="flex items-center gap-4">
//             <button 
//               onClick={onBack}
//               className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 transition-colors"
//             >
//               <ChevronLeft size={20} />
//               Back
//             </button>
//             <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
//           </div>
//           <button
//             onClick={onPostAd}
//             className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all transform hover:scale-105"
//           >
//             Post New Ad
//           </button>
//         </div>

//         <div className="grid lg:grid-cols-4 gap-8">
//           {/* Sidebar */}
//           <div className="lg:col-span-1">
//             <div className="bg-white rounded-2xl shadow-lg p-6">
//               <div className="flex items-center gap-4 mb-6">
//                 <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
//                   JD
//                 </div>
//                 <div>
//                   <h3 className="font-semibold text-gray-900">John Doe</h3>
//                   <p className="text-sm text-gray-600">Member since 2023</p>
//                 </div>
//               </div>
              
//               <nav className="space-y-2">
//                 {tabs.map((tab) => {
//                   const Icon = tab.icon;
//                   return (
//                     <button
//                       key={tab.id}
//                       onClick={() => setActiveTab(tab.id)}
//                       className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
//                         activeTab === tab.id
//                           ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white'
//                           : 'text-gray-700 hover:bg-gray-100'
//                       }`}
//                     >
//                       <Icon size={20} />
//                       {tab.label}
//                     </button>
//                   );
//                 })}
//               </nav>
//             </div>
//           </div>

//           {/* Main Content */}
//           <div className="lg:col-span-3">
//             <div className="bg-white rounded-2xl shadow-lg p-6">
//               {activeTab === 'myads' && (
//                 <div>
//                   <h2 className="text-2xl font-bold text-gray-900 mb-6">My Ads</h2>
//                   <div className="grid md:grid-cols-2 gap-6">
//                     {myAds.map((ad) => (
//                       <div key={ad.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all">
//                         <img src={ad.images[0]} alt={ad.title} className="w-full h-40 object-cover rounded-lg mb-4" />
//                         <h3 className="font-semibold text-gray-900 mb-2">{ad.title}</h3>
//                         <div className="text-xl font-bold text-indigo-600 mb-2">{ad.price}</div>
//                         <div className="flex items-center justify-between text-sm text-gray-600">
//                           <span>{ad.postedDate}</span>
//                           <div className="flex gap-2">
//                             <button className="text-indigo-600 hover:text-indigo-800">Edit</button>
//                             <button className="text-red-600 hover:text-red-800">Delete</button>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {activeTab === 'messages' && (
//                 <div>
//                   <h2 className="text-2xl font-bold text-gray-900 mb-6">Messages</h2>
//                   <div className="space-y-4">
//                     <div className="border border-gray-200 rounded-xl p-4 hover:bg-gray-50 transition-colors">
//                       <div className="flex items-center justify-between mb-2">
//                         <h3 className="font-semibold text-gray-900">Interest in iPhone 14 Pro Max</h3>
//                         <span className="text-sm text-gray-600">2 hours ago</span>
//                       </div>
//                       <p className="text-gray-700 mb-2">Hi, is this still available? Can you do $800?</p>
//                       <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">Reply</button>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {activeTab === 'saved' && (
//                 <div>
//                   <h2 className="text-2xl font-bold text-gray-900 mb-6">Saved Ads</h2>
//                   <div className="grid md:grid-cols-2 gap-6">
//                     {mockAds.map((ad) => (
//                       <div key={ad.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all">
//                         <img src={ad.images[0]} alt={ad.title} className="w-full h-40 object-cover rounded-lg mb-4" />
//                         <h3 className="font-semibold text-gray-900 mb-2">{ad.title}</h3>
//                         <div className="text-xl font-bold text-indigo-600 mb-2">{ad.price}</div>
//                         <div className="flex items-center gap-2 text-gray-600 text-sm">
//                           <MapPin size={14} />
//                           <span>{ad.location}</span>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {activeTab === 'settings' && (
//                 <div>
//                   <h2 className="text-2xl font-bold text-gray-900 mb-6">Account Settings</h2>
//                   <div className="space-y-6">
//                     <div className="bg-gray-50 rounded-xl p-6">
//                       <h3 className="font-semibold text-gray-900 mb-4">Profile Information</h3>
//                       <div className="grid md:grid-cols-2 gap-4">
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
//                           <input type="text" defaultValue="John Doe" className="w-full px-4 py-3 rounded-xl border border-gray-200" />
//                         </div>
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
//                           <input type="email" defaultValue="john@example.com" className="w-full px-4 py-3 rounded-xl border border-gray-200" />
//                         </div>
//                       </div>
//                     </div>
                    
//                     <div className="bg-gray-50 rounded-xl p-6">
//                       <h3 className="font-semibold text-gray-900 mb-4">Notifications</h3>
//                       <div className="space-y-3">
//                         <label className="flex items-center gap-3">
//                           <input type="checkbox" defaultChecked className="rounded" />
//                           <span className="text-gray-700">Email notifications for new messages</span>
//                         </label>
//                         <label className="flex items-center gap-3">
//                           <input type="checkbox" defaultChecked className="rounded" />
//                           <span className="text-gray-700">SMS notifications for urgent inquiries</span>
//                         </label>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
