// SpeakButton.jsx
import React, { useState } from 'react';

const SpeakButton = ({ text, language, disabled }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  const handleSpeak = () => {
    if (!text || !window.speechSynthesis) return;
    
    setIsSpeaking(true);
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;
    
    utterance.onend = () => {
      setIsSpeaking(false);
    };
    
    utterance.onerror = () => {
      setIsSpeaking(false);
    };
    
    window.speechSynthesis.speak(utterance);
  };
  
  return (
    <button
      onClick={handleSpeak}
      disabled={disabled || isSpeaking}
      className={`flex items-center px-6 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 ${
        disabled
          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
          : isSpeaking
            ? 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500'
            : 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500'
      }`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 mr-2"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414-1.414m-2.829-4.121a9 9 0 012.829-2.829"
        />
      </svg>
      {isSpeaking ? 'Speaking...' : 'Speak'}
    </button>
  );
};

export default SpeakButton;