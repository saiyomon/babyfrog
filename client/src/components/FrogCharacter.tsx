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
            {/* Frog Body */}
            <rect x="28" y="36" width="8" height="6" fill="#26A269" />
            <rect x="26" y="38" width="12" height="6" fill="#26A269" />
            <rect x="24" y="40" width="16" height="4" fill="#26A269" />
            
            {/* Frog Belly */}
            <rect x="28" y="40" width="8" height="4" fill="#57E389" />
            
            {/* Eyes */}
            <motion.g
              animate={{ y: isBouncing ? [-1, 0, -1] : 0 }}
              transition={{ duration: 0.5, repeat: isBouncing ? 2 : 0 }}
            >
              <rect x="26" y="36" width="4" height="4" fill="white" />
              <rect x="34" y="36" width="4" height="4" fill="white" />
              <rect x="27" y="37" width="2" height="2" fill="black" />
              <rect x="35" y="37" width="2" height="2" fill="black" />
            </motion.g>
            
            {/* Mouth */}
            <motion.g
              animate={{ y: isBouncing ? [0, 1, 0] : 0 }}
              transition={{ duration: 0.5 }}
            >
              <rect x="30" y="42" width="4" height="1" fill="#1A7048" />
            </motion.g>

            {/* Legs */}
            <motion.g
              animate={{ x: isBouncing ? [-1, 0, -1] : 0 }}
              transition={{ duration: 0.5 }}
            >
              <rect x="24" y="44" width="4" height="2" fill="#26A269" />
            </motion.g>
            <motion.g
              animate={{ x: isBouncing ? [1, 0, 1] : 0 }}
              transition={{ duration: 0.5 }}
            >
              <rect x="36" y="44" width="4" height="2" fill="#26A269" />
            </motion.g>
          </motion.g>
        </svg>
        {/* Pokemon-Style Scroll Button */}
        <div className="absolute bottom-[-20px] w-full flex justify-center">
          <div className="pokemon-scroll-button relative">
            <div className="pokemon-scroll-top"></div>
            <div className="pokemon-scroll-middle">
              <span className="font-['Bubblegum_Sans'] text-teal-900 text-sm pokemon-text">i'm baby</span>
            </div>
            <div className="pokemon-scroll-bottom"></div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
