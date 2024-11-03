import React from 'react';
import { X } from 'lucide-react';
import DealDetail from './DealDetail';

interface DealPreviewProps {
  deal: {
    origin: string;
    destination: string;
    airline: string;
    departureDate: string;
    returnDate: string;
    class: string;
    price: number;
    originalPrice: number;
    stops: Array<{ city: string; layover: string }>;
    imageUrl: string;
    description: string;
    validUntil: string;
    backLink: string;
  };
  onClose: () => void;
}

export default function DealPreview({ deal, onClose }: DealPreviewProps) {
  return (
    <div className="relative">
      <button
        onClick={onClose}
        className="absolute right-4 top-4 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100"
      >
        <X className="w-5 h-5" />
      </button>
      <DealDetail {...deal} />
    </div>
  );
}