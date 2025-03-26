import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface FrogCharacterProps {
  onTap: () => void;
}

export default function FrogCharacter({ onTap }: FrogCharacterProps) {
  const [isBouncing, setIsBouncing] = useState(false);

  // Start bounce animation periodically
  useEffect(() => {
    const bounceInterval = setInterval(() => {
      setIsBouncing(true);
      
      // Stop bouncing after 2 seconds
      setTimeout(() => {
        setIsBouncing(false);
      }, 2000);
    }, 6000);
    
    return () => clearInterval(bounceInterval);
  }, []);

  return (
    <motion.div 
      className="relative mb-8 cursor-pointer"
      onClick={onTap}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      animate={isBouncing ? { y: [0, -10, 0, -8, 0] } : {}}
      transition={isBouncing ? { duration: 1.5, repeat: 1 } : {}}
      style={{ filter: "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.2))" }}
    >
      <svg className="w-48 h-48" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Frog Body */}
        <motion.ellipse 
          cx="100" 
          cy="110" 
          rx="70" 
          ry="60" 
          fill="#4CAF50"
          whileHover={{ scale: 1.02 }}
        />
        
        {/* Frog Belly */}
        <ellipse cx="100" cy="120" rx="45" ry="40" fill="#A0D995" />
        
        {/* Left Eye */}
        <motion.g
          animate={{ y: isBouncing ? [-2, 0, -2] : 0 }}
          transition={{ duration: 0.5, repeat: isBouncing ? 2 : 0 }}
        >
          <circle cx="70" cy="75" r="20" fill="white" />
          <motion.circle 
            cx="70" 
            cy="75" 
            r="10" 
            fill="black"
            animate={{ scale: [1, 0.9, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <circle cx="65" cy="70" r="5" fill="white" />
        </motion.g>
        
        {/* Right Eye */}
        <motion.g
          animate={{ y: isBouncing ? [-2, 0, -2] : 0 }}
          transition={{ duration: 0.5, repeat: isBouncing ? 2 : 0 }}
        >
          <circle cx="130" cy="75" r="20" fill="white" />
          <motion.circle 
            cx="130" 
            cy="75" 
            r="10" 
            fill="black"
            animate={{ scale: [1, 0.9, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
          />
          <circle cx="125" cy="70" r="5" fill="white" />
        </motion.g>
        
        {/* Mouth */}
        <motion.path 
          d="M80 125 Q100 140 120 125" 
          stroke="#388E3C" 
          strokeWidth="3" 
          fill="none"
          animate={{ d: isBouncing ? "M80 125 Q100 130 120 125" : "M80 125 Q100 140 120 125" }}
          transition={{ duration: 0.5 }}
        />
        
        {/* Left Hand */}
        <motion.ellipse 
          cx="40" 
          cy="110" 
          rx="15" 
          ry="10" 
          fill="#4CAF50" 
          transform="rotate(-20 40 110)"
          animate={{ rotate: isBouncing ? -30 : -20 }}
          transition={{ duration: 0.5 }}
        />
        
        {/* Right Hand */}
        <motion.ellipse 
          cx="160" 
          cy="110" 
          rx="15" 
          ry="10" 
          fill="#4CAF50" 
          transform="rotate(20 160 110)"
          animate={{ rotate: isBouncing ? 30 : 20 }}
          transition={{ duration: 0.5 }}
        />
      </svg>
      <div className="absolute bottom-0 w-full text-center font-['Bubblegum_Sans'] text-[#388E3C] text-lg">
        *Tap me!*
      </div>
    </motion.div>
  );
}
