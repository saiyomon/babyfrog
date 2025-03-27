import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { Image, Message } from "@shared/schema";

interface ContentDisplayProps {
  isVisible: boolean;
  image: Image | null;
  message: Message | null;
  onShowAnother: () => void;
  onUploadToggle: () => void;
  isLoading: boolean;
}

export default function ContentDisplay({
  isVisible,
  image,
  message,
  onShowAnother,
  onUploadToggle,
  isLoading
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
            <Skeleton className="w-full h-64" />
          ) : (
            <img
              className="w-full h-64 object-cover"
              src={`data:image/jpeg;base64,${image.data}`}
              alt={image.filename}
            />
          )}
        </motion.div>
      )}

      {/* Message Card - Smaller Pixel Art Scroll Style (Pokemon Style) */}
      <motion.div
        className="relative bg-[#FFF9E5] p-4 pb-8 pixel-border message-scroll max-w-xs mx-auto"
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        {/* Top Scroll Border - Pokemon Style */}
        <div className="absolute top-0 left-0 right-0 h-3 bg-[#D9A066] border-b-2 border-[#8B4513]">
          <div className="absolute top-0 left-0 w-3 h-3 bg-[#D9A066] border-r-2 border-b-2 border-[#8B4513] rounded-br-lg"></div>
          <div className="absolute top-0 right-0 w-3 h-3 bg-[#D9A066] border-l-2 border-b-2 border-[#8B4513] rounded-bl-lg"></div>
        </div>
        
        {/* Bottom Scroll Border - Pokemon Style */}
        <div className="absolute bottom-0 left-0 right-0 h-3 bg-[#D9A066] border-t-2 border-[#8B4513]">
          <div className="absolute bottom-0 left-0 w-3 h-3 bg-[#D9A066] border-r-2 border-t-2 border-[#8B4513] rounded-tr-lg"></div>
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#D9A066] border-l-2 border-t-2 border-[#8B4513] rounded-tl-lg"></div>
        </div>
        
        {isLoading || !message ? (
          <Skeleton className="w-full h-10 mt-3" />
        ) : (
          <div className="mt-1">
            <p className="text-center font-['Bubblegum_Sans'] text-base text-teal-900 pixel-art py-2 pokemon-text">
              {message.text}
            </p>
            
            {/* Pokemon-Style Pixel Decorations */}
            <div className="mt-2 flex justify-center space-x-3 pixel-art">
              <div className="pokemon-heart"></div>
              <div className="pokemon-pokeball"></div>
              <div className="pokemon-heart"></div>
            </div>
          </div>
        )}
      </motion.div>

      {/* Action Buttons - Pokemon Style */}
      <div className="flex justify-center space-x-4 mt-4">
        <Button 
          onClick={onShowAnother}
          className="pokemon-button pokemon-button-green shadow-none"
          disabled={isLoading}
        >
          <span className="pokemon-text text-sm font-['Bubblegum_Sans']">Show Another</span>
        </Button>
        <Button
          onClick={onUploadToggle}
          className="pokemon-button pokemon-button-pink shadow-none"
          disabled={isLoading}
        >
          <span className="pokemon-text text-sm font-['Bubblegum_Sans']">Add Images</span>
        </Button>
      </div>
    </motion.div>
  );
}
