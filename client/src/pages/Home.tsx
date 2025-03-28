import { useState, useEffect } from "react";
import FrogCharacter from "@/components/FrogCharacter";
import ContentDisplay from "@/components/ContentDisplay";
import UploadArea from "@/components/UploadArea";
import PokemonGame from "@/components/PokemonGame";
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
  const [isGameVisible, setIsGameVisible] = useState(false);
  const { toast } = useToast();
  
  // Track shown content to avoid repetition
  const [shownImageIds, setShownImageIds] = useState<number[]>([]);
  const [shownMessageIds, setShownMessageIds] = useState<number[]>([]);

  // Fetch images with pagination
  const [currentPage, setCurrentPage] = useState(1);
  
  // For display in UI - paginated (used in UploadArea component)
  const { data: imagesData, isLoading: isLoadingImages } = useQuery<{
    images: Image[];
    pagination: { total: number; page: number; limit: number; pages: number };
  }>({
    queryKey: ['/api/images', { page: currentPage, limit: 10 }],
  });
  
  // For random display - fetch all images (non-paginated)
  const { data: allImagesData, isLoading: isLoadingAllImages } = useQuery<{
    images: Image[];
    pagination: { total: number; page: number; limit: number; pages: number };
  }>({
    queryKey: ['/api/images', { page: 1, limit: 100 }], // Get up to 100 images
    retry: 3,
    staleTime: 60000, // 1 minute
    refetchOnWindowFocus: false,
  });
  
  // Images for the UploadArea component (paginated)
  const images = imagesData?.images || [];
  const pagination = imagesData?.pagination || { total: 0, page: 1, limit: 10, pages: 1 };
  
  // All images for random content generation (non-paginated)
  const allImages = allImagesData?.images || [];

  // Fetch messages with retry
  const { data: messagesData = { messages: [], count: 0 }, isLoading: isLoadingMessages } = useQuery<{
    messages: Message[];
    count: number;
  }>({
    queryKey: ['/api/messages'],
    retry: 3,
    staleTime: 60000, // 1 minute
  });
  
  // Extract messages array from response
  const messages = messagesData?.messages || [];
  
  // Reset tracking arrays when new content is loaded
  useEffect(() => {
    if (allImages.length > 0 && shownImageIds.length === 0) {
      // Initialize with empty array when images first load
      setShownImageIds([]);
    }
  }, [allImages]);
  
  useEffect(() => {
    if (messages.length > 0 && shownMessageIds.length === 0) {
      // Initialize with empty array when messages first load
      setShownMessageIds([]);
    }
  }, [messages]);

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
  
  // Delete message mutation
  const deleteMessageMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest('DELETE', `/api/messages/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/messages'] });
      toast({
        title: "Success!",
        description: "Message deleted successfully",
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
  
  // Add message mutation
  const addMessageMutation = useMutation({
    mutationFn: async (text: string) => {
      const response = await apiRequest('POST', '/api/messages', { text });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/messages'] });
      toast({
        title: "Success!",
        description: "Message added successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to add message",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleFrogTap = () => {
    // The frog tap now generates content
    console.log("Frog tapped, generating content");
    handleGenerateContent();
  };
  
  const handleGenerateContent = () => {
    console.log("Generate content button clicked");
    // Make sure content area is visible
    setIsContentVisible(true);
    
    // Set loading state
    setIsGenerating(true);
    
    // Reset current content
    setCurrentImage(null);
    setCurrentMessage(null);
    
    // Check if it's the first time or data isn't loaded yet
    const isFirstLoad = allImages.length === 0;
    
    // Simulate loading/generation delay (1.5 seconds normally, 3 seconds on first load)
    setTimeout(() => {
      console.log("Timeout fired, showing random content");
      // Show random content after delay
      showRandomContent();
      setIsGenerating(false);
    }, isFirstLoad ? 3000 : 1500);  // Longer delay for first load to ensure images are fetched
  };

  const showRandomContent = () => {
    console.log("showRandomContent called. Messages:", messages, "Images:", allImages.length);
    console.log("Already shown images:", shownImageIds.length, "Already shown messages:", shownMessageIds.length);
    
    // Handle images - use allImages (non-paginated) for selection
    if (allImages && allImages.length > 0) {
      // Get image that hasn't been shown yet
      const remainingImages = allImages.filter(img => !shownImageIds.includes(img.id));
      
      if (remainingImages.length > 0) {
        // We still have unseen images
        const randomIndex = Math.floor(Math.random() * remainingImages.length);
        const selectedImage = remainingImages[randomIndex];
        console.log("Setting new unseen image with ID:", selectedImage.id);
        setCurrentImage(selectedImage);
        
        // Add to shown images
        setShownImageIds(prev => [...prev, selectedImage.id]);
      } else {
        // All images have been shown, reset and start over
        console.log("All images have been shown. Resetting image history.");
        // Pick a random image from all
        const randomIndex = Math.floor(Math.random() * allImages.length);
        setCurrentImage(allImages[randomIndex]);
        
        // Reset tracking with just this image
        setShownImageIds([allImages[randomIndex].id]);
      }
    } else {
      console.log("No images available");
      setCurrentImage(null);
    }
    
    // Handle messages - same logic
    if (messages && messages.length > 0) {
      const remainingMessages = messages.filter(msg => !shownMessageIds.includes(msg.id));
      
      if (remainingMessages.length > 0) {
        // We still have unseen messages
        const randomIndex = Math.floor(Math.random() * remainingMessages.length);
        const selectedMessage = remainingMessages[randomIndex];
        console.log("Setting new unseen message with ID:", selectedMessage.id);
        setCurrentMessage(selectedMessage);
        
        // Add to shown messages
        setShownMessageIds(prev => [...prev, selectedMessage.id]);
      } else {
        // All messages have been shown, reset and start over
        console.log("All messages have been shown. Resetting message history.");
        // Pick a random message from all
        const randomIndex = Math.floor(Math.random() * messages.length);
        setCurrentMessage(messages[randomIndex]);
        
        // Reset tracking with just this message
        setShownMessageIds([messages[randomIndex].id]);
      }
    } else {
      console.log("No messages available");
      setCurrentMessage(null);
    }
    
    console.log("Content generated successfully");
  };

  const handleShowAnother = () => {
    // Make sure content area is visible
    setIsContentVisible(true);
    
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
  
  const handleMessageDelete = (id: number) => {
    deleteMessageMutation.mutate(id);
  };
  
  const handleAddMessage = (text: string) => {
    addMessageMutation.mutate(text);
  };
  
  // Handle Pokémon game
  const togglePokemonGame = () => {
    setIsGameVisible(prev => !prev);
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
    <div className="min-h-screen font-[Nunito] text-gray-800 overflow-hidden relative bg-transparent">
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
        {/* Asian Temple Neon Sign Header */}
        <header className="w-full text-center mb-4">
          <div className="pastel-header-container relative inline-block mb-2">
            {/* Add decorative temple roof tiles */}
            <div className="temple-roof">
              {[...Array(7)].map((_, i) => (
                <div key={i} className="roof-tile"></div>
              ))}
            </div>
            
            {/* Add decorative roof ornaments */}
            <div className="temple-roof-ornament roof-ornament-left"></div>
            <div className="temple-roof-ornament roof-ornament-right"></div>
            
            {/* Add decorative lanterns */}
            <div className="temple-lantern temple-lantern-left"></div>
            <div className="temple-lantern temple-lantern-right"></div>
            
            {/* Add spotlight effect for street restaurant sign look */}
            <div className="spotlight"></div>
            
            {/* Add grit texture overlay */}
            <div className="grit-texture"></div>
            
            <h1 className="font-pixel text-2xl md:text-3xl mb-1 text-pink-900 relative z-10" style={{ textShadow: '0 0 6px #ff2e83, 0 0 12px #ff2e83' }}>
              Valeria's Froggy Friend
            </h1>
          </div>
          <p className="text-purple-800 text-xs md:text-sm font-pixel">
            Click the froggy for a special surprise!
          </p>
          
          {/* Secret Pokéball Button */}
          <div 
            className="pokeball"
            onClick={togglePokemonGame}
            title="Secret Pokémon Game"
          ></div>
        </header>

        {/* Frog Character */}
        <FrogCharacter onTap={handleFrogTap} />
        
        {/* Content Display - Now positioned below the frog */}
        <ContentDisplay 
          isVisible={isContentVisible}
          image={currentImage}
          message={currentMessage}
          onShowAnother={handleShowAnother}
          onUploadToggle={handleToggleUploadArea}
          isLoading={isLoadingImages || isLoadingAllImages || isLoadingMessages || isGenerating}
          onGenerateContent={handleGenerateContent}
        />

        {/* Upload Area */}
        <UploadArea 
          isVisible={isUploadAreaVisible}
          images={images}
          messages={messages}
          onUpload={handleFileUpload}
          onDelete={handleImageDelete}
          onDeleteMessage={handleMessageDelete}
          onCancel={handleUploadCancel}
          onComplete={handleUploadComplete}
          isUploading={uploadImageMutation.isPending}
          isDeleting={deleteImageMutation.isPending || deleteMessageMutation.isPending}
          pagination={pagination}
          onPageChange={(page) => setCurrentPage(page)}
          onAddMessage={handleAddMessage}
          isAddingMessage={addMessageMutation.isPending}
        />

        {/* Asian Temple Neon Footer */}
        <footer className="mt-12 text-center">
          <div className="pastel-footer-container inline-block relative">
            {/* Add spotlight effect for street restaurant sign look */}
            <div className="spotlight"></div>
            
            <p 
              className="font-pixel text-sm text-pink-900 cursor-pointer hover:text-pink-500 transition-colors relative z-10"
              onClick={handleToggleUploadArea}
              title="Secret Upload Area"
              style={{ textShadow: '0 0 4px #ff2e83, 0 0 8px #ff2e83' }}
            >
              smol dumplings safe zone
            </p>
            {/* Small decorative elements for temple style */}
            <span 
              className="absolute -left-2 -top-1 text-xs z-10" 
              style={{ color: '#ff2e83', textShadow: '0 0 4px #ff2e83' }}
            >
              ❀
            </span>
            <span 
              className="absolute -right-2 -top-1 text-xs z-10" 
              style={{ color: '#ff2e83', textShadow: '0 0 4px #ff2e83' }}
            >
              ❀
            </span>
          </div>
        </footer>
        
        {/* Pokémon Game */}
        <PokemonGame 
          isOpen={isGameVisible}
          onClose={() => setIsGameVisible(false)}
        />
      </div>
    </div>
  );
}
