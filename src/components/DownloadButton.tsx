import React, { useState } from 'react';
import { Download, Loader2 } from 'lucide-react';

export default function DownloadButton() {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    try {
      setIsGenerating(true);
      
      // Generate the zip file
      await fetch('/api/generate-zip', {
        method: 'POST'
      });
      
      // Download the file
      window.location.href = '/project.zip';
    } catch (error) {
      console.error('Failed to generate zip:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={isGenerating}
      className="fixed bottom-6 right-6 bg-primary-600 text-white p-4 rounded-full shadow-lg hover:bg-primary-700 transition-colors z-50 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
      aria-label="Download Project"
    >
      {isGenerating ? (
        <Loader2 className="w-6 h-6 animate-spin" />
      ) : (
        <Download className="w-6 h-6" />
      )}
    </button>
  );
}