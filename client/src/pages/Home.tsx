import { useState } from "react";
import FrogCharacter from "@/components/FrogCharacter";
import ContentDisplay from "@/components/ContentDisplay";
import UploadArea from "@/components/UploadArea";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Image, Message } from "@shared/schema";

export default function Home() {
  const [isContentVisible, setIsContentVisible] = useState(false);
  const [isUploadAreaVisible, setIsUploadAreaVisible] = useState(false);
  const [currentImage, setCurrentImage] = useState<Image | null>(null);
  const [currentMessage, setCurrentMessage] = useState<Message | null>(null);
  const { toast } = useToast();

  // Fetch images
  const { data: images = [], isLoading: isLoadingImages } = useQuery<Image[]>({
    queryKey: ['/api/images'],
  });

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

  const handleFrogTap = () => {
    if (isUploadAreaVisible) return;
    
    // Show content area if not already visible
    if (!isContentVisible) {
      setIsContentVisible(true);
    }
    
    // Show random content
    showRandomContent();
  };

  const showRandomContent = () => {
    if (images.length === 0 || messages.length === 0) return;
    
    // Get random image
    const randomImageIndex = Math.floor(Math.random() * images.length);
    setCurrentImage(images[randomImageIndex]);
    
    // Get random message
    const randomMessageIndex = Math.floor(Math.random() * messages.length);
    setCurrentMessage(messages[randomMessageIndex]);
  };

  const handleShowAnother = () => {
    showRandomContent();
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
    files.forEach(file => {
      const formData = new FormData();
      formData.append("image", file);
      uploadImageMutation.mutate(formData);
    });
  };

  const handleImageDelete = (id: number) => {
    deleteImageMutation.mutate(id);
  };

  return (
    <div className="min-h-screen bg-[#87CEEB] font-[Nunito] text-gray-800">
      <div className="container mx-auto px-4 max-w-md py-6 flex flex-col items-center">
        {/* Header */}
        <header className="w-full text-center mb-6">
          <h1 className="font-['Bubblegum_Sans'] text-3xl md:text-4xl text-[#26A269] mb-2 pixel-art">
            Valeria's Froggy Friend
          </h1>
          <p className="text-teal-800 text-sm md:text-base pixel-art">
            Tap the frog for a special surprise!
          </p>
        </header>

        {/* Frog Character */}
        <FrogCharacter onTap={handleFrogTap} />

        {/* Content Display */}
        {images.length > 0 && (
          <ContentDisplay 
            isVisible={isContentVisible}
            image={currentImage}
            message={currentMessage}
            onShowAnother={handleShowAnother}
            onUploadToggle={handleToggleUploadArea}
            isLoading={isLoadingImages || isLoadingMessages}
          />
        )}

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
        />

        {/* Footer */}
        <footer className="mt-12 text-center text-sm text-teal-800 pixel-art">
          <p>smol dumplings safe zone</p>
        </footer>
      </div>
    </div>
  );
}
