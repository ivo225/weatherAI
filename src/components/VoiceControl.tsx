import React, { useState } from 'react';
import { FaPlay, FaStop } from 'react-icons/fa';

interface VoiceControlProps {
  text: string;
}

export default function VoiceControl({ text }: VoiceControlProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      try {
        // Ensure any previous speech is stopped
        stopSpeaking();

        // Wait a small delay to ensure previous speech is fully cancelled
        setTimeout(() => {
          const utterance = new SpeechSynthesisUtterance(text);
          utterance.lang = 'en-US';
          utterance.rate = 1;
          utterance.pitch = 1;

          // Handle speech end
          utterance.onend = () => {
            setIsPlaying(false);
          };

          // Handle any errors
          utterance.onerror = (event) => {
            // Only log errors that aren't from interruption
            if (event.error !== 'interrupted') {
              console.error('Speech synthesis error:', event);
            }
            setIsPlaying(false);
          };

          setIsPlaying(true);
          window.speechSynthesis.speak(utterance);
        }, 50);
      } catch (error) {
        console.error('Error initializing speech:', error);
        setIsPlaying(false);
      }
    } else {
      console.error('Speech synthesis not supported');
    }
  };

  const stopSpeaking = () => {
    if (window.speechSynthesis.speaking || window.speechSynthesis.pending) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    }
  };

  const handleClick = () => {
    if (isPlaying) {
      stopSpeaking();
    } else {
      speak(text);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="p-2 text-primary hover:text-primary/80 transition-colors duration-200 ease-in-out"
      aria-label={isPlaying ? 'Stop narration' : 'Play narration'}
      title={isPlaying ? 'Stop narration' : 'Play narration'}
    >
      {isPlaying ? (
        <FaStop className="text-xl" />
      ) : (
        <FaPlay className="text-xl" />
      )}
    </button>
  );
}
