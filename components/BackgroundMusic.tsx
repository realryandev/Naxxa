"use client"

import React, { useEffect, useRef } from 'react';

const BackgroundMusic = () => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Ensure the audio playback only happens on the client-side
    if (typeof window !== 'undefined') {
      // IMPORTANT: Next.js serves files in the 'public' directory at the root.
      // You should reference the file path relative to the 'public' directory.
      audioRef.current = new Audio('/Bktherula - DELILAH (Official Music Video).mp3');
      audioRef.current.loop = true;
      audioRef.current.volume = 0.5;

      const startTime = 35;
      const endTime = 195;

      const playMusic = () => {
        if (audioRef.current) {
          audioRef.current.currentTime = startTime;

          const playPromise = audioRef.current.play();

          if (playPromise !== undefined) {
            playPromise.then(() => {
              // Autoplay started!
              audioRef.current?.addEventListener('timeupdate', () => {
                if (audioRef.current && audioRef.current.currentTime >= endTime) {
                  audioRef.current.currentTime = startTime; // Loop back to start
                }
              });
            }).catch(error => {
              // Autoplay was prevented. Show a play button or handle it.
              console.warn("Autoplay was prevented", error);
            });
          }
        }
      };

      // Play the music when the component mounts
      playMusic();

      // Event listener for user interaction (for iOS and modern browsers) - attempt to play on first user interaction
      const handleFirstInteraction = () => {
          playMusic();
          window.removeEventListener('click', handleFirstInteraction);
          window.removeEventListener('touchstart', handleFirstInteraction);
      }
      window.addEventListener('click', handleFirstInteraction, { once: true });
      window.addEventListener('touchstart', handleFirstInteraction, { once: true });


      // Cleanup function to pause the music when the component unmounts
      return () => {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current = null;
        }
        window.removeEventListener('click', handleFirstInteraction);
        window.removeEventListener('touchstart', handleFirstInteraction);
      };
    }
  }, []);

  // Important: We don't render the audio element. It is controlled via the ref.
  return null;
};

export default BackgroundMusic;
