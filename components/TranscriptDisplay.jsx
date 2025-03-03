// TranscriptDisplay.jsx
import React from 'react';

const TranscriptDisplay = ({ title, text, language, isLoading, loadingText }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow h-64 md:h-80 flex flex-col">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        {isLoading && (
          <span className="text-sm text-blue-600 animate-pulse">{loadingText}</span>
        )}
      </div>
      <div 
        className="flex-1 overflow-y-auto p-2 bg-gray-50 rounded border border-gray-200"
        lang={language.split('-')[0]}
        dir={['ar-SA'].includes(language) ? 'rtl' : 'ltr'}
      >
        {text || <span className="text-gray-400 italic">No text yet...</span>}
      </div>
    </div>
  );
};

export default TranscriptDisplay;
