import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Trash2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
  pagination?: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
  onPageChange?: (page: number) => void;
  onAddMessage?: (message: string) => void;
  isAddingMessage?: boolean;
}

export default function UploadArea({
  isVisible,
  images,
  onUpload,
  onDelete,
  onCancel,
  onComplete,
  isUploading,
  isDeleting,
  pagination,
  onPageChange,
  onAddMessage = () => {},
  isAddingMessage = false
}: UploadAreaProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("photos");
  const [newMessage, setNewMessage] = useState("");

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
  
  const handleMessageSubmit = () => {
    if (newMessage.trim()) {
      onAddMessage(newMessage);
      setNewMessage("");
    }
  };

  return (
    <motion.div
      className="w-full mt-8 bg-white pixel-border p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
    >
      <Tabs defaultValue="photos" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4 pixel-border p-1 bg-gray-100">
          <TabsTrigger 
            value="photos" 
            className="rounded-none pixel-art font-['Bubblegum_Sans'] text-base data-[state=active]:bg-[#26A269] data-[state=active]:text-white"
          >
            Photos
          </TabsTrigger>
          <TabsTrigger 
            value="messages" 
            className="rounded-none pixel-art font-['Bubblegum_Sans'] text-base data-[state=active]:bg-[#26A269] data-[state=active]:text-white"
          >
            Messages
          </TabsTrigger>
        </TabsList>
        
        {/* Photos Tab */}
        <TabsContent 
          value="photos" 
          className={`p-4 ${isDragging ? "bg-green-50" : ""}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center space-y-4 text-center">
            {/* Pixel Art Upload Icon */}
            <div className="w-12 h-12 pixel-art">
              <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" shapeRendering="crispEdges">
                <rect x="2" y="2" width="12" height="12" fill="#26A269" />
                <rect x="4" y="4" width="8" height="1" fill="white" />
                <rect x="4" y="6" width="8" height="1" fill="white" />
                <rect x="4" y="8" width="8" height="1" fill="white" />
                <rect x="7" y="10" width="2" height="3" fill="white" />
                <rect x="5" y="11" width="2" height="1" fill="white" />
                <rect x="9" y="11" width="2" height="1" fill="white" />
              </svg>
            </div>
            
            <h3 className="font-['Bubblegum_Sans'] text-xl text-[#26A269] pixel-art">
              Upload Valeria's Photos
            </h3>
            
            <p className="text-teal-800 pixel-art">
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
              className="bg-[#26A269] hover:bg-[#1A7048] text-white font-bold py-2 px-4 pixel-border shadow-none"
              disabled={isUploading}
            >
              <span className="pixel-art">Browse Files</span>
            </Button>
          </div>
          
          {/* Uploaded Images List */}
          {images.length > 0 && (
            <div className="mt-6">
              <ScrollArea className="h-60 pixel-border overflow-hidden">
                <div className="grid grid-cols-2 gap-4 p-2">
                  {images.map((img) => (
                    <div key={img.id} className="relative bg-gray-100 pixel-border overflow-hidden h-24">
                      <img
                        src={`data:image/jpeg;base64,${img.data}`}
                        className="w-full h-full object-cover"
                        alt={img.filename}
                        loading="lazy" 
                      />
                      <button
                        className="absolute top-1 right-1 bg-red-500 p-1 text-white pixel-art"
                        onClick={() => onDelete(img.id)}
                        disabled={isDeleting}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              
              {/* Pagination controls */}
              {pagination && pagination.pages > 1 && onPageChange && (
                <div className="flex justify-center items-center mt-3 space-x-2">
                  <button 
                    onClick={() => onPageChange(Math.max(1, pagination.page - 1))}
                    className={`w-8 h-8 flex items-center justify-center pixel-border ${
                      pagination.page <= 1 ? 'bg-gray-200 text-gray-500' : 'bg-[#26A269] text-white hover:bg-[#1A7048]'
                    }`}
                    disabled={pagination.page <= 1}
                  >
                    <span className="pixel-art">←</span>
                  </button>
                  
                  <div className="pixel-art text-teal-800">
                    {pagination.page} / {pagination.pages}
                  </div>
                  
                  <button 
                    onClick={() => onPageChange(Math.min(pagination.pages, pagination.page + 1))}
                    className={`w-8 h-8 flex items-center justify-center pixel-border ${
                      pagination.page >= pagination.pages ? 'bg-gray-200 text-gray-500' : 'bg-[#26A269] text-white hover:bg-[#1A7048]'
                    }`}
                    disabled={pagination.page >= pagination.pages}
                  >
                    <span className="pixel-art">→</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </TabsContent>
        
        {/* Messages Tab */}
        <TabsContent value="messages" className="p-4">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="w-12 h-12 pixel-art">
              <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" shapeRendering="crispEdges">
                <rect x="2" y="2" width="12" height="12" fill="#E95420" />
                <rect x="4" y="5" width="8" height="1" fill="white" />
                <rect x="4" y="7" width="8" height="1" fill="white" />
                <rect x="4" y="9" width="8" height="1" fill="white" />
              </svg>
            </div>
            
            <h3 className="font-['Bubblegum_Sans'] text-xl text-[#E95420] pixel-art">
              Add Sweet Messages
            </h3>
            
            <p className="text-teal-800 pixel-art">
              Create custom messages for Valeria
            </p>
          </div>
          
          <div className="mt-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="message" className="text-left block font-pixel text-teal-800">
                New Message:
              </Label>
              <Textarea 
                id="message" 
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Write a sweet message for Valeria..."
                className="pixel-border min-h-[100px]"
              />
            </div>
            
            <Button
              onClick={handleMessageSubmit}
              className="w-full bg-[#E95420] hover:bg-[#C63900] text-white font-bold py-2 px-4 pixel-border shadow-none"
              disabled={isAddingMessage || !newMessage.trim()}
            >
              <span className="pixel-art">
                {isAddingMessage ? "Adding..." : "Add Message"}
              </span>
            </Button>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="mt-6 flex justify-between">
        <Button
          onClick={onCancel}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 pixel-border shadow-none"
          disabled={isUploading || isDeleting || isAddingMessage}
        >
          <span className="pixel-art">Cancel</span>
        </Button>
        <Button
          onClick={onComplete}
          className="bg-[#26A269] hover:bg-[#1A7048] text-white font-bold py-2 px-4 pixel-border shadow-none"
          disabled={isUploading || isDeleting || isAddingMessage}
        >
          <span className="pixel-art">Done</span>
        </Button>
      </div>
    </motion.div>
  );
}
