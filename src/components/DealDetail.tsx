import React from 'react';
import { ExternalLink, Plane, Calendar, MapPin } from 'lucide-react';

interface DealDetailProps {
  destination: string;
  country?: string;
  imageUrl: string;
  price: number;
  originalPrice: number;
  departureDate: string;
  returnDate: string;
  airline: string;
  stops: Array<{ city: string; layover: string }>;
  origin: string;
  class: string;
  description: string;
  validUntil: string;
  backLink: string;
}

export default function DealDetail({
  destination,
  country,
  imageUrl,
  price,
  originalPrice,
  departureDate,
  returnDate,
  airline,
  stops,
  origin,
  class: travelClass,
  description,
  validUntil,
  backLink
}: DealDetailProps) {
  const discount = Math.round(((originalPrice - price) / originalPrice) * 100);
  const usdPrice = Math.round(price / 83);
  const usdOriginalPrice = Math.round(originalPrice / 83);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative h-96">
          <img
            src={imageUrl}
            alt={`${destination}, ${country}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-6 left-6 text-white">
            <h1 className="text-4xl font-bold mb-2">{destination}</h1>
            {country && <p className="text-xl">{country}</p>}
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="flex items-center space-x-3">
              <Plane className="w-6 h-6 text-primary-600" />
              <div>
                <p className="text-sm text-gray-600">Airline</p>
                <p className="font-semibold">{airline}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Calendar className="w-6 h-6 text-primary-600" />
              <div>
                <p className="text-sm text-gray-600">Travel Period</p>
                <p className="font-semibold">{departureDate}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <MapPin className="w-6 h-6 text-primary-600" />
              <div>
                <p className="text-sm text-gray-600">Route</p>
                <p className="font-semibold">{origin} → {destination}</p>
              </div>
            </div>
          </div>

          <div className="bg-primary-50 rounded-lg p-6 mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Deal Price</p>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-3xl font-bold text-primary-600">${usdPrice.toLocaleString()}</span>
                  <span className="text-lg text-gray-500 line-through">${usdOriginalPrice.toLocaleString()}</span>
                  <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm whitespace-nowrap">
                    {discount}% OFF
                  </span>
                </div>
              </div>
              <a 
                href={backLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 flex items-center justify-center space-x-2 w-full sm:w-auto"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Book Now</span>
              </a>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-3">Flight Details</h2>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Class</p>
                    <p className="font-semibold">{travelClass}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Valid Until</p>
                    <p className="font-semibold">{validUntil}</p>
                  </div>
                </div>
              </div>
            </div>

            {stops.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-3">Stops</h2>
                <div className="space-y-2">
                  {stops.map((stop, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
                        <span className="font-semibold">{stop.city}</span>
                        <span className="text-gray-600">{stop.layover} layover</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h2 className="text-xl font-semibold mb-3">Description</h2>
              <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: description }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}