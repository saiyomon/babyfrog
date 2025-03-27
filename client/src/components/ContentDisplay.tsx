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

      {/* Message Card - Classic Pokemon Yellow Style Text Box */}
      <motion.div
        className="relative pokemon-textbox max-w-xs mx-auto"
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        {isLoading || !message ? (
          <Skeleton className="w-full h-24 mt-3" />
        ) : (
          <div className="pokemon-textbox-content p-3 pt-10">
            {/* Left Heart */}
            <div className="absolute top-2 left-4">
              <div className="pokemon-yellow-heart"></div>
            </div>
            
            {/* Right Heart */}
            <div className="absolute top-2 right-4">
              <div className="pokemon-yellow-heart"></div>
            </div>
            
            <p className="text-left font-pixel text-xs text-black pokemon-yellow-text pb-1 mt-4">
              {message.text}
            </p>
            
            {/* Signature with random selection between "saiyo" and "shrimp" */}
            <p className="text-right font-pixel text-sm text-black pokemon-yellow-text mt-1">
              - {Math.random() > 0.5 ? "saiyo" : "shrimp"} ♥
            </p>
            
            {/* Bottom Arrow Indicator (classic Pokemon style) */}
            <div className="absolute bottom-2 right-5">
              <div className="pokemon-arrow-indicator"></div>
            </div>
          </div>
        )}
      </motion.div>

      {/* No action buttons as per request - user will click the frog instead */}
    </motion.div>
  );
}
