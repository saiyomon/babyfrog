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
      {/* Image Container - Pixel Art Style */}
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

      {/* Message Card - Pixel Art Style*/}
      <motion.div
        className="bg-[#FFAEC9] p-4 pixel-border"
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        {isLoading || !message ? (
          <Skeleton className="w-full h-8" />
        ) : (
          <p className="text-center font-['Bubblegum_Sans'] text-xl text-teal-900 pixel-art">
            {message.text}
          </p>
        )}
      </motion.div>

      {/* Action Buttons - Pixel Art Style */}
      <div className="flex justify-center space-x-4">
        <Button 
          onClick={onShowAnother}
          className="bg-[#26A269] hover:bg-[#1A7048] text-white font-bold py-2 px-4 pixel-border shadow-none"
          disabled={isLoading}
        >
          <span className="pixel-art">Show Another</span>
        </Button>
        <Button
          onClick={onUploadToggle}
          className="bg-[#FFAEC9] hover:bg-[#FF69B4] text-teal-900 font-bold py-2 px-4 pixel-border shadow-none"
          disabled={isLoading}
        >
          <span className="pixel-art">Add Images</span>
        </Button>
      </div>
    </motion.div>
  );
}
