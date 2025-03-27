import { useState } from "react";
import FrogCharacter from "@/components/FrogCharacter";
import ContentDisplay from "@/components/ContentDisplay";
import UploadArea from "@/components/UploadArea";
import { Button } from "@/components/ui/button";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Image, Message } from "@shared/schema";

export default function Home() {
  const [isContentVisible, setIsContentVisible] = useState(false);
  const [isUploadAreaVisible, setIsUploadAreaVisible] = useState(false);
  const [currentImage, setCurrentImage] = useState<Image | null>(null);
  const [currentMessage, setCurrentMessage] = useState<Message | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  // Fetch images with pagination
  const [currentPage, setCurrentPage] = useState(1);
  const { data: imagesData, isLoading: isLoadingImages } = useQuery<{
    images: Image[];
    pagination: { total: number; page: number; limit: number; pages: number };
  }>({
    queryKey: ['/api/images', { page: currentPage, limit: 10 }],
  });
  
  const images = imagesData?.images || [];
  const pagination = imagesData?.pagination || { total: 0, page: 1, limit: 10, pages: 1 };

  // Fetch messages
  const { data: messages = [], isLoading: isLoadingMessages } = useQuery<Message[]>({
    queryKey: ['/api/messages'],
  });

  // Upload image mutation
  const uploadImageMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await apiRequest('POST', '/api/images', formData);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/images'] });
      toast({
        title: "Success!",
        description: "Image uploaded successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Upload failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Delete image mutation
  const deleteImageMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest('DELETE', `/api/images/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/images'] });
      toast({
        title: "Success!",
        description: "Image deleted successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Delete failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // This function now only handles visual effects for frog click, not content generation
  const handleFrogTap = () => {
    // Frog tap is now only for visual effects, not content generation
    // No logic here since FrogCharacter component handles the animation internally
  };
  
  // Separate function for generating content that's triggered by the "I'm baby" button
  const handleGenerateContent = () => {
    if (isUploadAreaVisible) return;
    
    // Show content area if not already visible
    if (!isContentVisible) {
      setIsContentVisible(true);
    }
    
    // Set loading state
    setIsGenerating(true);
    
    // Reset current content
    setCurrentImage(null);
    setCurrentMessage(null);
    
    // Simulate loading/generation delay (1.5 seconds)
    setTimeout(() => {
      // Show random content after delay
      showRandomContent();
      setIsGenerating(false);
    }, 1500);
  };

  const showRandomContent = () => {
    // Always show a message even if there are no images
    if (messages.length === 0) return;
    
    // Get random image (if available)
    if (images.length > 0) {
      const randomImageIndex = Math.floor(Math.random() * images.length);
      setCurrentImage(images[randomImageIndex]);
    } else {
      setCurrentImage(null);
    }
    
    // Get random message
    const randomMessageIndex = Math.floor(Math.random() * messages.length);
    setCurrentMessage(messages[randomMessageIndex]);
  };

  const handleShowAnother = () => {
    // Set loading state
    setIsGenerating(true);
    
    // Reset current content
    setCurrentImage(null);
    setCurrentMessage(null);
    
    // Simulate loading/generation delay (1.5 seconds)
    setTimeout(() => {
      // Show random content after delay
      showRandomContent();
      setIsGenerating(false);
    }, 1500);
  };

  const handleToggleUploadArea = () => {
    setIsContentVisible(false);
    setIsUploadAreaVisible(true);
  };

  const handleUploadComplete = () => {
    setIsUploadAreaVisible(false);
    setIsContentVisible(true);
  };

  const handleUploadCancel = () => {
    setIsUploadAreaVisible(false);
    setIsContentVisible(true);
  };

  const handleFileUpload = (files: File[]) => {
    // Log file info for debugging
    console.log("Uploading files:", files.map(f => f.name));
    
    files.forEach(file => {
      const formData = new FormData();
      // Make sure to use the correct field name that matches the server expectation
      formData.append("image", file);
      
      // Log the FormData (for debugging)
      console.log("FormData created with file:", file.name, file.type, file.size);
      
      uploadImageMutation.mutate(formData);
    });
  };

  const handleImageDelete = (id: number) => {
    deleteImageMutation.mutate(id);
  };

  // Create cherry blossoms
  const cherryBlossoms = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.floor(Math.random() * 8) + 8, // 8-16px
    left: `${Math.floor(Math.random() * 95)}%`,
    delay: Math.random() * 5,
    duration: Math.random() * 10 + 15 // 15-25s
  }));
  
  return (
    <div className="min-h-screen bg-[#87CEEB] font-[Nunito] text-gray-800 overflow-hidden relative">
      {/* Cherry Blossoms */}
      {cherryBlossoms.map(blossom => (
        <div
          key={`blossom-${blossom.id}`}
          className="cherry-blossom"
          style={{
            width: `${blossom.size}px`,
            height: `${blossom.size}px`,
            left: blossom.left,
            animationDuration: `${blossom.duration}s`,
            animationDelay: `${blossom.delay}s`
          }}
        />
      ))}
    
      <div className="w-full px-4 py-6 flex flex-col items-center">
        {/* Cute Pastel Header */}
        <header className="w-full text-center mb-4">
          <div className="pastel-header-container relative inline-block mb-2">
            <h1 className="font-pixel text-2xl md:text-3xl mb-1 text-pink-700">
              Valeria's Froggy Friend
            </h1>
          </div>
          <p className="text-purple-800 text-xs md:text-sm font-pixel">
            Click the button for a special surprise!
          </p>
        </header>

        {/* Frog Character - The button will generate content, not the frog itself */}
        <FrogCharacter onTap={handleFrogTap} />

        {/* Content Display */}
        <ContentDisplay 
          isVisible={isContentVisible}
          image={currentImage}
          message={currentMessage}
          onShowAnother={handleShowAnother}
          onUploadToggle={handleToggleUploadArea}
          isLoading={isLoadingImages || isLoadingMessages || isGenerating}
          onGenerateContent={handleGenerateContent}
        />

        {/* Upload Area */}
        <UploadArea 
          isVisible={isUploadAreaVisible}
          images={images}
          onUpload={handleFileUpload}
          onDelete={handleImageDelete}
          onCancel={handleUploadCancel}
          onComplete={handleUploadComplete}
          isUploading={uploadImageMutation.isPending}
          isDeleting={deleteImageMutation.isPending}
          pagination={pagination}
          onPageChange={(page) => setCurrentPage(page)}
        />

        {/* Cute Pastel Footer */}
        <footer className="mt-12 text-center">
          <div className="pastel-footer-container inline-block">
            <p className="font-pixel text-sm text-pink-700">smol dumplings safe zone</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
