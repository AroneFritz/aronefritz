import React, { useEffect, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsComplete(true);
            setTimeout(onComplete, 800); // Delay before hiding
          }, 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete]);

  useGSAP(() => {
    if (isComplete) {
      const tl = gsap.timeline();
      
      // Animate loading screen out
      tl.to('.loading-screen', {
        y: '-100%',
        duration: 0.8,
        ease: 'power2.inOut'
      });
    }
  }, [isComplete]);

  return (
    <div className="loading-screen fixed inset-0 z-50 bg-black flex flex-col items-center justify-center">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-black"></div>
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full pulse-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center">
        {/* Logo/Name */}
        <div className="mb-8 loading-text">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-2 tracking-wider bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
            Portfolio
          </h1>
          <p className="text-white/60 text-sm md:text-base tracking-[0.3rem] uppercase">
            Full-Stack Developer
          </p>
        </div>

        {/* Loading Animation */}
        <div className="mb-8">
          <div className="w-64 h-1 bg-white/20 rounded-full mx-auto mb-4 relative overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-300 ease-out relative"
              style={{ width: `${Math.min(progress, 100)}%` }}
            >
              <div className="absolute inset-0 loading-progress"></div>
            </div>
          </div>
          <p className="text-white/80 text-sm font-medium">
            Loading... {Math.round(Math.min(progress, 100))}%
          </p>
        </div>

        {/* Spinning loader */}
        <div className="relative">
          <div className="w-16 h-16 border-2 border-white/20 border-t-white rounded-full animate-spin mx-auto"></div>
          <div className="absolute inset-0 w-16 h-16 border-2 border-transparent border-r-blue-500 rounded-full animate-spin mx-auto" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
        </div>
      </div>

      {/* Bottom text */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <p className="text-white/40 text-xs tracking-wider">
          Crafting digital experiences...
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;
