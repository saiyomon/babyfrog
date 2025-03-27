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
      className="w-full space-y-6 mt-8"
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

      {/* "i'm baby" button added back */}
      <div className="flex justify-center mt-8">
        <Button
          onClick={onGenerateContent}
          className="pixel-border bg-pink-500 hover:bg-pink-600 text-white font-pixel py-2 px-6 rounded-none"
        >
          i'm baby
        </Button>
      </div>
    </motion.div>
  );
}
