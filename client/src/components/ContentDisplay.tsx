import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { Image, Message } from "@shared/schema";
import PixelLoadingAnimation from "./PixelLoadingAnimation";

interface ContentDisplayProps {
  isVisible: boolean;
  image: Image | null;
  message: Message | null;
  onShowAnother: () => void;
  onUploadToggle: () => void;
  isLoading: boolean;
  onGenerateContent: () => void;
}

export default function ContentDisplay({
  isVisible,
  image,
  message,
  onShowAnother,
  onUploadToggle,
  isLoading,
  onGenerateContent
}: ContentDisplayProps) {
  if (!isVisible) return null;

  return (
    <motion.div
      className="w-full space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
    >
      {/* Image Container - Pixel Art Style (if we have an image) */}
      {(image || isLoading) && (
        <motion.div 
          className="bg-white pixel-border p-2 pixel-art overflow-hidden"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 1 }}
        >
          {isLoading || !image ? (
            <PixelLoadingAnimation variant="image" />
          ) : (
            <img
              className="w-full h-64 object-cover"
              src={`data:image/jpeg;base64,${image.data}`}
              alt={image.filename}
            />
          )}
        </motion.div>
      )}

      {/* Message Card - Classic Pokemon Yellow Style Text Box */}
      <motion.div
        className="relative pokemon-textbox max-w-[280px] mx-auto"
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        {isLoading || !message ? (
          <PixelLoadingAnimation variant="message" />
        ) : (
          <div className="pokemon-textbox-content p-3 pt-8">
            {/* Left Heart */}
            <div className="absolute top-2 left-3">
              <div className="pokemon-yellow-heart"></div>
            </div>
            
            {/* Right Heart */}
            <div className="absolute top-2 right-3">
              <div className="pokemon-yellow-heart"></div>
            </div>
            
            <p className="text-left font-pixel text-xs text-black pokemon-yellow-text pb-1 mt-3">
              {message.text}
            </p>
            
            {/* Signature with random selection between "saiyo" and "shrimp" */}
            <p className="text-right font-pixel text-xs text-black pokemon-yellow-text mt-1">
              - {Math.random() > 0.5 ? "saiyo" : "shrimp"} ♥
            </p>
            
            {/* Bottom Arrow Indicator (classic Pokemon style) */}
            <div className="absolute bottom-1 right-3">
              <div className="pokemon-arrow-indicator"></div>
            </div>
          </div>
        )}
      </motion.div>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4 mt-6">
        <Button
          onClick={onShowAnother}
          className="bg-[#87CEFA] hover:bg-[#1E90FF] text-black font-bold py-2 px-3 pixel-border shadow-none"
        >
          <span className="pixel-art text-xs">Show Another</span>
        </Button>
        
        <Button
          onClick={onUploadToggle}
          className="bg-[#FFA6C9] hover:bg-[#FF69B4] text-black font-bold py-2 px-3 pixel-border shadow-none"
        >
          <span className="pixel-art text-xs">Upload Pictures</span>
        </Button>
      </div>
      
      {/* "I'm baby" Button - Below Content */}
      <div className="flex justify-center mt-5">
        <div className="pixel-button-container">
          <button 
            className="pixel-cute-button" 
            onClick={onGenerateContent}
            type="button"
          >
            <span className="font-pixel text-sm text-black">i'm baby</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
