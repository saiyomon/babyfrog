import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface FrogCharacterProps {
  onTap: () => void;
}

interface CherryBlossom {
  id: number;
  size: number;
  left: string;
  delay: number;
  duration: number;
}

export default function FrogCharacter({ onTap }: FrogCharacterProps) {
  const [isBouncing, setIsBouncing] = useState(false);
  const [cherryBlossoms, setCherryBlossoms] = useState<CherryBlossom[]>([]);

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

  // Generate cherry blossoms
  useEffect(() => {
    const createBlossoms = () => {
      const newBlossoms: CherryBlossom[] = [];
      for (let i = 0; i < 20; i++) {
        newBlossoms.push({
          id: i,
          size: Math.floor(Math.random() * 10) + 5,
          left: `${Math.random() * 100}%`,
          delay: Math.random() * 20,
          duration: Math.random() * 10 + 10,
        });
      }
      setCherryBlossoms(newBlossoms);
    };

    createBlossoms();
    const interval = setInterval(createBlossoms, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Cherry blossom petals */}
      {cherryBlossoms.map((blossom) => (
        <div
          key={blossom.id}
          className="cherry-blossom pixel-art"
          style={{
            width: `${blossom.size}px`,
            height: `${blossom.size}px`,
            left: blossom.left,
            backgroundColor: '#FFB7C5',
            animationDuration: `${blossom.duration}s`,
            animationDelay: `${blossom.delay}s`,
          }}
        />
      ))}

      {/* Pixel Art Pond Scene */}
      <motion.div 
        className="relative mb-8 cursor-pointer"
        onClick={onTap}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={isBouncing ? { y: [0, -10, 0, -8, 0] } : {}}
        transition={isBouncing ? { duration: 1.5, repeat: 1 } : {}}
      >
        <svg className="w-72 h-72 pixel-art" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" shapeRendering="crispEdges">
          {/* Sky Background */}
          <rect x="0" y="0" width="64" height="64" fill="#87CEEB" />
          <rect x="0" y="0" width="64" height="2" fill="#97DEEB" />
          
          {/* Sun */}
          <rect x="4" y="4" width="8" height="8" fill="#FFFF00" />
          <rect x="12" y="4" width="4" height="4" fill="#FFFF00" />
          <rect x="4" y="12" width="4" height="4" fill="#FFFF00" />
          <rect x="3" y="7" width="1" height="2" fill="#FFFF55" />
          <rect x="7" y="3" width="2" height="1" fill="#FFFF55" />
          <rect x="12" y="7" width="1" height="2" fill="#FFFF55" />
          <rect x="7" y="12" width="2" height="1" fill="#FFFF55" />
          
          {/* Large Shrine in Background */}
          <rect x="0" y="0" width="64" height="64" fill="#FFE9D2" />
          
          {/* Shrine Architecture */}
          <rect x="10" y="2" width="44" height="30" fill="#D32F2F" />
          <rect x="8" y="0" width="48" height="6" fill="#B71C1C" />
          <rect x="14" y="6" width="36" height="4" fill="#C62828" />
          <rect x="16" y="12" width="32" height="20" fill="#FAFAFA" />
          <rect x="18" y="12" width="28" height="20" fill="#EEEEEE" />
          <rect x="16" y="10" width="32" height="4" fill="#BDBDBD" />
          
          <rect x="6" y="32" width="4" height="20" fill="#8B4513" />
          <rect x="54" y="32" width="4" height="20" fill="#8B4513" />
          <rect x="10" y="32" width="44" height="2" fill="#8B4513" />
          
          {/* Shrine Door */}
          <rect x="26" y="18" width="12" height="14" fill="#C62828" />
          <rect x="28" y="20" width="8" height="12" fill="#8B4513" />
          <rect x="30" y="20" width="4" height="12" fill="#6D3500" />
          
          {/* Shrine Decorative Elements */}
          <rect x="20" y="8" width="6" height="2" fill="#FFD700" />
          <rect x="38" y="8" width="6" height="2" fill="#FFD700" />
          <rect x="14" y="36" width="36" height="2" fill="#FFD700" />
          
          {/* Windows */}
          <rect x="20" y="14" width="4" height="6" fill="#87CEEB" />
          <rect x="40" y="14" width="4" height="6" fill="#87CEEB" />
          
          {/* Clouds */}
          <rect x="32" y="6" width="16" height="4" fill="#FFFFFF" />
          <rect x="30" y="10" width="20" height="3" fill="#FFFFFF" />
          <rect x="34" y="4" width="10" height="2" fill="#FFFFFF" />
          <rect x="50" y="14" width="10" height="4" fill="#FFFFFF" />
          <rect x="52" y="12" width="6" height="2" fill="#FFFFFF" />
          <rect x="48" y="16" width="14" height="2" fill="#F5F5F5" />
          
          {/* Background Trees */}
          <rect x="4" y="28" width="4" height="12" fill="#8B4513" />
          <rect x="2" y="20" width="8" height="8" fill="#228B22" />
          <rect x="0" y="16" width="12" height="4" fill="#228B22" />
          <rect x="3" y="14" width="6" height="2" fill="#32CD32" />
          
          <rect x="56" y="30" width="4" height="10" fill="#8B4513" />
          <rect x="54" y="24" width="8" height="6" fill="#228B22" />
          <rect x="52" y="18" width="12" height="6" fill="#228B22" />
          <rect x="54" y="16" width="8" height="2" fill="#32CD32" />
          
          {/* Cherry Blossoms Tree */}
          <rect x="44" y="28" width="6" height="14" fill="#8B4513" />
          <rect x="40" y="22" width="14" height="6" fill="#FFAEC9" />
          <rect x="38" y="16" width="18" height="6" fill="#FFAEC9" />
          <rect x="42" y="10" width="10" height="6" fill="#FFAEC9" />
          <rect x="44" y="8" width="6" height="2" fill="#FFD1DC" />
          <rect x="38" y="22" width="2" height="2" fill="#FFD1DC" />
          <rect x="54" y="22" width="2" height="2" fill="#FFD1DC" />
          <rect x="36" y="18" width="2" height="2" fill="#FFD1DC" />
          <rect x="56" y="18" width="2" height="2" fill="#FFD1DC" />
          
          {/* Pond */}
          <rect x="12" y="36" width="40" height="16" fill="#4682B4" />
          <rect x="16" y="40" width="32" height="8" fill="#46B4B4" />
          <rect x="14" y="38" width="36" height="2" fill="#5694C6" />
          <rect x="12" y="36" width="40" height="1" fill="#67A5D7" />
          <rect x="20" y="44" width="24" height="2" fill="#3AA5A5" />
          
          {/* Lily Pads */}
          <motion.g 
            animate={{ y: isBouncing ? [-1, 0, -1] : 0 }}
            transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
          >
            <rect x="16" y="38" width="6" height="6" fill="#32CD32" />
            <rect x="42" y="42" width="6" height="6" fill="#32CD32" />
            <rect x="24" y="46" width="6" height="4" fill="#32CD32" />
            <rect x="18" y="40" width="2" height="2" fill="#229922" />
            <rect x="44" y="44" width="2" height="2" fill="#229922" />
            <rect x="26" y="47" width="2" height="2" fill="#229922" />
          </motion.g>
          
          {/* Ground */}
          <rect x="0" y="52" width="64" height="12" fill="#8B4513" />
          <rect x="0" y="52" width="64" height="4" fill="#9B5523" />
          <rect x="0" y="52" width="64" height="1" fill="#ADBD34" />
          
          {/* Grass Detail */}
          <rect x="2" y="51" width="2" height="1" fill="#32CD32" />
          <rect x="6" y="51" width="2" height="1" fill="#32CD32" />
          <rect x="10" y="51" width="1" height="1" fill="#32CD32" />
          <rect x="14" y="51" width="2" height="1" fill="#32CD32" />
          <rect x="19" y="51" width="1" height="1" fill="#32CD32" />
          <rect x="23" y="51" width="2" height="1" fill="#32CD32" />
          <rect x="28" y="51" width="1" height="1" fill="#32CD32" />
          <rect x="32" y="51" width="2" height="1" fill="#32CD32" />
          <rect x="38" y="51" width="1" height="1" fill="#32CD32" />
          <rect x="43" y="51" width="2" height="1" fill="#32CD32" />
          <rect x="48" y="51" width="1" height="1" fill="#32CD32" />
          <rect x="52" y="51" width="2" height="1" fill="#32CD32" />
          <rect x="58" y="51" width="2" height="1" fill="#32CD32" />
          <rect x="62" y="51" width="2" height="1" fill="#32CD32" />
          
          {/* Pixel Frog Character */}
          <motion.g
            animate={{ y: isBouncing ? [-4, 0, -3, 0] : 0 }}
            transition={{ duration: 1, repeat: isBouncing ? 1 : 0 }}
          >
            {/* Background - Pixel Art Shrine and Trees */}
            {/* Detailed Sky with Gradient */}
            <rect x="0" y="0" width="64" height="50" fill="#A7D7F9" />
            <rect x="0" y="0" width="64" height="10" fill="#87CEEB" />
            <rect x="0" y="10" width="64" height="5" fill="#97D9F5" />
            
            {/* Sun with Rays */}
            <circle cx="10" cy="8" r="4" fill="#FFDE00" stroke="#FFB000" strokeWidth="0.3" />
            <path d="M 10 2 L 10 0" stroke="#FFDE00" strokeWidth="0.8" />
            <path d="M 10 14 L 10 16" stroke="#FFDE00" strokeWidth="0.8" />
            <path d="M 4 8 L 2 8" stroke="#FFDE00" strokeWidth="0.8" />
            <path d="M 16 8 L 18 8" stroke="#FFDE00" strokeWidth="0.8" />
            <path d="M 6 4 L 4 2" stroke="#FFDE00" strokeWidth="0.8" />
            <path d="M 14 12 L 16 14" stroke="#FFDE00" strokeWidth="0.8" />
            <path d="M 6 12 L 4 14" stroke="#FFDE00" strokeWidth="0.8" />
            <path d="M 14 4 L 16 2" stroke="#FFDE00" strokeWidth="0.8" />
            
            {/* Clouds */}
            <ellipse cx="20" cy="6" rx="4" ry="2" fill="white" opacity="0.9" />
            <ellipse cx="24" cy="7" rx="5" ry="3" fill="white" opacity="0.9" />
            <ellipse cx="18" cy="8" rx="3" ry="2" fill="white" opacity="0.9" />
            
            <ellipse cx="48" cy="9" rx="5" ry="3" fill="white" opacity="0.8" />
            <ellipse cx="44" cy="10" rx="4" ry="2" fill="white" opacity="0.8" />
            <ellipse cx="52" cy="10" rx="4" ry="2" fill="white" opacity="0.8" />
            
            {/* Ground with Detail */}
            <rect x="0" y="42" width="64" height="8" fill="#8BC34A" />
            <rect x="0" y="42" width="64" height="3" fill="#9CCC65" />
            
            {/* Detailed grass tufts */}
            <path d="M 4 42 L 3 40 L 4 42 L 5 38 L 6 42" fill="#6AAB37" stroke="#558B2F" strokeWidth="0.1" />
            <path d="M 12 42 L 10 39 L 12 42 L 13 38 L 14 42" fill="#6AAB37" stroke="#558B2F" strokeWidth="0.1" />
            <path d="M 22 42 L 21 40 L 22 42 L 23 39 L 24 42" fill="#6AAB37" stroke="#558B2F" strokeWidth="0.1" />
            <path d="M 38 42 L 37 40 L 38 42 L 39 38 L 40 42" fill="#6AAB37" stroke="#558B2F" strokeWidth="0.1" />
            <path d="M 48 42 L 46 39 L 48 42 L 50 38 L 51 42" fill="#6AAB37" stroke="#558B2F" strokeWidth="0.1" />
            <path d="M 58 42 L 57 40 L 58 42 L 59 38 L 60 42" fill="#6AAB37" stroke="#558B2F" strokeWidth="0.1" />
            
            {/* Left Cherry Blossom Tree */}
            <rect x="5" y="30" width="6" height="12" fill="#8B4513" stroke="#723808" strokeWidth="0.3" />
            <path d="M 8 30 C 4 26 0 24 3 20" fill="#A0522D" stroke="#723808" strokeWidth="0.2" />
            <path d="M 8 32 C 14 28 16 24 12 22" fill="#A0522D" stroke="#723808" strokeWidth="0.2" />
            
            {/* Cherry blossom foliage */}
            <ellipse cx="3" cy="20" rx="5" ry="4" fill="#FFB7C5" stroke="#FF9EB5" strokeWidth="0.2" />
            <ellipse cx="7" cy="18" rx="6" ry="5" fill="#FFB7C5" stroke="#FF9EB5" strokeWidth="0.2" />
            <ellipse cx="12" cy="22" rx="5" ry="4" fill="#FFB7C5" stroke="#FF9EB5" strokeWidth="0.2" />
            <ellipse cx="2" cy="24" rx="4" ry="3" fill="#FFB7C5" stroke="#FF9EB5" strokeWidth="0.2" />
            <ellipse cx="10" cy="26" rx="4" ry="3" fill="#FFB7C5" stroke="#FF9EB5" strokeWidth="0.2" />
            
            {/* Blossom details */}
            <circle cx="2" cy="20" r="0.5" fill="white" />
            <circle cx="4" cy="19" r="0.5" fill="white" />
            <circle cx="7" cy="17" r="0.5" fill="white" />
            <circle cx="9" cy="19" r="0.5" fill="white" />
            <circle cx="13" cy="22" r="0.5" fill="white" />
            <circle cx="11" cy="24" r="0.5" fill="white" />
            <circle cx="1" cy="24" r="0.5" fill="white" />
            <circle cx="3" cy="25" r="0.5" fill="white" />
            
            {/* Right Pine Tree */}
            <rect x="54" y="32" width="4" height="10" fill="#8B4513" stroke="#723808" strokeWidth="0.3" />
            
            {/* Pine tree layers */}
            <path d="M 56 16 L 52 22 L 60 22 Z" fill="#228B22" stroke="#006400" strokeWidth="0.2" />
            <path d="M 56 20 L 50 28 L 62 28 Z" fill="#228B22" stroke="#006400" strokeWidth="0.2" />
            <path d="M 56 26 L 48 34 L 64 34 Z" fill="#228B22" stroke="#006400" strokeWidth="0.2" />
            
            {/* Pine needles detail */}
            <path d="M 54 21 L 52 20" stroke="#32CD32" strokeWidth="0.2" />
            <path d="M 58 21 L 60 20" stroke="#32CD32" strokeWidth="0.2" />
            <path d="M 52 27 L 50 26" stroke="#32CD32" strokeWidth="0.2" />
            <path d="M 60 27 L 62 26" stroke="#32CD32" strokeWidth="0.2" />
            <path d="M 50 33 L 48 32" stroke="#32CD32" strokeWidth="0.2" />
            <path d="M 62 33 L 64 32" stroke="#32CD32" strokeWidth="0.2" />
            
            {/* Detailed Japanese Shrine */}
            <rect x="25" y="22" width="14" height="20" fill="#E53935" stroke="#000" strokeWidth="0.3" />
            <rect x="22" y="20" width="20" height="3" fill="#8B4513" stroke="#000" strokeWidth="0.3" />
            <rect x="24" y="17" width="16" height="3" fill="#8B4513" stroke="#000" strokeWidth="0.3" />
            
            {/* Shrine door with details */}
            <rect x="28" y="33" width="8" height="9" fill="#F5F5DC" stroke="#000" strokeWidth="0.3" />
            <rect x="31" y="33" width="2" height="9" fill="#E6E6C8" stroke="#000" strokeWidth="0.1" />
            <circle cx="30" cy="38" r="0.5" fill="#8B4513" />
            <circle cx="34" cy="38" r="0.5" fill="#8B4513" />
            
            {/* Shrine roof details */}
            <path d="M 22 20 L 24 17 L 40 17 L 42 20" fill="none" stroke="#000" strokeWidth="0.3" />
            <rect x="29" y="15" width="6" height="2" fill="#E53935" stroke="#000" strokeWidth="0.2" />
            
            {/* Shrine decorative elements */}
            <rect x="27" y="24" width="10" height="2" fill="#FFD700" stroke="#000" strokeWidth="0.2" />
            <rect x="27" y="28" width="10" height="1" fill="#FFD700" stroke="#000" strokeWidth="0.1" />
            
            {/* Small stone path */}
            <rect x="30" y="42" width="4" height="2" fill="#9E9E9E" stroke="#757575" strokeWidth="0.2" />
            <rect x="28" y="44" width="8" height="2" fill="#9E9E9E" stroke="#757575" strokeWidth="0.2" />
            <rect x="26" y="46" width="12" height="2" fill="#9E9E9E" stroke="#757575" strokeWidth="0.2" />
            
            {/* Pond in foreground */}
            <ellipse cx="44" cy="45" rx="8" ry="3" fill="#4FC3F7" stroke="#29B6F6" strokeWidth="0.2" />
            <path d="M 38 44 C 40 43 48 43 50 44" stroke="#81D4FA" strokeWidth="0.2" fill="none" />
            <path d="M 39 46 C 42 47 48 47 49 46" stroke="#81D4FA" strokeWidth="0.2" fill="none" />
            
            {/* Lily pad on pond */}
            <ellipse cx="42" cy="45" rx="2" ry="1.2" fill="#4CAF50" stroke="#388E3C" strokeWidth="0.2" />
            
            {/* Detailed Cute Frog Character */}
            {/* Main head shape */}
            <rect x="27" y="36" width="10" height="7" fill="#7FDB8F" stroke="#000" strokeWidth="0.3" rx="3.5" />
            <rect x="26" y="37" width="12" height="6" fill="#7FDB8F" stroke="#000" strokeWidth="0.3" rx="3" />
            
            {/* Body */}
            <rect x="26" y="40" width="12" height="5" fill="#7FDB8F" stroke="#000" strokeWidth="0.3" rx="2.5" />
            <rect x="25" y="41" width="14" height="4" fill="#7FDB8F" stroke="#000" strokeWidth="0.3" rx="2" />
            
            {/* Frog Belly - Detailed with pattern */}
            <rect x="28" y="41" width="8" height="3" fill="#E8FFE8" stroke="#000" strokeWidth="0.2" rx="1.5" />
            <ellipse cx="32" cy="42.5" rx="3.5" ry="2" fill="#D9FFD9" stroke="#000" strokeWidth="0.1" />
            
            {/* Eyes - Large, expressive with highlights */}
            <motion.g
              animate={{ y: isBouncing ? [-1, 0, -1] : 0 }}
              transition={{ duration: 0.5, repeat: isBouncing ? 2 : 0 }}
            >
              {/* Left eye */}
              <circle cx="29" cy="38" r="2.2" fill="white" stroke="#000" strokeWidth="0.3" />
              <circle cx="29" cy="38" r="1.3" fill="#223" />
              <circle cx="29.5" cy="37.3" r="0.7" fill="white" />
              <circle cx="28.3" cy="38.5" r="0.3" fill="#66f" />
              
              {/* Right eye */}
              <circle cx="35" cy="38" r="2.2" fill="white" stroke="#000" strokeWidth="0.3" />
              <circle cx="35" cy="38" r="1.3" fill="#223" />
              <circle cx="35.5" cy="37.3" r="0.7" fill="white" />
              <circle cx="34.3" cy="38.5" r="0.3" fill="#66f" />
              
              {/* Eyelids when blinking */}
              <motion.g
                animate={isBouncing ? { opacity: [0, 0, 1, 0] } : { opacity: 0 }}
                transition={{ duration: 1.5, times: [0, 0.3, 0.4, 0.5] }}
              >
                <path d="M 27 38 A 2.2 2.2 0 0 0 31 38" fill="#7FDB8F" />
                <path d="M 33 38 A 2.2 2.2 0 0 0 37 38" fill="#7FDB8F" />
              </motion.g>
            </motion.g>
            
            {/* Mouth - More detailed smile with highlight */}
            <motion.g
              animate={{ y: isBouncing ? [0, 1, 0] : 0 }}
              transition={{ duration: 0.5 }}
            >
              <path d="M 30 41.8 Q 32 43.2 34 41.8" stroke="#000" strokeWidth="0.4" fill="#FFC0CB" strokeLinecap="round" />
              <path d="M 30.5 42.3 Q 32 43.5 33.5 42.3" stroke="#FFA0AB" strokeWidth="0.2" fill="none" />
            </motion.g>

            {/* Legs - More detailed and rounded */}
            <motion.g
              animate={{ x: isBouncing ? [-1, 0, -1] : 0, y: isBouncing ? [0, 1, 0] : 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Left front leg */}
              <path d="M 26 43 C 25 44 24 45 24.5 46" stroke="#000" strokeWidth="0.3" fill="#7FDB8F" />
              <ellipse cx="24.5" cy="46" rx="1.2" ry="0.7" fill="#7FDB8F" stroke="#000" strokeWidth="0.3" transform="rotate(-15 24.5 46)" />
            </motion.g>
            
            <motion.g
              animate={{ x: isBouncing ? [1, 0, 1] : 0, y: isBouncing ? [0, 1, 0] : 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Right front leg */}
              <path d="M 38 43 C 39 44 40 45 39.5 46" stroke="#000" strokeWidth="0.3" fill="#7FDB8F" />
              <ellipse cx="39.5" cy="46" rx="1.2" ry="0.7" fill="#7FDB8F" stroke="#000" strokeWidth="0.3" transform="rotate(15 39.5 46)" />
            </motion.g>
            
            {/* Back legs */}
            <motion.g
              animate={{ y: isBouncing ? [0, 0.5, 0] : 0 }}
              transition={{ duration: 0.5 }}
            >
              <ellipse cx="27" cy="45" rx="1.5" ry="1" fill="#7FDB8F" stroke="#000" strokeWidth="0.3" />
              <ellipse cx="37" cy="45" rx="1.5" ry="1" fill="#7FDB8F" stroke="#000" strokeWidth="0.3" />
            </motion.g>
            
            {/* Cute details - Rosy cheeks and freckles */}
            <circle cx="27" cy="40" r="1.2" fill="#FFCCCB" opacity="0.7" />
            <circle cx="37" cy="40" r="1.2" fill="#FFCCCB" opacity="0.7" />
            
            {/* Tiny freckles */}
            <circle cx="28" cy="39.5" r="0.2" fill="#D97979" />
            <circle cx="27.3" cy="39.8" r="0.15" fill="#D97979" />
            <circle cx="27.7" cy="40.2" r="0.15" fill="#D97979" />
            
            <circle cx="36" cy="39.5" r="0.2" fill="#D97979" />
            <circle cx="36.7" cy="39.8" r="0.15" fill="#D97979" />
            <circle cx="36.3" cy="40.2" r="0.15" fill="#D97979" />
            
            {/* Little top spots */}
            <circle cx="30" cy="36.5" r="0.7" fill="#5FBB6F" />
            <circle cx="32" cy="36" r="0.6" fill="#5FBB6F" />
            <circle cx="34" cy="36.5" r="0.7" fill="#5FBB6F" />
          </motion.g>
        </svg>
        {/* Pokemon Yellow Style Button */}
        <div className="absolute bottom-[-20px] w-full flex justify-center">
          <div className="pokemon-yellow-button-container">
            <button className="pokemon-yellow-small-button">
              <span className="font-pixel text-sm text-black">i'm baby</span>
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
}
