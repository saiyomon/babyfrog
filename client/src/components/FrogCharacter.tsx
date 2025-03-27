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

      {/* Frog Character Container */}
      <motion.div 
        className="relative mb-8 cursor-pointer"
        onClick={onTap}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={isBouncing ? { y: [0, -10, 0, -8, 0] } : {}}
        transition={isBouncing ? { duration: 1.5, repeat: 1 } : {}}
      >
        <svg className="w-72 h-72 pixel-art" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" shapeRendering="crispEdges">
          

          
          {/* Pixel Frog Character */}
          <motion.g
            animate={{ y: isBouncing ? [-4, 0, -3, 0] : 0 }}
            transition={{ duration: 1, repeat: isBouncing ? 1 : 0 }}
          >
            {/* Background - Pixel Art Shrine and Trees */}
            {/* Detailed True Pixel Art Background - Each pixel is a 1x1 rectangle */}
            
            {/* Pixel Art Sky - Layers of blues */}
            {/* Sky row 1 */}
            <rect x="0" y="0" width="64" height="1" fill="#5588FF" />
            
            {/* Sky row 2-10 */}
            <rect x="0" y="1" width="64" height="9" fill="#66AAFF" />
            
            {/* Sky row 11-15 */}
            <rect x="0" y="10" width="64" height="5" fill="#77BBFF" />
            
            {/* Sky row 16-20 */}
            <rect x="0" y="15" width="64" height="5" fill="#88CCFF" />
            
            {/* Sky row 21-30 */}
            <rect x="0" y="20" width="64" height="10" fill="#99DDFF" />
            
            {/* Sun - pixel by pixel */}
            <rect x="8" y="6" width="1" height="1" fill="#FFDD00" />
            <rect x="9" y="6" width="1" height="1" fill="#FFDD00" />
            <rect x="10" y="6" width="1" height="1" fill="#FFDD00" />
            <rect x="11" y="6" width="1" height="1" fill="#FFDD00" />
            
            <rect x="7" y="7" width="1" height="1" fill="#FFDD00" />
            <rect x="8" y="7" width="1" height="1" fill="#FFEE00" />
            <rect x="9" y="7" width="1" height="1" fill="#FFEE00" />
            <rect x="10" y="7" width="1" height="1" fill="#FFEE00" />
            <rect x="11" y="7" width="1" height="1" fill="#FFEE00" />
            <rect x="12" y="7" width="1" height="1" fill="#FFDD00" />
            
            <rect x="7" y="8" width="1" height="1" fill="#FFDD00" />
            <rect x="8" y="8" width="1" height="1" fill="#FFEE00" />
            <rect x="9" y="8" width="1" height="1" fill="#FFFF00" />
            <rect x="10" y="8" width="1" height="1" fill="#FFFF00" />
            <rect x="11" y="8" width="1" height="1" fill="#FFEE00" />
            <rect x="12" y="8" width="1" height="1" fill="#FFDD00" />
            
            <rect x="7" y="9" width="1" height="1" fill="#FFDD00" />
            <rect x="8" y="9" width="1" height="1" fill="#FFEE00" />
            <rect x="9" y="9" width="1" height="1" fill="#FFFF00" />
            <rect x="10" y="9" width="1" height="1" fill="#FFFF00" />
            <rect x="11" y="9" width="1" height="1" fill="#FFEE00" />
            <rect x="12" y="9" width="1" height="1" fill="#FFDD00" />
            
            <rect x="8" y="10" width="1" height="1" fill="#FFDD00" />
            <rect x="9" y="10" width="1" height="1" fill="#FFDD00" />
            <rect x="10" y="10" width="1" height="1" fill="#FFDD00" />
            <rect x="11" y="10" width="1" height="1" fill="#FFDD00" />
            
            {/* Sun rays */}
            <rect x="10" y="3" width="1" height="3" fill="#FFDD00" />
            <rect x="10" y="11" width="1" height="3" fill="#FFDD00" />
            <rect x="4" y="8" width="3" height="1" fill="#FFDD00" />
            <rect x="13" y="8" width="3" height="1" fill="#FFDD00" />
            
            {/* Pixel Art Clouds */}
            {/* Cloud 1 */}
            <rect x="18" y="4" width="1" height="1" fill="#FFFFFF" />
            <rect x="19" y="4" width="1" height="1" fill="#FFFFFF" />
            <rect x="20" y="4" width="1" height="1" fill="#FFFFFF" />
            <rect x="21" y="4" width="1" height="1" fill="#FFFFFF" />
            
            <rect x="17" y="5" width="1" height="1" fill="#FFFFFF" />
            <rect x="18" y="5" width="1" height="1" fill="#FFFFFF" />
            <rect x="19" y="5" width="1" height="1" fill="#FFFFFF" />
            <rect x="20" y="5" width="1" height="1" fill="#FFFFFF" />
            <rect x="21" y="5" width="1" height="1" fill="#FFFFFF" />
            <rect x="22" y="5" width="1" height="1" fill="#FFFFFF" />
            <rect x="23" y="5" width="1" height="1" fill="#FFFFFF" />
            <rect x="24" y="5" width="1" height="1" fill="#FFFFFF" />
            
            <rect x="17" y="6" width="1" height="1" fill="#FFFFFF" />
            <rect x="18" y="6" width="1" height="1" fill="#FFFFFF" />
            <rect x="19" y="6" width="1" height="1" fill="#FFFFFF" />
            <rect x="20" y="6" width="1" height="1" fill="#FFFFFF" />
            <rect x="21" y="6" width="1" height="1" fill="#FFFFFF" />
            <rect x="22" y="6" width="1" height="1" fill="#FFFFFF" />
            <rect x="23" y="6" width="1" height="1" fill="#FFFFFF" />
            <rect x="24" y="6" width="1" height="1" fill="#FFFFFF" />
            <rect x="25" y="6" width="1" height="1" fill="#FFFFFF" />
            
            <rect x="19" y="7" width="1" height="1" fill="#FFFFFF" />
            <rect x="20" y="7" width="1" height="1" fill="#FFFFFF" />
            <rect x="21" y="7" width="1" height="1" fill="#FFFFFF" />
            <rect x="22" y="7" width="1" height="1" fill="#FFFFFF" />
            <rect x="23" y="7" width="1" height="1" fill="#FFFFFF" />
            
            {/* Cloud 2 */}
            <rect x="45" y="7" width="1" height="1" fill="#FFFFFF" />
            <rect x="46" y="7" width="1" height="1" fill="#FFFFFF" />
            <rect x="47" y="7" width="1" height="1" fill="#FFFFFF" />
            <rect x="48" y="7" width="1" height="1" fill="#FFFFFF" />
            <rect x="49" y="7" width="1" height="1" fill="#FFFFFF" />
            
            <rect x="44" y="8" width="1" height="1" fill="#FFFFFF" />
            <rect x="45" y="8" width="1" height="1" fill="#FFFFFF" />
            <rect x="46" y="8" width="1" height="1" fill="#FFFFFF" />
            <rect x="47" y="8" width="1" height="1" fill="#FFFFFF" />
            <rect x="48" y="8" width="1" height="1" fill="#FFFFFF" />
            <rect x="49" y="8" width="1" height="1" fill="#FFFFFF" />
            <rect x="50" y="8" width="1" height="1" fill="#FFFFFF" />
            <rect x="51" y="8" width="1" height="1" fill="#FFFFFF" />
            
            <rect x="43" y="9" width="1" height="1" fill="#FFFFFF" />
            <rect x="44" y="9" width="1" height="1" fill="#FFFFFF" />
            <rect x="45" y="9" width="1" height="1" fill="#FFFFFF" />
            <rect x="46" y="9" width="1" height="1" fill="#FFFFFF" />
            <rect x="47" y="9" width="1" height="1" fill="#FFFFFF" />
            <rect x="48" y="9" width="1" height="1" fill="#FFFFFF" />
            <rect x="49" y="9" width="1" height="1" fill="#FFFFFF" />
            <rect x="50" y="9" width="1" height="1" fill="#FFFFFF" />
            <rect x="51" y="9" width="1" height="1" fill="#FFFFFF" />
            <rect x="52" y="9" width="1" height="1" fill="#FFFFFF" />
            
            <rect x="45" y="10" width="1" height="1" fill="#FFFFFF" />
            <rect x="46" y="10" width="1" height="1" fill="#FFFFFF" />
            <rect x="47" y="10" width="1" height="1" fill="#FFFFFF" />
            <rect x="48" y="10" width="1" height="1" fill="#FFFFFF" />
            <rect x="49" y="10" width="1" height="1" fill="#FFFFFF" />
            <rect x="50" y="10" width="1" height="1" fill="#FFFFFF" />
            
            {/* Left Tree - Cherry Blossom - Trunk */}
            <rect x="6" y="30" width="1" height="12" fill="#885533" />
            <rect x="7" y="30" width="1" height="12" fill="#996644" />
            <rect x="8" y="30" width="1" height="12" fill="#996644" />
            <rect x="9" y="30" width="1" height="12" fill="#885533" />
            
            {/* Left Tree - Branches */}
            <rect x="9" y="30" width="2" height="1" fill="#885533" />
            <rect x="10" y="29" width="2" height="1" fill="#885533" />
            <rect x="11" y="28" width="2" height="1" fill="#885533" />
            <rect x="12" y="27" width="3" height="1" fill="#885533" />
            <rect x="4" y="29" width="2" height="1" fill="#885533" />
            <rect x="3" y="28" width="2" height="1" fill="#885533" />
            <rect x="2" y="27" width="2" height="1" fill="#885533" />
            <rect x="1" y="26" width="2" height="1" fill="#885533" />
            
            {/* Cherry Blossoms - Pixel by Pixel */}
            <rect x="0" y="24" width="1" height="1" fill="#FFAACC" />
            <rect x="1" y="24" width="1" height="1" fill="#FFAACC" />
            <rect x="2" y="24" width="1" height="1" fill="#FFAACC" />
            <rect x="3" y="24" width="1" height="1" fill="#FFAACC" />
            <rect x="4" y="24" width="1" height="1" fill="#FFAACC" />
            
            <rect x="0" y="25" width="1" height="1" fill="#FFAACC" />
            <rect x="1" y="25" width="1" height="1" fill="#FFBBDD" />
            <rect x="2" y="25" width="1" height="1" fill="#FFBBDD" />
            <rect x="3" y="25" width="1" height="1" fill="#FFBBDD" />
            <rect x="4" y="25" width="1" height="1" fill="#FFAACC" />
            <rect x="5" y="25" width="1" height="1" fill="#FFAACC" />
            
            <rect x="1" y="23" width="1" height="1" fill="#FFAACC" />
            <rect x="2" y="23" width="1" height="1" fill="#FFBBDD" />
            <rect x="3" y="23" width="1" height="1" fill="#FFCCEE" />
            <rect x="4" y="23" width="1" height="1" fill="#FFBBDD" />
            <rect x="5" y="23" width="1" height="1" fill="#FFAACC" />
            
            <rect x="2" y="22" width="1" height="1" fill="#FFAACC" />
            <rect x="3" y="22" width="1" height="1" fill="#FFBBDD" />
            <rect x="4" y="22" width="1" height="1" fill="#FFAACC" />
            
            <rect x="11" y="23" width="1" height="1" fill="#FFAACC" />
            <rect x="12" y="23" width="1" height="1" fill="#FFAACC" />
            <rect x="13" y="23" width="1" height="1" fill="#FFAACC" />
            <rect x="14" y="23" width="1" height="1" fill="#FFAACC" />
            
            <rect x="11" y="24" width="1" height="1" fill="#FFAACC" />
            <rect x="12" y="24" width="1" height="1" fill="#FFBBDD" />
            <rect x="13" y="24" width="1" height="1" fill="#FFBBDD" />
            <rect x="14" y="24" width="1" height="1" fill="#FFAACC" />
            <rect x="15" y="24" width="1" height="1" fill="#FFAACC" />
            
            <rect x="12" y="25" width="1" height="1" fill="#FFAACC" />
            <rect x="13" y="25" width="1" height="1" fill="#FFBBDD" />
            <rect x="14" y="25" width="1" height="1" fill="#FFAACC" />
            
            <rect x="12" y="22" width="1" height="1" fill="#FFAACC" />
            <rect x="13" y="22" width="1" height="1" fill="#FFCCEE" />
            <rect x="14" y="22" width="1" height="1" fill="#FFAACC" />
            
            <rect x="11" y="26" width="1" height="1" fill="#FFAACC" />
            <rect x="12" y="26" width="1" height="1" fill="#FFBBDD" />
            <rect x="13" y="26" width="1" height="1" fill="#FFAACC" />
            
            {/* Right Tree - Pine - Trunk */}
            <rect x="53" y="31" width="1" height="11" fill="#885533" />
            <rect x="54" y="31" width="1" height="11" fill="#996644" />
            <rect x="55" y="31" width="1" height="11" fill="#996644" />
            <rect x="56" y="31" width="1" height="11" fill="#885533" />
            
            {/* Pine Tree - Foliage - Layer by Layer */}
            {/* Layer 1 */}
            <rect x="52" y="29" width="1" height="1" fill="#006600" />
            <rect x="53" y="29" width="1" height="1" fill="#007700" />
            <rect x="54" y="29" width="1" height="1" fill="#008800" />
            <rect x="55" y="29" width="1" height="1" fill="#007700" />
            <rect x="56" y="29" width="1" height="1" fill="#006600" />
            <rect x="57" y="29" width="1" height="1" fill="#006600" />
            
            {/* Layer 2 */}
            <rect x="51" y="27" width="1" height="1" fill="#006600" />
            <rect x="52" y="27" width="1" height="1" fill="#007700" />
            <rect x="53" y="27" width="1" height="1" fill="#008800" />
            <rect x="54" y="27" width="1" height="1" fill="#009900" />
            <rect x="55" y="27" width="1" height="1" fill="#008800" />
            <rect x="56" y="27" width="1" height="1" fill="#007700" />
            <rect x="57" y="27" width="1" height="1" fill="#006600" />
            <rect x="58" y="27" width="1" height="1" fill="#006600" />
            
            {/* Layer 3 */}
            <rect x="51" y="28" width="1" height="1" fill="#006600" />
            <rect x="52" y="28" width="1" height="1" fill="#007700" />
            <rect x="53" y="28" width="1" height="1" fill="#008800" />
            <rect x="54" y="28" width="1" height="1" fill="#009900" />
            <rect x="55" y="28" width="1" height="1" fill="#008800" />
            <rect x="56" y="28" width="1" height="1" fill="#007700" />
            <rect x="57" y="28" width="1" height="1" fill="#006600" />
            
            {/* Layer 4 */}
            <rect x="50" y="25" width="1" height="1" fill="#006600" />
            <rect x="51" y="25" width="1" height="1" fill="#007700" />
            <rect x="52" y="25" width="1" height="1" fill="#008800" />
            <rect x="53" y="25" width="1" height="1" fill="#009900" />
            <rect x="54" y="25" width="1" height="1" fill="#00AA00" />
            <rect x="55" y="25" width="1" height="1" fill="#009900" />
            <rect x="56" y="25" width="1" height="1" fill="#008800" />
            <rect x="57" y="25" width="1" height="1" fill="#007700" />
            <rect x="58" y="25" width="1" height="1" fill="#006600" />
            
            {/* Layer 5 */}
            <rect x="50" y="26" width="1" height="1" fill="#006600" />
            <rect x="51" y="26" width="1" height="1" fill="#007700" />
            <rect x="52" y="26" width="1" height="1" fill="#008800" />
            <rect x="53" y="26" width="1" height="1" fill="#009900" />
            <rect x="54" y="26" width="1" height="1" fill="#00AA00" />
            <rect x="55" y="26" width="1" height="1" fill="#009900" />
            <rect x="56" y="26" width="1" height="1" fill="#008800" />
            <rect x="57" y="26" width="1" height="1" fill="#007700" />
            <rect x="58" y="26" width="1" height="1" fill="#006600" />
            
            {/* Layer 6 - Top */}
            <rect x="51" y="23" width="1" height="1" fill="#006600" />
            <rect x="52" y="23" width="1" height="1" fill="#007700" />
            <rect x="53" y="23" width="1" height="1" fill="#008800" />
            <rect x="54" y="23" width="1" height="1" fill="#009900" />
            <rect x="55" y="23" width="1" height="1" fill="#008800" />
            <rect x="56" y="23" width="1" height="1" fill="#007700" />
            <rect x="57" y="23" width="1" height="1" fill="#006600" />
            
            {/* Layer 7 */}
            <rect x="52" y="24" width="1" height="1" fill="#006600" />
            <rect x="53" y="24" width="1" height="1" fill="#007700" />
            <rect x="54" y="24" width="1" height="1" fill="#008800" />
            <rect x="55" y="24" width="1" height="1" fill="#007700" />
            <rect x="56" y="24" width="1" height="1" fill="#006600" />
            
            {/* Shrine - Pixel by Pixel */}
            {/* Roof */}
            <rect x="22" y="19" width="1" height="1" fill="#773300" />
            <rect x="23" y="19" width="1" height="1" fill="#884400" />
            <rect x="24" y="19" width="1" height="1" fill="#884400" />
            <rect x="25" y="19" width="1" height="1" fill="#884400" />
            <rect x="26" y="19" width="1" height="1" fill="#884400" />
            <rect x="27" y="19" width="1" height="1" fill="#884400" />
            <rect x="28" y="19" width="1" height="1" fill="#884400" />
            <rect x="29" y="19" width="1" height="1" fill="#884400" />
            <rect x="30" y="19" width="1" height="1" fill="#884400" />
            <rect x="31" y="19" width="1" height="1" fill="#884400" />
            <rect x="32" y="19" width="1" height="1" fill="#884400" />
            <rect x="33" y="19" width="1" height="1" fill="#884400" />
            <rect x="34" y="19" width="1" height="1" fill="#884400" />
            <rect x="35" y="19" width="1" height="1" fill="#884400" />
            <rect x="36" y="19" width="1" height="1" fill="#884400" />
            <rect x="37" y="19" width="1" height="1" fill="#884400" />
            <rect x="38" y="19" width="1" height="1" fill="#884400" />
            <rect x="39" y="19" width="1" height="1" fill="#884400" />
            <rect x="40" y="19" width="1" height="1" fill="#773300" />
            
            {/* Roof Top */}
            <rect x="24" y="18" width="1" height="1" fill="#773300" />
            <rect x="25" y="18" width="1" height="1" fill="#884400" />
            <rect x="26" y="18" width="1" height="1" fill="#884400" />
            <rect x="27" y="18" width="1" height="1" fill="#884400" />
            <rect x="28" y="18" width="1" height="1" fill="#884400" />
            <rect x="29" y="18" width="1" height="1" fill="#884400" />
            <rect x="30" y="18" width="1" height="1" fill="#884400" />
            <rect x="31" y="18" width="1" height="1" fill="#884400" />
            <rect x="32" y="18" width="1" height="1" fill="#884400" />
            <rect x="33" y="18" width="1" height="1" fill="#884400" />
            <rect x="34" y="18" width="1" height="1" fill="#884400" />
            <rect x="35" y="18" width="1" height="1" fill="#884400" />
            <rect x="36" y="18" width="1" height="1" fill="#884400" />
            <rect x="37" y="18" width="1" height="1" fill="#884400" />
            <rect x="38" y="18" width="1" height="1" fill="#773300" />
            
            {/* Building */}
            <rect x="25" y="20" width="1" height="12" fill="#CC0000" />
            <rect x="26" y="20" width="1" height="12" fill="#DD0000" />
            <rect x="27" y="20" width="1" height="12" fill="#DD0000" />
            <rect x="28" y="20" width="1" height="12" fill="#DD0000" />
            <rect x="29" y="20" width="1" height="12" fill="#DD0000" />
            <rect x="30" y="20" width="1" height="12" fill="#DD0000" />
            <rect x="31" y="20" width="1" height="12" fill="#DD0000" />
            <rect x="32" y="20" width="1" height="12" fill="#DD0000" />
            <rect x="33" y="20" width="1" height="12" fill="#DD0000" />
            <rect x="34" y="20" width="1" height="12" fill="#DD0000" />
            <rect x="35" y="20" width="1" height="12" fill="#DD0000" />
            <rect x="36" y="20" width="1" height="12" fill="#DD0000" />
            <rect x="37" y="20" width="1" height="12" fill="#DD0000" />
            <rect x="38" y="20" width="1" height="12" fill="#CC0000" />
            
            {/* Door */}
            <rect x="29" y="27" width="1" height="5" fill="#EEDDAA" />
            <rect x="30" y="27" width="1" height="5" fill="#FFEEAA" />
            <rect x="31" y="27" width="1" height="5" fill="#FFEEAA" />
            <rect x="32" y="27" width="1" height="5" fill="#FFEEAA" />
            <rect x="33" y="27" width="1" height="5" fill="#FFEEAA" />
            <rect x="34" y="27" width="1" height="5" fill="#EEDDAA" />
            
            {/* Door Handles */}
            <rect x="30" y="29" width="1" height="1" fill="#884400" />
            <rect x="33" y="29" width="1" height="1" fill="#884400" />
            
            {/* Shrine Decorations */}
            <rect x="28" y="23" width="1" height="1" fill="#FFBB00" />
            <rect x="29" y="23" width="1" height="1" fill="#FFCC00" />
            <rect x="30" y="23" width="1" height="1" fill="#FFDD00" />
            <rect x="31" y="23" width="1" height="1" fill="#FFDD00" />
            <rect x="32" y="23" width="1" height="1" fill="#FFDD00" />
            <rect x="33" y="23" width="1" height="1" fill="#FFDD00" />
            <rect x="34" y="23" width="1" height="1" fill="#FFCC00" />
            <rect x="35" y="23" width="1" height="1" fill="#FFBB00" />
            
            {/* Stairs */}
            <rect x="29" y="32" width="1" height="1" fill="#CCCCCC" />
            <rect x="30" y="32" width="1" height="1" fill="#DDDDDD" />
            <rect x="31" y="32" width="1" height="1" fill="#DDDDDD" />
            <rect x="32" y="32" width="1" height="1" fill="#DDDDDD" />
            <rect x="33" y="32" width="1" height="1" fill="#DDDDDD" />
            <rect x="34" y="32" width="1" height="1" fill="#CCCCCC" />
            
            <rect x="28" y="33" width="1" height="1" fill="#CCCCCC" />
            <rect x="29" y="33" width="1" height="1" fill="#DDDDDD" />
            <rect x="30" y="33" width="1" height="1" fill="#DDDDDD" />
            <rect x="31" y="33" width="1" height="1" fill="#DDDDDD" />
            <rect x="32" y="33" width="1" height="1" fill="#DDDDDD" />
            <rect x="33" y="33" width="1" height="1" fill="#DDDDDD" />
            <rect x="34" y="33" width="1" height="1" fill="#DDDDDD" />
            <rect x="35" y="33" width="1" height="1" fill="#CCCCCC" />
            
            <rect x="27" y="34" width="1" height="1" fill="#CCCCCC" />
            <rect x="28" y="34" width="1" height="1" fill="#DDDDDD" />
            <rect x="29" y="34" width="1" height="1" fill="#DDDDDD" />
            <rect x="30" y="34" width="1" height="1" fill="#DDDDDD" />
            <rect x="31" y="34" width="1" height="1" fill="#DDDDDD" />
            <rect x="32" y="34" width="1" height="1" fill="#DDDDDD" />
            <rect x="33" y="34" width="1" height="1" fill="#DDDDDD" />
            <rect x="34" y="34" width="1" height="1" fill="#DDDDDD" />
            <rect x="35" y="34" width="1" height="1" fill="#DDDDDD" />
            <rect x="36" y="34" width="1" height="1" fill="#CCCCCC" />
            
            {/* Ground - Grass */}
            <rect x="0" y="42" width="64" height="1" fill="#77AA44" />
            <rect x="0" y="43" width="64" height="1" fill="#669933" />
            <rect x="0" y="44" width="64" height="1" fill="#558822" />
            <rect x="0" y="45" width="64" height="1" fill="#447722" />
            <rect x="0" y="46" width="64" height="4" fill="#336611" />
            
            {/* Grass Details */}
            <rect x="2" y="41" width="1" height="1" fill="#77AA44" />
            <rect x="5" y="41" width="1" height="1" fill="#77AA44" />
            <rect x="9" y="41" width="1" height="1" fill="#77AA44" />
            <rect x="15" y="41" width="1" height="1" fill="#77AA44" />
            <rect x="21" y="41" width="1" height="1" fill="#77AA44" />
            <rect x="24" y="41" width="1" height="1" fill="#77AA44" />
            <rect x="39" y="41" width="1" height="1" fill="#77AA44" />
            <rect x="42" y="41" width="1" height="1" fill="#77AA44" />
            <rect x="47" y="41" width="1" height="1" fill="#77AA44" />
            <rect x="51" y="41" width="1" height="1" fill="#77AA44" />
            <rect x="58" y="41" width="1" height="1" fill="#77AA44" />
            <rect x="62" y="41" width="1" height="1" fill="#77AA44" />
            
            {/* Pond in the bottom right */}
            <rect x="42" y="43" width="1" height="1" fill="#3377AA" />
            <rect x="43" y="43" width="1" height="1" fill="#3377AA" />
            <rect x="44" y="43" width="1" height="1" fill="#3377AA" />
            <rect x="45" y="43" width="1" height="1" fill="#3377AA" />
            <rect x="46" y="43" width="1" height="1" fill="#3377AA" />
            
            <rect x="41" y="44" width="1" height="1" fill="#3377AA" />
            <rect x="42" y="44" width="1" height="1" fill="#4488BB" />
            <rect x="43" y="44" width="1" height="1" fill="#4488BB" />
            <rect x="44" y="44" width="1" height="1" fill="#4488BB" />
            <rect x="45" y="44" width="1" height="1" fill="#4488BB" />
            <rect x="46" y="44" width="1" height="1" fill="#4488BB" />
            <rect x="47" y="44" width="1" height="1" fill="#3377AA" />
            
            <rect x="40" y="45" width="1" height="1" fill="#3377AA" />
            <rect x="41" y="45" width="1" height="1" fill="#4488BB" />
            <rect x="42" y="45" width="1" height="1" fill="#55AADD" />
            <rect x="43" y="45" width="1" height="1" fill="#55AADD" />
            <rect x="44" y="45" width="1" height="1" fill="#55AADD" />
            <rect x="45" y="45" width="1" height="1" fill="#55AADD" />
            <rect x="46" y="45" width="1" height="1" fill="#55AADD" />
            <rect x="47" y="45" width="1" height="1" fill="#4488BB" />
            <rect x="48" y="45" width="1" height="1" fill="#3377AA" />
            
            <rect x="41" y="46" width="1" height="1" fill="#3377AA" />
            <rect x="42" y="46" width="1" height="1" fill="#4488BB" />
            <rect x="43" y="46" width="1" height="1" fill="#4488BB" />
            <rect x="44" y="46" width="1" height="1" fill="#4488BB" />
            <rect x="45" y="46" width="1" height="1" fill="#4488BB" />
            <rect x="46" y="46" width="1" height="1" fill="#4488BB" />
            <rect x="47" y="46" width="1" height="1" fill="#3377AA" />
            
            {/* Lily pad */}
            <rect x="43" y="45" width="1" height="1" fill="#009900" />
            <rect x="44" y="45" width="1" height="1" fill="#00AA00" />
            
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
            
            {/* Row 6 */}
            <rect x="24" y="40" width="1" height="1" fill="#00AA00" />
            <rect x="25" y="40" width="1" height="1" fill="#00BB00" />
            <rect x="26" y="40" width="1" height="1" fill="#00CC00" />
            <rect x="27" y="40" width="1" height="1" fill="#FF9999" />
            <rect x="28" y="40" width="1" height="1" fill="#00DD00" />
            <rect x="29" y="40" width="1" height="1" fill="#00DD00" />
            <rect x="30" y="40" width="1" height="1" fill="#00DD00" />
            <rect x="31" y="40" width="1" height="1" fill="#00DD00" />
            <rect x="32" y="40" width="1" height="1" fill="#00DD00" />
            <rect x="33" y="40" width="1" height="1" fill="#00DD00" />
            <rect x="34" y="40" width="1" height="1" fill="#00DD00" />
            <rect x="35" y="40" width="1" height="1" fill="#00DD00" />
            <rect x="36" y="40" width="1" height="1" fill="#FF9999" />
            <rect x="37" y="40" width="1" height="1" fill="#00CC00" />
            <rect x="38" y="40" width="1" height="1" fill="#00BB00" />
            <rect x="39" y="40" width="1" height="1" fill="#00AA00" />
            
            {/* Row 7 - Mouth starts */}
            <rect x="24" y="41" width="1" height="1" fill="#00AA00" />
            <rect x="25" y="41" width="1" height="1" fill="#00BB00" />
            <rect x="26" y="41" width="1" height="1" fill="#00CC00" />
            <rect x="27" y="41" width="1" height="1" fill="#00DD00" />
            <rect x="28" y="41" width="1" height="1" fill="#00DD00" />
            <rect x="29" y="41" width="1" height="1" fill="#00DD00" />
            <rect x="30" y="41" width="1" height="1" fill="#00DD00" />
            <rect x="31" y="41" width="1" height="1" fill="#FF9999" />
            <rect x="32" y="41" width="1" height="1" fill="#FF9999" />
            <rect x="33" y="41" width="1" height="1" fill="#FF9999" />
            <rect x="34" y="41" width="1" height="1" fill="#00DD00" />
            <rect x="35" y="41" width="1" height="1" fill="#00DD00" />
            <rect x="36" y="41" width="1" height="1" fill="#00DD00" />
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
