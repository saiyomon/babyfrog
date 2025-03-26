import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Trash2 } from "lucide-react";
import type { Image } from "@shared/schema";

interface UploadAreaProps {
  isVisible: boolean;
  images: Image[];
  onUpload: (files: File[]) => void;
  onDelete: (id: number) => void;
  onCancel: () => void;
  onComplete: () => void;
  isUploading: boolean;
  isDeleting: boolean;
}

export default function UploadArea({
  isVisible,
  images,
  onUpload,
  onDelete,
  onCancel,
  onComplete,
  isUploading,
  isDeleting
}: UploadAreaProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  if (!isVisible) return null;

  const handleBrowseClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files);
      onUpload(filesArray);
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const filesArray = Array.from(e.dataTransfer.files);
      onUpload(filesArray);
    }
  };

  return (
    <motion.div
      className={`w-full mt-8 bg-white border-2 border-dashed rounded-lg p-6 text-center ${
        isDragging ? "bg-green-50 border-[#4CAF50]" : "border-[#A0D995]"
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center space-y-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-[#4CAF50]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
        
        <h3 className="font-['Bubblegum_Sans'] text-xl text-[#388E3C]">
          Upload Your Images
        </h3>
        
        <p className="text-gray-500">
          Drag and drop your pictures here or click to browse
        </p>
        
        <input
          type="file"
          id="file-input"
          ref={fileInputRef}
          multiple
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
          disabled={isUploading}
        />
        
        <Button
          onClick={handleBrowseClick}
          className="bg-[#4CAF50] hover:bg-[#388E3C] text-white font-bold py-2 px-4 rounded-full shadow-md transition-colors"
          disabled={isUploading}
        >
          Browse Files
        </Button>
      </div>
      
      {/* Uploaded Images List */}
      {images.length > 0 && (
        <ScrollArea className="mt-6 h-60">
          <div className="grid grid-cols-2 gap-2">
            {images.map((img) => (
              <div key={img.id} className="relative bg-gray-100 rounded-lg overflow-hidden h-24">
                <img
                  src={`data:image/jpeg;base64,${img.data}`}
                  className="w-full h-full object-cover"
                  alt={img.filename}
                />
                <button
                  className="absolute top-1 right-1 bg-red-500 rounded-full p-1 text-white"
                  onClick={() => onDelete(img.id)}
                  disabled={isDeleting}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </ScrollArea>
      )}
      
      <div className="mt-6 flex justify-between">
        <Button
          onClick={onCancel}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-full shadow-md transition-colors"
          disabled={isUploading || isDeleting}
        >
          Cancel
        </Button>
        <Button
          onClick={onComplete}
          className="bg-[#4CAF50] hover:bg-[#388E3C] text-white font-bold py-2 px-4 rounded-full shadow-md transition-colors"
          disabled={isUploading || isDeleting}
        >
          Done
        </Button>
      </div>
    </motion.div>
  );
}
