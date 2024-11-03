import React from 'react';
import { Plane } from 'lucide-react';

interface DealCardProps {
  destination: string;
  country: string;
  imageUrl: string;
  price: number;
  originalPrice: number;
  departureDate: string;
  returnDate: string;
  airline: string;
  stops: Array<{ city: string; layover: string }>;
  onViewDeal: () => void;
}

export default function DealCard({
  destination,
  country,
  imageUrl,
  price,
  originalPrice,
  departureDate,
  returnDate,
  airline,
  stops,
  onViewDeal
}: DealCardProps) {
  // Convert INR to USD (approximate rate)
  const usdPrice = Math.round(price / 83);
  const usdOriginalPrice = Math.round(originalPrice / 83);
  const discount = Math.round(((originalPrice - price) / originalPrice) * 100);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48">
        <img
          src={imageUrl}
          alt={`${destination}, ${country}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 bg-primary-600 text-white px-3 py-1 rounded-full">
          {discount}% OFF
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800">{destination}</h3>
        <p className="text-gray-600">{country}</p>
        
        <div className="mt-4 flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-primary-600">${usdPrice.toLocaleString()}</span>
            <span className="ml-2 text-sm text-gray-500 line-through">${usdOriginalPrice.toLocaleString()}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Plane className="w-4 h-4 mr-1" />
            {stops.length === 0 ? 'Direct' : `${stops.length} stop${stops.length > 1 ? 's' : ''}`}
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex justify-between text-sm text-gray-600">
            <span>{airline}</span>
            <span>{departureDate}</span>
          </div>
        </div>
        
        <button 
          onClick={onViewDeal}
          className="mt-4 w-full bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition-colors"
        >
          View Deal
        </button>
      </div>
    </div>
  );
}