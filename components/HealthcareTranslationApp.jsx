import React, { useState, useEffect, useRef } from 'react';
import LanguageSelector from './LanguageSelector';
import TranscriptDisplay from './TranscriptDisplay';
import RecordButton from './RecordButton';
import SpeakButton from './SpeakButton';
import ErrorMessage from './ErrorMessage';

// Language codes and names mapping
const languages = [
  { code: 'en-US', name: 'English' },
  { code: 'es-ES', name: 'Spanish' },
  { code: 'fr-FR', name: 'French' },
  { code: 'zh-CN', name: 'Chinese (Simplified)' },
  { code: 'ar-SA', name: 'Arabic' },
  { code: 'hi-IN', name: 'Hindi' },
  { code: 'ru-RU', name: 'Russian' },
  { code: 'de-DE', name: 'German' },
  { code: 'ja-JP', name: 'Japanese' },
  { code: 'ko-KR', name: 'Korean' },
];

const HealthcareTranslationApp = () => {
  // State variables
  const [sourceLanguage, setSourceLanguage] = useState('en-US');
  const [targetLanguage, setTargetLanguage] = useState('es-ES');
  const [originalText, setOriginalText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  
  // References
  const recognitionRef = useRef(null);
  
  // Initialize speech recognition
  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      
      recognitionRef.current.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0].transcript)
          .join('');
        
        setOriginalText(transcript);
      };
      
      recognitionRef.current.onerror = (event) => {
        setErrorMessage(`Speech recognition error: ${event.error}`);
        setIsRecording(false);
      };
      
      recognitionRef.current.onend = () => {
        if (isRecording) {
          recognitionRef.current.start();
        }
      };
    } else {
      setErrorMessage('Speech recognition is not supported in this browser.');
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [isRecording]);
  
  // Update language for speech recognition
  useEffect(() => {
    if (recognitionRef.current) {
      recognitionRef.current.lang = sourceLanguage;
    }
  }, [sourceLanguage]);
  
  // Translate text when original text changes (with debounce)
  useEffect(() => {
    const translateTimeout = setTimeout(() => {
      if (originalText) {
        translateText();
      }
    }, 1000); // 1-second debounce
    
    return () => clearTimeout(translateTimeout);
  }, [originalText, targetLanguage]);
  
  // Handle recording toggle
  const toggleRecording = () => {
    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      setErrorMessage('');
      recognitionRef.current.start();
      setIsRecording(true);
    }
  };
  
  // Translate text using OpenAI API
  const translateText = async () => {
    try {
      setIsTranslating(true);
      
      // Call to API endpoint (you would need to create this API endpoint)
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: originalText,
          sourceLanguage: sourceLanguage.split('-')[0],
          targetLanguage: targetLanguage.split('-')[0],
          context: 'healthcare',
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setTranslatedText(data.translatedText);
        setErrorMessage('');
      } else {
        setErrorMessage(`Translation error: ${data.error || 'Unknown error'}`);
      }
    } catch (error) {
      setErrorMessage(`Translation error: ${error.message}`);
    } finally {
      setIsTranslating(false);
    }
  };
  
  // Handle language change
  const handleSourceLanguageChange = (e) => {
    setSourceLanguage(e.target.value);
    if (isRecording) {
      recognitionRef.current.stop();
      recognitionRef.current.start();
    }
  };
  
  const handleTargetLanguageChange = (e) => {
    setTargetLanguage(e.target.value);
  };
  
  // Clear transcript
  const clearTranscript = () => {
    setOriginalText('');
    setTranslatedText('');
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <h1 className="text-2xl font-bold text-center">Healthcare Translation</h1>
      </header>
      
      <main className="flex-1 container mx-auto p-4 md:p-6 flex flex-col">
        <div className="flex flex-col md:flex-row md:space-x-4 mb-6">
          <LanguageSelector
            id="source-language"
            label="Source Language"
            value={sourceLanguage}
            onChange={handleSourceLanguageChange}
            languages={languages}
            className="mb-4 md:mb-0 md:w-1/2"
          />
          
          <LanguageSelector
            id="target-language"
            label="Target Language"
            value={targetLanguage}
            onChange={handleTargetLanguageChange}
            languages={languages}
            className="md:w-1/2"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 flex-1">
          <TranscriptDisplay
            title="Original Text"
            text={originalText}
            language={sourceLanguage}
            isLoading={isRecording}
            loadingText="Recording..."
          />
          
          <TranscriptDisplay
            title="Translated Text"
            text={translatedText}
            language={targetLanguage}
            isLoading={isTranslating}
            loadingText="Translating..."
          />
        </div>
        
        <div className="flex flex-wrap justify-center gap-4 mb-4">
          <RecordButton
            isRecording={isRecording}
            onClick={toggleRecording}
          />
          
          <SpeakButton
            text={translatedText}
            language={targetLanguage}
            disabled={!translatedText}
          />
          
          <button
            onClick={clearTranscript}
            className="px-6 py-2 bg-gray-500 text-white rounded-full hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            Clear
          </button>
        </div>
        
        {errorMessage && <ErrorMessage message={errorMessage} />}
      </main>
      
      <footer className="bg-gray-200 p-4 text-center text-gray-600 text-sm">
        <p>Healthcare Translation Prototype - Confidential Patient Information</p>
      </footer>
    </div>
  );
};

export default HealthcareTranslationApp;