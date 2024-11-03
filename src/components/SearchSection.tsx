import React, { useState } from 'react';
import { Search, Calendar, Users } from 'lucide-react';

export default function SearchSection() {
  return (
    <div className="bg-primary-600 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          Find Amazing Flight Deals
        </h1>
        
        <div className="bg-white rounded-lg p-4 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">From</label>
              <input
                type="text"
                placeholder="Origin City"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
            </div>
            
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">To</label>
              <input
                type="text"
                placeholder="Destination City"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
            </div>
            
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">Travel Month</label>
              <input
                type="month"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
            </div>
            
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">Class</label>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              >
                <option>Economy</option>
                <option>Premium Economy</option>
                <option>Business</option>
                <option>First</option>
              </select>
            </div>
          </div>
          
          <div className="mt-4 flex justify-center">
            <button className="bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 flex items-center space-x-2">
              <Search className="w-5 h-5" />
              <span>Search Deals</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}