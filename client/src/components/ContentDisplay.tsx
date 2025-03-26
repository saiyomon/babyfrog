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
      {/* Image Container */}
      <motion.div 
        className="bg-white rounded-lg shadow-lg overflow-hidden transition-all"
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

      {/* Message Card */}
      <motion.div
        className="bg-[#FFB6C1] p-5 rounded-lg shadow-md"
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        {isLoading || !message ? (
          <Skeleton className="w-full h-8" />
        ) : (
          <p className="text-center font-['Bubblegum_Sans'] text-xl text-gray-700">
            {message.text}
          </p>
        )}
      </motion.div>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4">
        <Button 
          onClick={onShowAnother}
          className="bg-[#4CAF50] hover:bg-[#388E3C] text-white font-bold py-2 px-4 rounded-full shadow-md transition-colors"
          disabled={isLoading}
        >
          Show Another
        </Button>
        <Button
          onClick={onUploadToggle}
          className="bg-[#FF69B4] hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-full shadow-md transition-colors"
          disabled={isLoading}
        >
          Add Images
        </Button>
      </div>
    </motion.div>
  );
}
