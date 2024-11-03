import React, { useState, useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Plane, Calendar, DollarSign } from 'lucide-react';
import DealDetail from './DealDetail';
import { cities } from '../data/cities';
import { airlines } from '../data/airlines';

interface Stop {
  city: string;
  layover: string;
}

interface FormData {
  origin: string;
  destination: string;
  airline: string;
  class: 'economy' | 'premium_economy' | 'business' | 'first';
  stops: Stop[];
  originalPrice: number;
  offerPrice: number;
  travelMonth: string;
  validUntil: string;
  image: File | null;
  content: string;
  backLink: string;
}

export default function GuestPost() {
  const [formData, setFormData] = useState<FormData>({
    origin: '',
    destination: '',
    airline: '',
    class: 'economy',
    stops: [],
    originalPrice: 0,
    offerPrice: 0,
    travelMonth: '',
    validUntil: '',
    image: null,
    content: '',
    backLink: ''
  });

  const [previewMode, setPreviewMode] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editorRef = useRef<any>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEditorChange = (content: string) => {
    setFormData(prev => ({ ...prev, content }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleStopAdd = () => {
    setFormData(prev => ({
      ...prev,
      stops: [...prev.stops, { city: '', layover: '' }]
    }));
  };

  const handleStopChange = (index: number, field: keyof Stop, value: string) => {
    setFormData(prev => ({
      ...prev,
      stops: prev.stops.map((stop, i) =>
        i === index ? { ...stop, [field]: value } : stop
      )
    }));
  };

  const handleStopRemove = (index: number) => {
    setFormData(prev => ({
      ...prev,
      stops: prev.stops.filter((_, i) => i !== index)
    }));
  };

  const togglePreview = () => {
    setPreviewMode(!previewMode);
  };

  if (previewMode) {
    return (
      <div className="container mx-auto px-4">
        <button
          onClick={togglePreview}
          className="mb-4 bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700"
        >
          Back to Edit
        </button>
        <DealDetail
          origin={formData.origin}
          destination={formData.destination}
          airline={formData.airline}
          departureDate={formData.travelMonth}
          returnDate={formData.travelMonth}
          class={formData.class}
          price={formData.offerPrice}
          originalPrice={formData.originalPrice}
          stops={formData.stops}
          imageUrl={imagePreview || 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05'}
          description={formData.content}
          validUntil={formData.validUntil}
          backLink={formData.backLink}
        />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Create New Deal</h1>
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Origin City</label>
            <input
              type="text"
              name="origin"
              value={formData.origin}
              onChange={handleInputChange}
              list="origins"
              className="w-full p-2 border rounded-md"
            />
            <datalist id="origins">
              {cities.map(city => (
                <option key={city} value={city} />
              ))}
            </datalist>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Destination City</label>
            <input
              type="text"
              name="destination"
              value={formData.destination}
              onChange={handleInputChange}
              list="destinations"
              className="w-full p-2 border rounded-md"
            />
            <datalist id="destinations">
              {cities.map(city => (
                <option key={city} value={city} />
              ))}
            </datalist>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Airline</label>
          <input
            type="text"
            name="airline"
            value={formData.airline}
            onChange={handleInputChange}
            list="airlines"
            className="w-full p-2 border rounded-md"
          />
          <datalist id="airlines">
            {airlines.map(airline => (
              <option key={airline} value={airline} />
            ))}
          </datalist>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Class</label>
          <select
            name="class"
            value={formData.class}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
          >
            <option value="economy">Economy</option>
            <option value="premium_economy">Premium Economy</option>
            <option value="business">Business</option>
            <option value="first">First</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Stops</label>
          {formData.stops.map((stop, index) => (
            <div key={index} className="flex gap-4 mb-2">
              <input
                type="text"
                placeholder="City"
                value={stop.city}
                onChange={(e) => handleStopChange(index, 'city', e.target.value)}
                className="flex-1 p-2 border rounded-md"
              />
              <input
                type="text"
                placeholder="Layover time"
                value={stop.layover}
                onChange={(e) => handleStopChange(index, 'layover', e.target.value)}
                className="w-32 p-2 border rounded-md"
              />
              <button
                onClick={() => handleStopRemove(index)}
                className="px-3 py-2 bg-red-600 text-white rounded-md"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            onClick={handleStopAdd}
            className="mt-2 px-4 py-2 bg-primary-600 text-white rounded-md"
          >
            Add Stop
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Original Price</label>
            <input
              type="number"
              name="originalPrice"
              value={formData.originalPrice}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Offer Price</label>
            <input
              type="number"
              name="offerPrice"
              value={formData.offerPrice}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Travel Month</label>
            <input
              type="month"
              name="travelMonth"
              value={formData.travelMonth}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Valid Until</label>
            <input
              type="date"
              name="validUntil"
              value={formData.validUntil}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            className="w-full p-2 border rounded-md"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-2 max-w-xs rounded-md"
            />
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Back Link</label>
          <input
            type="url"
            name="backLink"
            value={formData.backLink}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
            placeholder="https://example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <Editor
            apiKey="your-api-key-here"
            onInit={(evt, editor) => editorRef.current = editor}
            init={{
              height: 400,
              menubar: false,
              plugins: [
                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
              ],
              toolbar: 'undo redo | blocks | ' +
                'bold italic forecolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | help',
              content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
              readonly: false
            }}
            onEditorChange={handleEditorChange}
            value={formData.content}
          />
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={togglePreview}
            className="bg-primary-600 text-white px-6 py-2 rounded-md hover:bg-primary-700"
          >
            Preview
          </button>
        </div>
      </div>
    </div>
  );
}