import React, { useState } from 'react';
import Header from './components/Header';
import SearchSection from './components/SearchSection';
import GuestPost from './components/GuestPost';
import DealManagement from './components/DealManagement';
import Footer from './components/Footer';
import DealCard from './components/DealCard';
import DealDetail from './components/DealDetail';
import DownloadButton from './components/DownloadButton';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedDeal, setSelectedDeal] = useState(null);

  const sampleDeals = [
    {
      destination: 'Dubai',
      country: 'United Arab Emirates',
      imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200',
      price: 55000,
      originalPrice: 75000,
      departureDate: 'May 2024',
      returnDate: 'May 2024',
      airline: 'Emirates',
      stops: [{ city: 'Abu Dhabi', layover: '2h 30m' }],
      origin: 'Mumbai',
      class: 'Economy',
      description: 'Experience luxury travel to Dubai with Emirates...',
      validUntil: '2024-04-30',
      backLink: 'https://emirates.com'
    },
    {
      destination: 'Singapore',
      country: 'Singapore',
      imageUrl: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=1200',
      price: 45000,
      originalPrice: 65000,
      departureDate: 'Jun 2024',
      returnDate: 'Jun 2024',
      airline: 'Singapore Airlines',
      stops: [],
      origin: 'Mumbai',
      class: 'Economy',
      description: 'Direct flights to Singapore...',
      validUntil: '2024-05-31',
      backLink: 'https://singaporeair.com'
    },
    {
      destination: 'London',
      country: 'United Kingdom',
      imageUrl: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=1200',
      price: 85000,
      originalPrice: 120000,
      departureDate: 'Jul 2024',
      returnDate: 'Jul 2024',
      airline: 'British Airways',
      stops: [{ city: 'Dubai', layover: '3h 45m' }],
      origin: 'Mumbai',
      class: 'Economy',
      description: 'Explore London with British Airways...',
      validUntil: '2024-06-30',
      backLink: 'https://britishairways.com'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onNavigate={setCurrentPage} currentPage={currentPage} />
      
      {currentPage === 'home' && !selectedDeal && (
        <>
          <SearchSection />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Latest Deals</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sampleDeals.map((deal, index) => (
                <DealCard 
                  key={index} 
                  {...deal} 
                  onViewDeal={() => setSelectedDeal(deal)}
                />
              ))}
            </div>
          </div>
        </>
      )}
      
      {currentPage === 'home' && selectedDeal && (
        <div className="relative">
          <button
            onClick={() => setSelectedDeal(null)}
            className="absolute left-4 top-4 z-10 bg-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-50"
          >
            ← Back to Deals
          </button>
          <DealDetail {...selectedDeal} />
        </div>
      )}
      
      {currentPage === 'guest-post' && <GuestPost />}
      {currentPage === 'manage' && <DealManagement />}
      
      <Footer />
      <DownloadButton />
    </div>
  );
}

export default App;