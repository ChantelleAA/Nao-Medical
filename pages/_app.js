// pages/_app.js
import '../styles/globals.css';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  // Add event listener for SpeechSynthesis initialization on iOS
  useEffect(() => {
    // iOS requires user interaction to initialize speech synthesis
    const initSpeechSynthesis = () => {
      if (window.speechSynthesis) {
        // Create an empty utterance to initialize the speechSynthesis API
        const utterance = new SpeechSynthesisUtterance('');
        utterance.volume = 0; // Silent
        window.speechSynthesis.speak(utterance);
      }
    };

    // Add event listeners to initialize on interaction
    document.addEventListener('click', initSpeechSynthesis, { once: true });
    document.addEventListener('touchstart', initSpeechSynthesis, { once: true });

    return () => {
      document.removeEventListener('click', initSpeechSynthesis);
      document.removeEventListener('touchstart', initSpeechSynthesis);
    };
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;