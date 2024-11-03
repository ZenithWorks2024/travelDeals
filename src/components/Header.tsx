import React from 'react';
import { Plane, Hotel, Search, User, Settings } from 'lucide-react';

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export default function Header({ onNavigate, currentPage }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <span 
              className="text-2xl font-bold text-primary-600 cursor-pointer" 
              onClick={() => onNavigate('home')}
            >
              TravelDeals
            </span>
          </div>
          
          <div className="hidden sm:flex items-center space-x-8">
            <button 
              onClick={() => onNavigate('home')}
              className={`flex items-center space-x-1 ${currentPage === 'home' ? 'text-primary-600' : 'text-gray-600 hover:text-primary-600'}`}
            >
              <Plane className="w-5 h-5" />
              <span>Flights</span>
            </button>
            <button 
              onClick={() => onNavigate('guest-post')}
              className={`flex items-center space-x-1 ${currentPage === 'guest-post' ? 'text-primary-600' : 'text-gray-600 hover:text-primary-600'}`}
            >
              <Hotel className="w-5 h-5" />
              <span>Guest Post</span>
            </button>
            <button 
              onClick={() => onNavigate('manage')}
              className={`flex items-center space-x-1 ${currentPage === 'manage' ? 'text-primary-600' : 'text-gray-600 hover:text-primary-600'}`}
            >
              <Settings className="w-5 h-5" />
              <span>Manage</span>
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span>Login</span>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}