import React from 'react';
import { Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Subscribe to Deals</h3>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-l-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button className="bg-primary-600 px-4 py-2 rounded-r-lg hover:bg-primary-700">
                <Mail className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/about" className="hover:text-primary-300">About Us</a></li>
              <li><a href="/contact" className="hover:text-primary-300">Contact</a></li>
              <li><a href="/guest-post" className="hover:text-primary-300">Guest Post</a></li>
              <li><a href="/terms" className="hover:text-primary-300">Terms & Conditions</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Popular Destinations</h3>
            <ul className="space-y-2">
              <li><a href="/deals/dubai" className="hover:text-primary-300">Dubai</a></li>
              <li><a href="/deals/singapore" className="hover:text-primary-300">Singapore</a></li>
              <li><a href="/deals/bangkok" className="hover:text-primary-300">Bangkok</a></li>
              <li><a href="/deals/london" className="hover:text-primary-300">London</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li>Email: support@traveldeals.com</li>
              <li>Follow us on social media</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-primary-800 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} TravelDeals. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}