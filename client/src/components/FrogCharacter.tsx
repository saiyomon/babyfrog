import { useState, useEffect, useMemo } from "react";
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
  const [showEmojis, setShowEmojis] = useState(false);
  const [blossomIdCounter, setBlossomIdCounter] = useState(15); // Track IDs for new blossoms
  
  // Generate 15 cherry blossoms with random properties
  const initialCherryBlossoms = useMemo(() => {
    return Array.from({ length: 15 }, (_, i) => ({
      id: i,
      size: Math.random() * 5 + 3,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 5,
      duration: Math.random() * 5 + 5,
    }));
  }, []);
  
  const [cherryBlossoms, setCherryBlossoms] = useState<CherryBlossom[]>(initialCherryBlossoms);
  
  // Function to add more cherry blossoms when the frog is clicked
  const addMoreBlossoms = () => {
    const newBlossoms = Array.from({ length: 8 }, (_, i) => ({
      id: blossomIdCounter + i,
      size: Math.random() * 5 + 3,
      left: `${Math.random() * 100}%`,
      delay: 0, // Start falling immediately
      duration: Math.random() * 3 + 3, // Fall faster
    }));
    
    setBlossomIdCounter(prev => prev + 8);
    setCherryBlossoms(prevBlossoms => [...prevBlossoms, ...newBlossoms]);
  };
  
  // Function to handle frog click
  const handleFrogClick = () => {
    addMoreBlossoms();
    setShowEmojis(true);
    setTimeout(() => setShowEmojis(false), 1500); // Show emojis for 1.5 seconds
  };

  // Start bounce animation periodically with smoother transitions
  useEffect(() => {
    const bounceInterval = setInterval(() => {
      setIsBouncing(true);
      
      // Stop bouncing after 2.5 seconds
      setTimeout(() => {
        setIsBouncing(false);
      }, 2500);
    }, 8000); // Increased interval to make animations less frequent
    
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

      {/* Frog Character Container - now clickable to make blossoms fall */}
      <motion.div 
        className="relative mb-8"
        animate={isBouncing ? { y: [0, -3, -5, -3, 0] } : {}} 
        transition={isBouncing ? { 
          duration: 2.5, 
          repeat: 0, 
          ease: "easeInOut",
          times: [0, 0.25, 0.5, 0.75, 1]
        } : {}}
      >
        {/* Shy emojis that appear when frog is clicked */}
        {showEmojis && (
          <motion.div 
            className="absolute top-10 right-12 z-10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-3xl" role="img" aria-label="shy">👉🏻👈🏻</span>
          </motion.div>
        )}
        
        <svg 
          className="w-72 h-72 pixel-art cursor-pointer" 
          viewBox="0 0 64 64" 
          xmlns="http://www.w3.org/2000/svg" 
          shapeRendering="crispEdges"
          onClick={() => {
            handleFrogClick();
            onTap(); // Still call the original handler for the content generation
          }}>
          

          
          {/* Pixel Frog Character */}
          <motion.g
            animate={{ y: isBouncing ? [-1, -2, -1, 0] : 0 }}
            transition={{ 
              duration: 2.5, 
              repeat: 0, 
              ease: "easeInOut",
              times: [0, 0.25, 0.75, 1]
            }}
          >
            {/* New Background - Matching Frog's Style */}
            {/* True Pixel Art Background - Each pixel is clearly defined */}
            
            {/* Pixel Art Sky - 8-bit style gradient */}
            {/* Sky gradient in 8-bit style - dark to light */}
            <rect x="0" y="0" width="64" height="6" fill="#5B6EE1" /> {/* Dark blue top */}
            <rect x="0" y="6" width="64" height="6" fill="#7289F9" />
            <rect x="0" y="12" width="64" height="6" fill="#9DBAFF" />
            <rect x="0" y="18" width="64" height="6" fill="#C6E2FF" />
            <rect x="0" y="24" width="64" height="6" fill="#DEEEFF" /> {/* Light blue bottom */}
            
            {/* New 8-bit style sun - simpler, blockier design */}
            <rect x="8" y="4" width="8" height="8" fill="#FED800" /> {/* Main square sun body */}
            
            {/* Highlights - simple 2-color design */}
            <rect x="9" y="5" width="2" height="2" fill="#FEE568" />
            <rect x="13" y="5" width="2" height="2" fill="#FEE568" />
            <rect x="9" y="9" width="2" height="2" fill="#FEE568" />
            <rect x="13" y="9" width="2" height="2" fill="#FEE568" />
            <rect x="11" y="7" width="2" height="2" fill="#FFFFFF" /> {/* Center highlight */}
            
            {/* Simple sun rays - blocky style */}
            <rect x="12" y="2" width="1" height="2" fill="#FED800" /> {/* Top */}
            <rect x="12" y="12" width="1" height="2" fill="#FED800" /> {/* Bottom */}
            <rect x="4" y="8" width="4" height="1" fill="#FED800" /> {/* Left */}
            <rect x="16" y="8" width="4" height="1" fill="#FED800" /> {/* Right */}
            
            {/* Corner rays */}
            <rect x="6" y="6" width="2" height="1" fill="#FED800" /> {/* Top-left */}
            <rect x="16" y="6" width="2" height="1" fill="#FED800" /> {/* Top-right */}
            <rect x="6" y="10" width="2" height="1" fill="#FED800" /> {/* Bottom-left */}
            <rect x="16" y="10" width="2" height="1" fill="#FED800" /> {/* Bottom-right */}
            
            {/* 8-bit Style Clouds - Simplified blocky design */}
            {/* Cloud 1 - Left */}
            <rect x="20" y="4" width="8" height="3" fill="#FFFFFF" /> {/* Main cloud block */}
            <rect x="18" y="5" width="2" height="2" fill="#FFFFFF" /> {/* Left puff */}
            <rect x="28" y="5" width="3" height="2" fill="#FFFFFF" /> {/* Right puff */}
            <rect x="19" y="7" width="10" height="2" fill="#FFFFFF" /> {/* Bottom fill */}
            
            {/* Cloud 1 shading */}
            <rect x="22" y="4" width="2" height="1" fill="#E0E0E0" />
            <rect x="26" y="5" width="2" height="1" fill="#E0E0E0" />
            <rect x="21" y="7" width="3" height="1" fill="#E0E0E0" />
            <rect x="27" y="7" width="2" height="1" fill="#E0E0E0" />
            
            {/* Cloud 2 - Right */}
            <rect x="42" y="6" width="10" height="4" fill="#FFFFFF" /> {/* Main cloud block */}
            <rect x="40" y="8" width="2" height="2" fill="#FFFFFF" /> {/* Left puff */}
            <rect x="52" y="7" width="3" height="3" fill="#FFFFFF" /> {/* Right puff */}
            
            {/* Cloud 2 shading */}
            <rect x="44" y="6" width="3" height="1" fill="#E0E0E0" />
            <rect x="49" y="7" width="2" height="1" fill="#E0E0E0" />
            <rect x="43" y="9" width="2" height="1" fill="#E0E0E0" />
            <rect x="47" y="9" width="3" height="1" fill="#E0E0E0" />
            
            {/* Left Tree - Chunky 8-bit Cherry Blossom Tree */}
            {/* Trunk - blockier style */}
            <rect x="6" y="30" width="4" height="12" fill="#8B5A2B" /> {/* Main trunk */}
            <rect x="7" y="30" width="2" height="12" fill="#A0522D" /> {/* Trunk highlight */}
            
            {/* Left Tree - Blocky Branches */}
            <rect x="10" y="29" width="3" height="2" fill="#8B5A2B" /> {/* Right branch */}
            <rect x="3" y="29" width="3" height="2" fill="#8B5A2B" /> {/* Left branch */}
            
            {/* Cherry Blossom Foliage - Blocky Style */}
            <rect x="4" y="22" width="8" height="7" fill="#FFB6C1" /> {/* Main foliage block */}
            <rect x="0" y="25" width="4" height="4" fill="#FFB6C1" /> {/* Left foliage */}
            <rect x="12" y="24" width="4" height="4" fill="#FFB6C1" /> {/* Right foliage */}
            
            {/* Pink Highlights - Blocky Style */}
            <rect x="5" y="23" width="3" height="3" fill="#FFC1CC" /> {/* Main foliage highlight */}
            <rect x="1" y="26" width="2" height="2" fill="#FFC1CC" /> {/* Left foliage highlight */}
            <rect x="13" y="25" width="2" height="2" fill="#FFC1CC" /> {/* Right foliage highlight */}
            
            {/* White Accents - Blocky Style */}
            <rect x="6" y="24" width="1" height="1" fill="#FFFFFF" /> {/* Flower detail */}
            <rect x="9" y="25" width="1" height="1" fill="#FFFFFF" /> {/* Flower detail */}
            <rect x="2" y="27" width="1" height="1" fill="#FFFFFF" /> {/* Flower detail */}
            <rect x="14" y="24" width="1" height="1" fill="#FFFFFF" /> {/* Flower detail */}
            
            {/* Right Tree - Pine - Simple Blocky 8-bit Style */}
            {/* Trunk - chunky style */}
            <rect x="53" y="31" width="4" height="11" fill="#8B5A2B" /> {/* Main trunk */}
            <rect x="54" y="31" width="2" height="11" fill="#A0522D" /> {/* Trunk highlight */}
            
            {/* Pine Foliage - Multi-layer triangle style */}
            {/* First Triangle (bottom) */}
            <rect x="49" y="28" width="12" height="3" fill="#228822" /> {/* Bottom wide layer */}
            
            {/* Second Triangle (middle) */}
            <rect x="50" y="25" width="10" height="3" fill="#22AA22" /> {/* Middle layer */}
            
            {/* Third Triangle (top) */}
            <rect x="51" y="22" width="8" height="3" fill="#33CC33" /> {/* Top layer */}
            
            {/* Fourth Triangle (peak) */}
            <rect x="53" y="19" width="4" height="3" fill="#44DD44" /> {/* Peak */}
            
            {/* Shading details */}
            <rect x="51" y="23" width="2" height="1" fill="#228822" /> {/* Left shadow */}
            <rect x="57" y="23" width="2" height="1" fill="#228822" /> {/* Right shadow */}
            <rect x="50" y="26" width="2" height="1" fill="#228822" /> {/* Left shadow */}
            <rect x="58" y="26" width="2" height="1" fill="#228822" /> {/* Right shadow */}
            <rect x="54" y="20" width="2" height="1" fill="#55EE55" /> {/* Highlight */}
            
            {/* Shrine - 8-Bit Blocky Style - BIGGER and PROPERLY GROUNDED */}
            {/* Roof Top - Simple triangular shape */}
            <rect x="16" y="19" width="32" height="3" fill="#8B4513" /> {/* Roof base - wider */}
            <rect x="18" y="16" width="28" height="3" fill="#A0522D" /> {/* Roof middle */}
            <rect x="22" y="13" width="20" height="3" fill="#CD853F" /> {/* Roof top */}
            <rect x="27" y="10" width="10" height="3" fill="#DEB887" /> {/* Roof peak */}
            
            {/* Building - Simplified blocky structure - TALLER */}
            <rect x="18" y="22" width="28" height="16" fill="#D32F2F" /> {/* Main building block */}
            <rect x="22" y="22" width="20" height="16" fill="#F44336" /> {/* Building highlight */}
            
            {/* Decorative band */}
            <rect x="18" y="25" width="28" height="3" fill="#FFD700" /> {/* Gold decoration band */}
            <rect x="22" y="25" width="20" height="3" fill="#FFEB3B" /> {/* Band highlight */}
            
            {/* Door - Blocky style */}
            <rect x="25" y="30" width="14" height="8" fill="#E8C170" /> {/* Door block */}
            <rect x="27" y="30" width="10" height="8" fill="#F9E79F" /> {/* Door highlight */}
            
            {/* Door Handles - Simple squares */}
            <rect x="28" y="33" width="2" height="2" fill="#8B4513" /> {/* Left handle */}
            <rect x="34" y="33" width="2" height="2" fill="#8B4513" /> {/* Right handle */}
            
            {/* Stairs - Blocky pyramid style - PROPERLY TOUCHING GROUND */}
            <rect x="22" y="38" width="20" height="2" fill="#BDC3C7" /> {/* Top stair */}
            <rect x="20" y="40" width="24" height="2" fill="#D0D3D4" /> {/* Middle stair */}
            <rect x="16" y="42" width="32" height="2" fill="#E5E7E9" /> {/* Bottom stair - touches grass */}
            
            {/* Ground - Grass - 8-bit style with distinct layers */}
            <rect x="0" y="42" width="64" height="2" fill="#7EC850" /> {/* Top grass layer - bright */}
            <rect x="0" y="44" width="64" height="2" fill="#5BB032" /> {/* Middle grass layer */}
            <rect x="0" y="46" width="64" height="4" fill="#3F8024" /> {/* Bottom grass layer - darker */}
            
            {/* Stylized Grass Tufts - blocky style */}
            <rect x="2" y="40" width="2" height="2" fill="#7EC850" />
            <rect x="8" y="41" width="2" height="1" fill="#7EC850" />
            <rect x="15" y="40" width="2" height="2" fill="#7EC850" />
            <rect x="22" y="41" width="2" height="1" fill="#7EC850" />
            <rect x="28" y="40" width="2" height="2" fill="#7EC850" />
            <rect x="39" y="41" width="2" height="1" fill="#7EC850" />
            <rect x="47" y="40" width="2" height="2" fill="#7EC850" />
            <rect x="57" y="41" width="2" height="1" fill="#7EC850" />
            
            {/* Darker grass tufts for contrast */}
            <rect x="5" y="41" width="2" height="1" fill="#5BB032" />
            <rect x="12" y="41" width="1" height="1" fill="#5BB032" />
            <rect x="19" y="41" width="2" height="1" fill="#5BB032" />
            <rect x="32" y="41" width="1" height="1" fill="#5BB032" />
            <rect x="42" y="41" width="2" height="1" fill="#5BB032" />
            <rect x="52" y="41" width="1" height="1" fill="#5BB032" />
            <rect x="61" y="41" width="2" height="1" fill="#5BB032" />
            
            {/* 8-bit Pond - MUCH LARGER and wider */}
            {/* Outer edge - dark blue border */}
            <rect x="3" y="42" width="36" height="1" fill="#264F73" /> {/* Top edge */}
            <rect x="3" y="43" width="1" height="6" fill="#264F73" /> {/* Left edge */}
            <rect x="38" y="43" width="1" height="6" fill="#264F73" /> {/* Right edge */}
            <rect x="4" y="49" width="34" height="1" fill="#264F73" /> {/* Bottom edge */}
            
            {/* Main water area - medium blue */}
            <rect x="4" y="43" width="34" height="6" fill="#3A7CA5" />
            
            {/* Water highlight areas - light blue */}
            <rect x="6" y="44" width="30" height="4" fill="#5AAFDF" />
            
            {/* Brightest center area */}
            <rect x="10" y="45" width="22" height="2" fill="#81D4FA" />
            
            {/* Water sparkle/highlights - tiny white dots */}
            <rect x="8" y="44" width="1" height="1" fill="#FFFFFF" />
            <rect x="14" y="45" width="1" height="1" fill="#FFFFFF" />
            <rect x="22" y="44" width="1" height="1" fill="#FFFFFF" />
            <rect x="30" y="46" width="1" height="1" fill="#FFFFFF" />
            <rect x="11" y="47" width="1" height="1" fill="#FFFFFF" />
            <rect x="26" y="47" width="1" height="1" fill="#FFFFFF" />
            
            {/* Lily pads - chunky 8-bit style */}
            {/* First lily pad - larger blocky shape */}
            <rect x="7" y="44" width="4" height="2" fill="#4CAF50" /> {/* Main pad */}
            <rect x="8" y="44" width="2" height="1" fill="#81C784" /> {/* Highlight */}
            
            {/* Second lily pad */}
            <rect x="18" y="46" width="5" height="2" fill="#4CAF50" /> {/* Main pad */}
            <rect x="19" y="46" width="3" height="1" fill="#81C784" /> {/* Highlight */}
            
            {/* Third lily pad */}
            <rect x="32" y="45" width="4" height="2" fill="#4CAF50" /> {/* Main pad */}
            <rect x="33" y="45" width="2" height="1" fill="#81C784" /> {/* Highlight */}
            
            {/* True Pixel Art Frog Character */}
            {/* Each pixel is represented by a 1x1 square with sharp edges */}
            
            {/* Main head/body - pixel by pixel construction */}
            {/* Row 1 */}
            <rect x="28" y="35" width="1" height="1" fill="#00AA00" />
            <rect x="29" y="35" width="1" height="1" fill="#00AA00" />
            <rect x="30" y="35" width="1" height="1" fill="#00AA00" />
            <rect x="31" y="35" width="1" height="1" fill="#00AA00" />
            <rect x="32" y="35" width="1" height="1" fill="#00AA00" />
            <rect x="33" y="35" width="1" height="1" fill="#00AA00" />
            <rect x="34" y="35" width="1" height="1" fill="#00AA00" />
            <rect x="35" y="35" width="1" height="1" fill="#00AA00" />
            
            {/* Row 2 */}
            <rect x="27" y="36" width="1" height="1" fill="#00AA00" />
            <rect x="28" y="36" width="1" height="1" fill="#00BB00" />
            <rect x="29" y="36" width="1" height="1" fill="#00BB00" />
            <rect x="30" y="36" width="1" height="1" fill="#00BB00" />
            <rect x="31" y="36" width="1" height="1" fill="#00BB00" />
            <rect x="32" y="36" width="1" height="1" fill="#00BB00" />
            <rect x="33" y="36" width="1" height="1" fill="#00BB00" />
            <rect x="34" y="36" width="1" height="1" fill="#00BB00" />
            <rect x="35" y="36" width="1" height="1" fill="#00BB00" />
            <rect x="36" y="36" width="1" height="1" fill="#00AA00" />
            
            {/* Row 3 */}
            <rect x="26" y="37" width="1" height="1" fill="#00AA00" />
            <rect x="27" y="37" width="1" height="1" fill="#00BB00" />
            <rect x="28" y="37" width="1" height="1" fill="#00CC00" />
            <rect x="29" y="37" width="1" height="1" fill="#00CC00" />
            
            {/* Left eye row 1 */}
            <rect x="30" y="37" width="1" height="1" fill="#FFFFFF" />
            <rect x="31" y="37" width="1" height="1" fill="#FFFFFF" />
            
            {/* Middle head pixels */}
            <rect x="32" y="37" width="1" height="1" fill="#00CC00" />
            <rect x="33" y="37" width="1" height="1" fill="#00CC00" />
            
            {/* Right eye row 1 */}
            <rect x="34" y="37" width="1" height="1" fill="#FFFFFF" />
            <rect x="35" y="37" width="1" height="1" fill="#FFFFFF" />
            
            <rect x="36" y="37" width="1" height="1" fill="#00BB00" />
            <rect x="37" y="37" width="1" height="1" fill="#00AA00" />
            
            {/* Row 4 */}
            <rect x="25" y="38" width="1" height="1" fill="#00AA00" />
            <rect x="26" y="38" width="1" height="1" fill="#00BB00" />
            <rect x="27" y="38" width="1" height="1" fill="#00CC00" />
            <rect x="28" y="38" width="1" height="1" fill="#00DD00" />
            <rect x="29" y="38" width="1" height="1" fill="#00DD00" />
            
            {/* Left eye row 2 */}
            <rect x="30" y="38" width="1" height="1" fill="#FFFFFF" />
            <rect x="31" y="38" width="1" height="1" fill="#000000" />
            
            {/* Middle head pixels */}
            <rect x="32" y="38" width="1" height="1" fill="#00DD00" />
            <rect x="33" y="38" width="1" height="1" fill="#00DD00" />
            
            {/* Right eye row 2 */}
            <rect x="34" y="38" width="1" height="1" fill="#000000" />
            <rect x="35" y="38" width="1" height="1" fill="#FFFFFF" />
            
            <rect x="36" y="38" width="1" height="1" fill="#00CC00" />
            <rect x="37" y="38" width="1" height="1" fill="#00BB00" />
            <rect x="38" y="38" width="1" height="1" fill="#00AA00" />
            
            {/* Row 5 - Blush marks */}
            <rect x="25" y="39" width="1" height="1" fill="#00AA00" />
            <rect x="26" y="39" width="1" height="1" fill="#00BB00" />
            <rect x="27" y="39" width="1" height="1" fill="#FF9999" />
            <rect x="28" y="39" width="1" height="1" fill="#00DD00" />
            <rect x="29" y="39" width="1" height="1" fill="#00DD00" />
            <rect x="30" y="39" width="1" height="1" fill="#00DD00" />
            <rect x="31" y="39" width="1" height="1" fill="#00DD00" />
            <rect x="32" y="39" width="1" height="1" fill="#00DD00" />
            <rect x="33" y="39" width="1" height="1" fill="#00DD00" />
            <rect x="34" y="39" width="1" height="1" fill="#00DD00" />
            <rect x="35" y="39" width="1" height="1" fill="#00DD00" />
            <rect x="36" y="39" width="1" height="1" fill="#FF9999" />
            <rect x="37" y="39" width="1" height="1" fill="#00BB00" />
            <rect x="38" y="39" width="1" height="1" fill="#00AA00" />
            
            {/* Row 6 - Happier, smiling frog */}
            <rect x="24" y="40" width="1" height="1" fill="#00AA00" />
            <rect x="25" y="40" width="1" height="1" fill="#00BB00" />
            <rect x="26" y="40" width="1" height="1" fill="#00CC00" />
            <rect x="27" y="40" width="1" height="1" fill="#00DD00" />
            <rect x="28" y="40" width="1" height="1" fill="#00DD00" />
            <rect x="29" y="40" width="1" height="1" fill="#00DD00" />
            <rect x="30" y="40" width="1" height="1" fill="#00DD00" />
            <rect x="31" y="40" width="1" height="1" fill="#00DD00" />
            <rect x="32" y="40" width="1" height="1" fill="#00DD00" />
            <rect x="33" y="40" width="1" height="1" fill="#00DD00" />
            <rect x="34" y="40" width="1" height="1" fill="#00DD00" />
            <rect x="35" y="40" width="1" height="1" fill="#00DD00" />
            <rect x="36" y="40" width="1" height="1" fill="#00DD00" />
            <rect x="37" y="40" width="1" height="1" fill="#00CC00" />
            <rect x="38" y="40" width="1" height="1" fill="#00BB00" />
            <rect x="39" y="40" width="1" height="1" fill="#00AA00" />
            
            {/* Row 7 - Big Happy Smiling Mouth */}
            <rect x="24" y="41" width="1" height="1" fill="#00AA00" />
            <rect x="25" y="41" width="1" height="1" fill="#00BB00" />
            <rect x="26" y="41" width="1" height="1" fill="#00CC00" />
            <rect x="27" y="41" width="1" height="1" fill="#00DD00" />
            <rect x="28" y="41" width="1" height="1" fill="#FF9999" />
            <rect x="29" y="41" width="1" height="1" fill="#FF5555" />
            <rect x="30" y="41" width="1" height="1" fill="#FF5555" />
            <rect x="31" y="41" width="1" height="1" fill="#FF0000" />
            <rect x="32" y="41" width="1" height="1" fill="#FF0000" />
            <rect x="33" y="41" width="1" height="1" fill="#FF0000" />
            <rect x="34" y="41" width="1" height="1" fill="#FF5555" />
            <rect x="35" y="41" width="1" height="1" fill="#FF5555" />
            <rect x="36" y="41" width="1" height="1" fill="#FF9999" />
            <rect x="37" y="41" width="1" height="1" fill="#00CC00" />
            <rect x="38" y="41" width="1" height="1" fill="#00BB00" />
            <rect x="39" y="41" width="1" height="1" fill="#00AA00" />
            
            {/* Row 8 - Belly */}
            <rect x="24" y="42" width="1" height="1" fill="#00AA00" />
            <rect x="25" y="42" width="1" height="1" fill="#00BB00" />
            <rect x="26" y="42" width="1" height="1" fill="#00CC00" />
            <rect x="27" y="42" width="1" height="1" fill="#00DD00" />
            <rect x="28" y="42" width="1" height="1" fill="#EEFFEE" />
            <rect x="29" y="42" width="1" height="1" fill="#EEFFEE" />
            <rect x="30" y="42" width="1" height="1" fill="#EEFFEE" />
            <rect x="31" y="42" width="1" height="1" fill="#EEFFEE" />
            <rect x="32" y="42" width="1" height="1" fill="#EEFFEE" />
            <rect x="33" y="42" width="1" height="1" fill="#EEFFEE" />
            <rect x="34" y="42" width="1" height="1" fill="#EEFFEE" />
            <rect x="35" y="42" width="1" height="1" fill="#EEFFEE" />
            <rect x="36" y="42" width="1" height="1" fill="#00DD00" />
            <rect x="37" y="42" width="1" height="1" fill="#00CC00" />
            <rect x="38" y="42" width="1" height="1" fill="#00BB00" />
            <rect x="39" y="42" width="1" height="1" fill="#00AA00" />
            
            {/* Row 9 - Belly */}
            <rect x="25" y="43" width="1" height="1" fill="#00AA00" />
            <rect x="26" y="43" width="1" height="1" fill="#00BB00" />
            <rect x="27" y="43" width="1" height="1" fill="#DDFFDD" />
            <rect x="28" y="43" width="1" height="1" fill="#DDFFDD" />
            <rect x="29" y="43" width="1" height="1" fill="#DDFFDD" />
            <rect x="30" y="43" width="1" height="1" fill="#DDFFDD" />
            <rect x="31" y="43" width="1" height="1" fill="#DDFFDD" />
            <rect x="32" y="43" width="1" height="1" fill="#DDFFDD" />
            <rect x="33" y="43" width="1" height="1" fill="#DDFFDD" />
            <rect x="34" y="43" width="1" height="1" fill="#DDFFDD" />
            <rect x="35" y="43" width="1" height="1" fill="#DDFFDD" />
            <rect x="36" y="43" width="1" height="1" fill="#DDFFDD" />
            <rect x="37" y="43" width="1" height="1" fill="#00BB00" />
            <rect x="38" y="43" width="1" height="1" fill="#00AA00" />
            
            {/* Row 10 - Bottom of body */}
            <rect x="25" y="44" width="1" height="1" fill="#00AA00" />
            <rect x="26" y="44" width="1" height="1" fill="#00BB00" />
            <rect x="27" y="44" width="1" height="1" fill="#00CC00" />
            <rect x="28" y="44" width="1" height="1" fill="#CCFFCC" />
            <rect x="29" y="44" width="1" height="1" fill="#CCFFCC" />
            <rect x="30" y="44" width="1" height="1" fill="#CCFFCC" />
            <rect x="31" y="44" width="1" height="1" fill="#CCFFCC" />
            <rect x="32" y="44" width="1" height="1" fill="#CCFFCC" />
            <rect x="33" y="44" width="1" height="1" fill="#CCFFCC" />
            <rect x="34" y="44" width="1" height="1" fill="#CCFFCC" />
            <rect x="35" y="44" width="1" height="1" fill="#CCFFCC" />
            <rect x="36" y="44" width="1" height="1" fill="#00CC00" />
            <rect x="37" y="44" width="1" height="1" fill="#00BB00" />
            <rect x="38" y="44" width="1" height="1" fill="#00AA00" />
            
            {/* Row 11 - Legs */}
            <rect x="24" y="45" width="1" height="1" fill="#00AA00" />
            <rect x="25" y="45" width="1" height="1" fill="#00BB00" />
            <rect x="26" y="45" width="1" height="1" fill="#00BB00" />
            <rect x="27" y="45" width="1" height="1" fill="#00AA00" />
            <rect x="28" y="45" width="1" height="1" fill="#00BB00" />
            <rect x="29" y="45" width="1" height="1" fill="#00CC00" />
            <rect x="30" y="45" width="1" height="1" fill="#00CC00" />
            <rect x="31" y="45" width="1" height="1" fill="#00CC00" />
            <rect x="32" y="45" width="1" height="1" fill="#00CC00" />
            <rect x="33" y="45" width="1" height="1" fill="#00CC00" />
            <rect x="34" y="45" width="1" height="1" fill="#00CC00" />
            <rect x="35" y="45" width="1" height="1" fill="#00BB00" />
            <rect x="36" y="45" width="1" height="1" fill="#00AA00" />
            <rect x="37" y="45" width="1" height="1" fill="#00BB00" />
            <rect x="38" y="45" width="1" height="1" fill="#00BB00" />
            <rect x="39" y="45" width="1" height="1" fill="#00AA00" />
            
            {/* Row 12 - Bottom of legs */}
            <rect x="23" y="46" width="1" height="1" fill="#00AA00" />
            <rect x="24" y="46" width="1" height="1" fill="#00BB00" />
            <rect x="25" y="46" width="1" height="1" fill="#00BB00" />
            <rect x="26" y="46" width="1" height="1" fill="#00AA00" />
            <rect x="28" y="46" width="1" height="1" fill="#00AA00" />
            <rect x="29" y="46" width="1" height="1" fill="#00BB00" />
            <rect x="30" y="46" width="1" height="1" fill="#00BB00" />
            <rect x="31" y="46" width="1" height="1" fill="#00BB00" />
            <rect x="32" y="46" width="1" height="1" fill="#00BB00" />
            <rect x="33" y="46" width="1" height="1" fill="#00BB00" />
            <rect x="34" y="46" width="1" height="1" fill="#00BB00" />
            <rect x="35" y="46" width="1" height="1" fill="#00AA00" />
            <rect x="37" y="46" width="1" height="1" fill="#00AA00" />
            <rect x="38" y="46" width="1" height="1" fill="#00BB00" />
            <rect x="39" y="46" width="1" height="1" fill="#00BB00" />
            <rect x="40" y="46" width="1" height="1" fill="#00AA00" />
            
            {/* Blinking animation for the eyes */}
            <motion.g
              animate={isBouncing ? { opacity: [0, 0, 1, 0, 0] } : { opacity: 0 }}
              initial={{ opacity: 0 }}
              transition={{ duration: 1.5, times: [0, 0.3, 0.4, 0.5, 0.7] }}
            >
              {/* Left eye blink */}
              <rect x="30" y="37" width="1" height="1" fill="#00CC00" />
              <rect x="31" y="37" width="1" height="1" fill="#00CC00" />
              <rect x="30" y="38" width="1" height="1" fill="#00CC00" />
              <rect x="31" y="38" width="1" height="1" fill="#00CC00" />
              
              {/* Right eye blink */}
              <rect x="34" y="37" width="1" height="1" fill="#00CC00" />
              <rect x="35" y="37" width="1" height="1" fill="#00CC00" />
              <rect x="34" y="38" width="1" height="1" fill="#00CC00" />
              <rect x="35" y="38" width="1" height="1" fill="#00CC00" />
            </motion.g>
          </motion.g>
        </svg>
        {/* Cute Pixel Button */}
        <div className="absolute bottom-[-18px] w-full flex justify-center">
          <div className="pixel-button-container">
            <button className="pixel-cute-button" onClick={onTap}>
              <span className="font-pixel text-sm text-black">i'm baby</span>
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
}
