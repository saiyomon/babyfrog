import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface PixelLoadingAnimationProps {
  variant?: 'message' | 'image';
}

export default function PixelLoadingAnimation({ variant = 'message' }: PixelLoadingAnimationProps) {
  const [dots, setDots] = useState(".");
  
  // Animate dots
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => {
        if (prev.length >= 3) return ".";
        return prev + ".";
      });
    }, 400);
    return () => clearInterval(interval);
  }, []);

  if (variant === 'message') {
    return (
      <div className="pokemon-textbox-content p-3 pt-8 flex flex-col min-h-[80px]">
        {/* Left Heart */}
        <div className="absolute top-2 left-3">
          <div className="pokemon-yellow-heart"></div>
        </div>
        
        {/* Right Heart */}
        <div className="absolute top-2 right-3">
          <div className="pokemon-yellow-heart"></div>
        </div>
        
        <div className="flex items-center justify-center flex-1">
          <div className="relative flex items-center justify-center">
            {/* Pixel art cat face with animated loading dots */}
            <div className="pixel-loading-container relative">
              <div className="pixel-loading-cat">
                {/* Cat face construction - pure CSS pixel art */}
                <div className="cat-ear-left"></div>
                <div className="cat-ear-right"></div>
                <div className="cat-face"></div>
                <div className="cat-eye-left"></div>
                <div className="cat-eye-right"></div>
                <div className="cat-nose"></div>
                <div className="cat-mouth"></div>
                
                {/* Blush marks */}
                <div className="cat-blush-left"></div>
                <div className="cat-blush-right"></div>
              </div>
              
              <div className="loading-text font-pixel text-xs text-black mt-1">
                Loading{dots}
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Arrow Indicator (classic Pokemon style) - pulsing */}
        <div className="absolute bottom-1 right-3">
          <motion.div 
            className="pokemon-arrow-indicator"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>
    );
  }
  
  // Image loading animation
  return (
    <div className="w-full h-64 flex items-center justify-center bg-gray-100 pixel-art">
      <div className="pixel-image-loading">
        <div className="loading-pixel"></div>
        <div className="loading-pixel"></div>
        <div className="loading-pixel"></div>
        <div className="loading-pixel"></div>
        <div className="loading-pixel"></div>
        <div className="loading-pixel"></div>
        <div className="loading-pixel"></div>
        <div className="loading-pixel"></div>
        <div className="loading-text font-pixel text-sm text-black mt-3">
          Loading{dots}
        </div>
      </div>
    </div>
  );
}